import random
from urllib import request
from django.http import JsonResponse 
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
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from .serializers import QuestionSerializer, UpdateQuestionsSerializer
from django.db import transaction
from django.db.models import Case, When, Value, CharField, F


@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def all_questions(request): 
    questions = Question.objects.select_related("author").all()
    serialized_questions = QuestionSerializer(questions, many=True)

    return Response(serialized_questions.data)

@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def question_list(request):
    PAGE_SIZE = 5

    # make sure is send from the frontend
    seed = request.COOKIES.get("seed") or request.GET.get("seed")
    try:
        seed = int(seed)
    except (TypeError, ValueError):
        return Response({"error": "Invalid seed value"}, status=status.HTTP_400_BAD_REQUEST)  

    difficulty = request.GET.get("difficulty")

    ids = get_question_ids(difficulty)
    rnd = random.Random(seed)
    rnd.shuffle(ids)
    
    paginator = PageNumberPagination()
    paginator.page_size = PAGE_SIZE
    page_ids = paginator.paginate_queryset(ids, request)
    
    questions = Question.objects.filter(id__in=page_ids, status=Question.Status.CONFIRMED, difficulty=difficulty)
    
    serialized_questions = QuestionSerializer(questions, many=True)

    response = paginator.get_paginated_response(serialized_questions.data)
    
    # need improvment / in every call the view fetch the ids, make a paginator, set size and then filter again
    return response

@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_own_questions_list(request):
    user = request.user
    questions = Question.objects.filter(author=user)
    serialized_questions = QuestionSerializer(questions, many=True)
    response = Response(serialized_questions.data)  
    return response

@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_question(request, id):
    question = get_object_or_404(
        Question.objects.select_related("author"),
        id=id,
    )

    serialized_question = QuestionSerializer(question)
    serialized_author = UserSerializer(question.author)

    return JsonResponse({
        "question": serialized_question.data,
        "author": serialized_author.data,
    })


def reset_game(request):
    new_seed = refresh_seed()
    response = JsonResponse({"seed": new_seed})
    return response


#to be implemented verification to the question before it goes to Questions
@api_view(["POST"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def create_question(request):
    user = request.user

    serializer = QuestionSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    with transaction.atomic():
        question = serializer.save(
            author=user,
            status=Question.Status.PENDING
        )

        answers = Answer.objects.bulk_create([
            Answer(text=request.data["option_one"], question=question),
            Answer(text=request.data["option_two"], question=question),
            Answer(text=request.data["option_three"], question=question),
            Answer(text=request.data["correct_answer"], question=question),
        ])

        question.info = request.data.get("info", "")
        question.correct_answer = answers[-1]
        question.save()

    return Response(
        {"id": question.id},
        status=status.HTTP_201_CREATED
    )


@api_view(["PUT"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def edit_question(request, id):
    if request.method == 'PUT':
        question = get_object_or_404(Question, id=id)
        print("Editing question author ID:", question.author.id)
        print("Current user ID:", request.user.id)
        if request.user.id != question.author.id or not request.user.is_staff:
            return Response({"error": "Unauthorized"}, status=403)
        
        serializer = QuestionSerializer(question, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            data = serializer.data
            print("Updated question:", data.get("text"))
            return Response(data)
        return Response(serializer.errors, status=400)


@api_view(["POST"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def create_question_issue(request):
    id = int(request.data['questionId'])
    description = request.data['issue']
    question = Question.objects.get(id=id)
    issue = QuestionIssues.objects.create(question=question, description=description, decision=None, )

    return JsonResponse({"id": issue.id}, status=201)


@api_view(["POST"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def create_rating(request):
    id = request.data["questionId"]
    user = request.user
    question = Question.objects.get(id=id)
    rating_value = request.data['rating']
    existing_rating = Rating.objects.filter(question=question, user=user).first()
    if existing_rating:
        existing_rating.rating = rating_value
        existing_rating.save()
        rating = existing_rating
        print("updated existing rating")
    else:
        rating = Rating.objects.create(question=question, rating=rating_value, user=user)
        print("created new rating")


    return JsonResponse({"id": rating.id, "rating": question.rating}, status=201)
        
@api_view(["POST"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@transaction.atomic
def update_questions(request):
    serializer = UpdateQuestionsSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    correct_ids = serializer.validated_data.get("answeredCorrectly", [])
    wrong_id = serializer.validated_data.get("answeredWrong")

    # Update correct answers
    if correct_ids:
        Question.objects.filter(id__in=correct_ids).update(
            correct_answers=F("correct_answers") + 1,
            difficulty=Case(
                When(wrong_answers=0, then=Value("easy")),
                When(correct_answers__gt=F("wrong_answers") * 2, then=Value("easy")),
                When(correct_answers__lt=F("wrong_answers") * 0.5, then=Value("hard")),
                default=Value("easy"),
                output_field=CharField(),
            )
        )
        print(f"Updated correct answers for question IDs: {', '.join(str(id) for id in correct_ids)}")

    # Update wrong answer
    if wrong_id:
        Question.objects.filter(id=wrong_id).update(
            wrong_answers=F("wrong_answers") + 1,
            difficulty=Case(
                When(wrong_answers=0, then=Value("easy")),
                When(correct_answers__gt=F("wrong_answers") * 2, then=Value("easy")),
                When(correct_answers__lt=F("wrong_answers") * 0.5, then=Value("hard")),
                default=Value("easy"),
                output_field=CharField(),
            )
        )
        print(f"Updated wrong answers for question ID: {wrong_id}")     

    return Response({"correct_ids": correct_ids, "wrong_id": wrong_id}, status=status.HTTP_200_OK)
