from django.urls import path

from .views import (
    all_questions,
    create_question,
    create_question_issue,
    create_rating,
    edit_question,
    get_all_issues,
    get_own_questions_list,
    get_question,
    question_list,
    reset_game,
    update_questions,
    category_list,
)


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

    path('admin/all-questions/', all_questions, name="all_questions"),
    path('admin/all-questions/<int:id>/', get_question, name="admin_get_question"),
    path('admin/categories/', category_list, name="categories"),
    path('admin/all-issues/', get_all_issues, name='all_issues'),
]