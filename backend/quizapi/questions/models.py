from django.conf import settings
from django.db import models

class Question(models.Model):
    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        CONFIRMED = "confirmed", "Confirmed"
        REJECTED = "rejected", "Rejected"

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING,
        db_index=True
    )

    text = models.CharField(max_length=255)
    correct_answer = models.ForeignKey( 
        "Answer",
        on_delete=models.CASCADE,
        related_name="correct_for",
        null=True,
        blank=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    difficulty = models.IntegerField(default=1)
    
    @property
    def rating(self):
        result = self.ratings.aggregate(avg=models.Avg("rating"))
        return result["avg"] or 0

    def __str__(self):
        return self.text
    

class Rating(models.Model):
    rating = models.SmallIntegerField(default=0)
    question = models.ForeignKey(to=Question, on_delete=models.CASCADE, related_name='ratings')


class Answer(models.Model):
    question = models.ForeignKey(
        Question,
        related_name="answers",
        on_delete=models.CASCADE
    )
    text = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text


class QuestionIssues(models.Model):
    class Status(models.TextChoices):
        UNRESOVLED = "unresolved", "Unresolved"
        RESOLVED = "resolved", "Resolved"

    question = models.ForeignKey(
        Question,
        related_name="issues",
        on_delete=models.CASCADE
    )
    description = models.CharField(max_length=255)
    decision = models.CharField(max_length=255, null=True)
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.UNRESOVLED,
        db_index=True
    )