
from django.contrib import admin
from django.urls import include, path
from users.views import custom_refresh_token_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/questions/', include('questions.urls')),

    path("api/token/refresh/", custom_refresh_token_view, name="token_refresh"),
]
