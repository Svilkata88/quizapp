from django.urls import path
from .views import question_list, reset_game, get_question, create_question, create_question_issue, create_rating


urlpatterns = [
    path('', question_list, name='question_list'), 
    path('<int:id>/', get_question, name='question'),  
    path('reset/', reset_game, name='reset_game'),
    path('create/', create_question, name='create_question'),
    path('createIssue/', create_question_issue, name='create_issue'),
    path('create-rating/', create_rating, name='create_rating'),
]