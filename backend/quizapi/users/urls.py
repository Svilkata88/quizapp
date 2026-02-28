from django.urls import path
from .views import register_user, login_user, get_user_profile, logout_user, top_five

urlpatterns = [
    path('register', register_user, name='register_user'),
    path('login', login_user, name='login_user'),
    path('logout', logout_user, name='logout_user'),
    path('top-five/', top_five, name='top_five_users'),
    path('profile/<int:id>', get_user_profile, name='user_profile'),
]