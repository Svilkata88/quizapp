from django.urls import path
from .views import get_own_questions_list, question_list, reset_game, get_question, create_question, create_question_issue, create_rating, update_questions, edit_question


urlpatterns = [
    path('', question_list, name='question_list'),  
    path('list_own_questions/', get_own_questions_list, name='own_question_list'),
    path('reset/', reset_game, name='reset_game'),
    path('create/', create_question, name='create_question'),
    path('edit/<int:id>/', edit_question, name='edit_question'),
    path('createIssue/', create_question_issue, name='create_issue'),
    path('create-rating/', create_rating, name='create_rating'),
    path('update-questions/', update_questions, name='update_questions'),
    path('<int:id>/', get_question, name='get_question'),
]