from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    pass
    points = models.SmallIntegerField(default=0)
    rank = models.SmallIntegerField(default=0)

    def __str__(self):
        return self.username