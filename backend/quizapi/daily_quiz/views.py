from urllib import request
import redis
import random
import environ
from datetime import date
from .models import DailyTopic, UserDailyQuiz
from questions.models import Question, Category
from questions.serializers import QuestionSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

env = environ.Env(DEBUG=(bool, False))
redis_client = redis.from_url(
        env("REDIS_URL"),
        decode_responses=True
    )

def restart_daily_topic():
    if redis_client.llen("daily_topic_ids") == 0:
        category_ids = list(Category.objects.values_list("id", flat=True))
        random.shuffle(category_ids)
        if not category_ids:
            raise ValueError("No categories found in the database.")
        redis_client.rpush("daily_topic_ids", *category_ids) # push the ids in Redis list

    daily_topic_id = redis_client.lpop("daily_topic_ids")
    daily_category = Category.objects.get(id=int(daily_topic_id))

    redis_client.set("daily_topic", daily_category.name)
    DailyTopic.objects.update_or_create(
        for_date=date.today(),
        defaults={"category": daily_category},
    )

@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_current_daily_topic(request):
    daily_topic = redis_client.get("daily_topic")
    if daily_topic is None:
        restart_daily_topic()
        daily_topic = redis_client.get("daily_topic")
    return Response({"daily_topic": daily_topic}, status=status.HTTP_200_OK)

@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_daily_quiz_questions(request):
    """Sends 20 random questions to froned end for current day"""

    is_played = UserDailyQuiz.objects.filter(user=request.user, is_played=True, for_date=date.today()).exists()
    if is_played:
        return Response({"error": "You have already played the daily quiz today."}, status=status.HTTP_403_FORBIDDEN)

    topic = redis_client.get("daily_topic")

    if topic is None:
        return Response({"error": "No existing topics."}, status=status.HTTP_404_NOT_FOUND)

    try:
        category = Category.objects.get(name=topic)
    except Category.DoesNotExist:
        return Response({"error": "No such category found."}, status=status.HTTP_404_NOT_FOUND)
    
    ids = list(Question.objects.filter(category=category, status=Question.Status.CONFIRMED).values_list("id", flat=True))
    rnd = random.Random()
    rnd.shuffle(ids)
    
    questions = Question.objects.filter(id__in=ids[:20], status=Question.Status.CONFIRMED)
    serialized_questions = QuestionSerializer(questions, many=True)

    UserDailyQuiz.objects.get_or_create(user=request.user, topic=category, for_date=date.today())

    return Response(serialized_questions.data, status=status.HTTP_200_OK)
    
@api_view(["POST"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def update_daily_quiz_after_game(request):
    points_earned = request.data.get("points_earned")

    daily_quiz = UserDailyQuiz.objects.filter(
        user=request.user,
        for_date=date.today()
    ).first()

    if not daily_quiz:
        return Response(
            {"error": "No daily quiz found for today."},
            status=status.HTTP_404_NOT_FOUND
        )

    daily_quiz.points_earned = int(points_earned)
    daily_quiz.is_played = True
    daily_quiz.end_time = date.today()
    daily_quiz.save()

    print(
        f"Updated daily quiz for user {request.user.username} "
        f"with points: {points_earned}"
    )

    return Response({"message": "Daily quiz updated successfully."})
