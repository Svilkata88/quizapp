from django.db import connection
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from .models import User
from datetime import timedelta   
from secrets import token_urlsafe 
from questions.models import Question
from .serializers import UserSerializer
from django.contrib.auth import authenticate
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from .utils import create_quiz_token, set_redis_token, verify_redis_token
from django.shortcuts import get_object_or_404
from quizapi.settings import DEBUG
from django.views.decorators.cache import cache_page
from .tasks import send_welcome_email, send_password_reset_email, send_password_reset_confirmation_email

@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_all_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(["POST"])
def register_user(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = create_quiz_token(user)
            userQuestions = Question.objects.filter(author=user).count()
            send_welcome_email.delay(user.email, user.username)

            response = Response({
                'access': refresh['access'],
                'seed': refresh['seed'],
                'user': {
                        'id': user.id,
                        'username': user.username,
                        'xp': user.xp,
                        'points': user.points,
                        'addedQuestions': userQuestions,
                        'profilePicture': user.image.url if user.image else None,
                        'image': user.image.url if user.image else None,
                        'time_played': user.time_played.total_seconds(),
                        "staff": user.is_staff,
                    }
            })

            response.set_cookie(
                key="refresh",
                value=refresh['refresh'],
                httponly=True,
                secure=True,     
                samesite="None",
                path="/",  
                max_age=60 * 60 * 24 * 7     # 7 days
            )
            return response
        return Response(serializer.errors, status=400)

@api_view(["POST"])
def login_user(request):
    data = request.data
    username = data.get('username')
    password = data.get('password')
    try:
        user = authenticate(username=username, password=password)
        if user is not None:
            refresh = create_quiz_token(user)
            userQuestions = Question.objects.filter(author=user).count()

            response = Response({
                'access': refresh['access'],
                'seed': refresh['seed'],
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'xp': user.xp,
                    'points': user.points,
                    'addedQuestions': userQuestions,
                        'image': user.image.url if user.image else None,
                        'time_played': user.time_played.total_seconds() if user.time_played else 0,
                        "staff": user.is_staff,
                }
            })

            response.set_cookie(
                key="refresh",
                value=refresh['refresh'],
                httponly=True,
                secure=True,     
                samesite="None",
                path="/",  
                max_age=60 * 60 * 24 * 7     # 7 days
            )
            return response
    
        else:
            return Response({"error": "Invalid credentials"}, status=400)
    except User.DoesNotExist:
        return Response({"error": "User does not exist"}, status=404)

@api_view(["POST"])
def logout_user(request):
    response = Response({"message": "Logged out"})
    
    response.delete_cookie(
        key="refresh",
        path="/",
    )
    
    return response

@api_view(["POST"])
def reset_password(request):
    email = request.data.get('email')

    if not email:
        return Response({"error": "Email is empty!"}, status=400)

    user = User.objects.filter(email=email).first()
    if not user:
        return Response({"error": "User with such email not found"}, status=404)

    try:
        token = token_urlsafe(32)
        link = f"https://play-quizzy.com/auth/set-new-password/{token}"

        set_redis_token(token, user.id)
        send_password_reset_email.delay(user.email, link)

        return Response({"message": "Password reset email sent"})
    except Exception as e:
        if DEBUG:
            print("Password reset error:", str(e))
        return Response({"error": "Failed to reset the password!"}, status=400)

@api_view(["POST"])
def verify_password(request, token):
    password = request.data.get('password')
    if not password:
        return Response({"error": "no password provided for reset"}, status=400)

    verified_user_id = verify_redis_token(token)
    if not verified_user_id :
        return Response({"error": "Invalid or expired token"}, status=400)

    try:
        user = User.objects.get(id=verified_user_id)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)
    
    user.set_password(password)
    user.save()
    
    send_password_reset_confirmation_email(user.email, user.username)

    refresh = create_quiz_token(user)
    userQuestions = Question.objects.filter(author=user).count()

    response = Response({
        'access': refresh['access'],
        'seed': refresh['seed'],
        'user': {
            'id': user.id,
            'username': user.username,
            'xp': user.xp,
            'points': user.points,
            'addedQuestions': userQuestions,
                'image': user.image.url if user.image else None,
                'time_played': user.time_played.total_seconds() if user.time_played else 0,
                "staff": user.is_staff,
        }
    })

    response.set_cookie(
        key="refresh",
        value=refresh['refresh'],
        httponly=True,
        secure=True,     
        samesite="None",
        path="/",  
        max_age=60 * 60 * 24 * 7     # 7 days
    )
    return response

@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_user_profile(request, id):
    user = User.objects.get(id=id)
    questions_count = Question.objects.filter(author_id=id).count()
    serializer = UserSerializer(user)
    data = serializer.data
    data["addedQuestions"] = questions_count

    return Response(data)

@api_view(["PUT"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def edit_user_profile(request, id):
    if request.method == 'PUT':
        user = get_object_or_404(User, id=id)
        if request.user.id != user.id:
            return Response({"error": "Unauthorized"}, status=403)
        
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            data = serializer.data
            print("Updated user time_played:", data.get("time_played"))
            data['addedQuestions'] = Question.objects.filter(author=user).count()
            data['time_played'] = user.time_played.total_seconds()
            return Response(data)
        return Response(serializer.errors, status=400)

@api_view(["POST"])
def custom_refresh_token_view(request):
    refresh_token = request.COOKIES.get("refresh")
    if DEBUG:
        print('Refresh token: ',refresh_token)
    if not refresh_token:
        return Response({"error": "No refresh cookie"}, status=401)
    try:
        refresh = RefreshToken(refresh_token)
        access = str(refresh.access_token)
        return Response({"access": access})
    except TokenError as e:
        print("TOKEN ERROR:", str(e))
        return Response({"error": str(e)}, status=401)

@cache_page(60 * 15)
@api_view(["GET"])
def top_five(request):
    top_five_users = User.objects.order_by('-xp').exclude(username='quizadmin')[:5]
    serialized_users = UserSerializer(top_five_users, many=True)
    return Response(serialized_users.data)


# toDo: implement Logout view that blacklists the refresh token
# toDo: implement Password reset view
# toDo: implement Email verification view
# toDo: implement Social authentication (Google, Facebook, etc.)
# toDO: implement update user profile view
