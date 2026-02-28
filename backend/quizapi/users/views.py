from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from .models import User
from .serializers import UserSerializer
from django.contrib.auth import authenticate
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from .utils import create_quiz_token

# toDO: JWT implementation for authentication

@api_view(["POST"])
def register_user(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = create_quiz_token(user)

            response = JsonResponse({
                'access': refresh['access'],
                'seed': refresh['seed'],
                'user': {
                    'id': user.id,
                    'username': user.username,
                }
            })

            response.set_cookie(
                key="refresh",
                value=refresh['refresh'],
                httponly=True,
                secure=False,      # True in production (HTTPS)
                samesite="Lax",
                path="/",  
                max_age=60 * 60 * 24 * 7     # 7 days
            )
            return response
            
        return JsonResponse(serializer.errors, status=400)

@api_view(["POST"])
def login_user(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        username = data.get('username')
        password = data.get('password')
        try:
            user = authenticate(username=username, password=password)
            if user is not None:
                refresh = create_quiz_token(user)

                response = JsonResponse({
                    'access': refresh['access'],
                    'seed': refresh['seed'],
                    'user': {
                        'id': user.id,
                        'username': user.username,
                    }
                })

                response.set_cookie(
                    key="refresh",
                    value=refresh['refresh'],
                    httponly=True,
                    secure=False,      # True in production (HTTPS)
                    samesite="Lax",
                    path="/",  
                    max_age=60 * 60 * 24 * 7     # 7 days
                )
                return response
        
            else:
                return JsonResponse({"error": "Invalid credentials"}, status=400)
        except User.DoesNotExist:
            return JsonResponse({"error": "User does not exist"}, status=404)

@api_view(["POST"])
def logout_user(request):
    response = JsonResponse({"message": "Logged out"})
    
    response.delete_cookie(
        key="refresh",
        path="/",
    )
    
    return response

@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_user_profile(request, id):
    if request.method == 'GET':
        user = User.objects.get(id=id)
        serializer = UserSerializer(user)
        return JsonResponse(serializer.data)
    
@api_view(["POST"])
def custom_refresh_token_view(request):
    refresh_token = request.COOKIES.get("refresh")

    if not refresh_token:
        return JsonResponse({"error": "No refresh cookie"}, status=401)
    try:
        refresh = RefreshToken(refresh_token)
        access = str(refresh.access_token)
        return JsonResponse({"access": access})
    except TokenError:
        return JsonResponse({"error": "Invalid refresh token"}, status=401)

def top_five(request):
    top_five_users = User.objects.order_by('rank').exclude(username='quizadmin')[:5]
    serialized_users = UserSerializer(top_five_users, many=True)
    return JsonResponse(serialized_users.data, safe=False)


# toDo: implement Logout view that blacklists the refresh token
# toDo: implement Password reset view
# toDo: implement Email verification view
# toDo: implement Social authentication (Google, Facebook, etc.)
# toDO: implement update user profile view