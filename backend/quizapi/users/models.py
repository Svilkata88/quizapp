from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    pass
    points = models.SmallIntegerField(default=0)
    xp = models.SmallIntegerField(default=0)
    image = models.ImageField(upload_to='profile_images/', null=True, blank=True, default="profile_images/user.png")

    def __str__(self):
        return self.username