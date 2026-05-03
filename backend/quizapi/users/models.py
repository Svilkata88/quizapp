from datetime import timedelta

from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    pass
    email = models.EmailField(unique=True)
    points = models.SmallIntegerField(default=0)
    xp = models.SmallIntegerField(default=0)
    image = models.ImageField(upload_to='profile_images/', null=True, blank=True, default="profile_images/user.png")
    time_played = models.DurationField(default=timedelta(0))

    def __str__(self):
        return self.username