import redis
import random
import environ
from datetime import date
from urllib import request
from django.db.models import F
from rest_framework import status
from django.utils import timezone
from rest_framework.response import Response
from questions.models import Question, Category
from questions.serializers import QuestionSerializer
from django.views.decorators.cache import cache_page
from rest_framework.permissions import IsAuthenticated
from .models import DailyQuizSummary, DailyTopic, UserDailyQuiz
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import DailyQuizSummarySerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes

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

def summarize_daily_quiz(current_date):
    daily_topic = DailyTopic.objects.select_related("category").get(
        for_date=current_date
    )
    daily_category = daily_topic.category

    users_quizzes = UserDailyQuiz.objects.annotate(
        time_played=F("end_time") - F("start_time")
    ).filter(
        topic=daily_category,
        for_date=current_date,
        is_played=True
    ).order_by('-points_earned', "time_played")

    players_count = users_quizzes.count()
    first_place_user_quiz = users_quizzes.first() if players_count > 0 else None
    second_place_user_quiz = users_quizzes[1] if players_count > 1 else None
    third_place_user_quiz = users_quizzes[2] if players_count > 2 else None

    DailyQuizSummary.objects.update_or_create(
        topic=daily_category.name,
        for_date=current_date,
        defaults={
            "players_count": players_count,
            "first_place_user_quiz": first_place_user_quiz,
            "second_place_user_quiz": second_place_user_quiz,
            "third_place_user_quiz": third_place_user_quiz,
        }
    )

@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@cache_page(60 * 5)  
def get_current_daily_topic_and_user_daily_quiz(request):
    daily_topic = redis_client.get("daily_topic")
    daily_quiz = UserDailyQuiz.objects.filter(user=request.user, for_date=date.today()).first()
    if daily_topic is None:
        restart_daily_topic()
        daily_topic = redis_client.get("daily_topic")
    return Response({"daily_topic": daily_topic, "is_played": daily_quiz.is_played if daily_quiz else None}, status=status.HTTP_200_OK)

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
    daily_quiz.end_time = timezone.now()
    daily_quiz.save()

    print(
        f"Updated daily quiz for user {request.user.username} "
        f"with points: {points_earned}"
    )

    return Response({"message": "Daily quiz updated successfully."})

@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_daily_quizzes_summary(request):
    try:
        summary = (
            DailyQuizSummary.objects
            .all()
            .order_by('-for_date')[:10]
        )
    except DailyQuizSummary.DoesNotExist:
        return Response({"error": "No daily quiz summary found."}, status=status.HTTP_404_NOT_FOUND)

    serialized_summary = DailyQuizSummarySerializer(summary, many=True)
    return Response(
        {"summary": serialized_summary.data},
        status=status.HTTP_200_OK
    )