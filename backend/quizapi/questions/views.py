import random
from django.http import JsonResponse 
from django.db.models.functions import Random
from .models import Question, Answer, QuestionIssues, Rating
from users.models import User
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from .serializers import QuestionSerializer
from users.serializers import UserSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .utils import get_question_ids
from users.utils import refresh_seed


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(["GET"])
def question_list(request):
    PAGE_SIZE = 5

    # make sure is send from the frontend
    seed = request.COOKIES.get("seed")
    seed = int(seed)

    ids = get_question_ids()
    rnd = random.Random(seed)
    rnd.shuffle(ids)
    
    paginator = PageNumberPagination()
    paginator.page_size = PAGE_SIZE
    page_ids = paginator.paginate_queryset(ids, request)

    questions = Question.objects.filter(id__in=page_ids, status=Question.Status.CONFIRMED) 

    serialized_questions = QuestionSerializer(questions, many=True)

    response = paginator.get_paginated_response(serialized_questions.data)

    # need improvment / in every call the view fetch the ids, make a paginator, set size and then filter again
    return response

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(["GET"])
def get_question(request, id):
    id = int(id)
    question = Question.objects.get(id=id)
    author = User.objects.get(id=question.author.id)
    print(id)
    serialized_question = QuestionSerializer(question)
    serialized_author = UserSerializer(author)
    return JsonResponse({'question': serialized_question.data, 'author': serialized_author.data})


def reset_game(request):
    new_seed = refresh_seed()
    response = JsonResponse({"seed": new_seed})
    return response


#to be implemented verification to the question before it goes to Questions
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(["POST"])
def create_question(request):
    user_id = int(request.data["userId"])
    user = User.objects.get(id=user_id)

    question = Question.objects.create(
        text=request.data["question_text"],
        author=user
    )

    answer_1 = Answer.objects.create(
        text=request.data["option_one"],
        question=question
    )

    answer_2 = Answer.objects.create(
        text=request.data["option_two"],
        question=question
    )

    answer_3 = Answer.objects.create(
        text=request.data["option_three"],
        question=question
    )

    answer_4 = Answer.objects.create(
        text=request.data["correct_answer"],
        question=question
    )

    question.correct_answer = answer_4
    question.save()

    return JsonResponse({"id": question.id}, status=201)


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(["POST"])
def create_question_issue(request):
    id = int(request.data['questionId'])
    description = request.data['issue']
    question = Question.objects.get(id=id)
    issue = QuestionIssues.objects.create(question=question, description=description, decision=None, )

    return JsonResponse({"id": issue.id}, status=201)


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(["POST"])
def create_rating(request):
    id = int(request.data['questionId'])
    question = Question.objects.get(id=id)
    rating_value = request.data['rating']
    rating = Rating.objects.create(question=question, rating=rating_value)

    return JsonResponse({"id": rating.id, "rating": question.rating}, status=201)
        
