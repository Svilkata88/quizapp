
from django.contrib import admin
from django.urls import include, path
from users.views import custom_refresh_token_view
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/questions/', include('questions.urls')),

    path("api/token/refresh/", custom_refresh_token_view, name="token_refresh"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)