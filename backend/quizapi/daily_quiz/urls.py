from django.urls import path
from .views import get_daily_quiz_questions



urlpatterns = [
    path('get_daily_questions/', get_daily_quiz_questions, name='get_daily_quiz_questions'),
]