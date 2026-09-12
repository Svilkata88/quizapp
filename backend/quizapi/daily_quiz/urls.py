from django.urls import path
from .views import get_current_daily_topic_and_user_daily_quiz, get_daily_quiz_questions, get_daily_quiz_summary, update_daily_quiz_after_game



urlpatterns = [
    path('get_daily_questions/', get_daily_quiz_questions, name='get_daily_quiz_questions'),
    path('daily-topic/', get_current_daily_topic_and_user_daily_quiz, name='get_current_daily_topic_and_user_daily_quiz'),
    path('update_daily_quiz/', update_daily_quiz_after_game, name='update_daily_quiz_after_game'),
    path('daily_quiz_summary/', get_daily_quiz_summary, name='get_daily_quiz_summary'),
]