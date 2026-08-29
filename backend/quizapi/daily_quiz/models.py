from django.conf import settings
from django.db import models
from questions.models import Question, Category


class UserDailyQuiz(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="daily_quizzes",
    )
    topic=models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="daily_quizzes",
    )
    for_date = models.DateField(auto_now_add=True)
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(null=True, blank=True)
    points_earned = models.PositiveIntegerField(default=0)
    is_played = models.BooleanField(default=False)

    @classmethod
    def top_three(cls):
        """Return the three highest-scoring completed daily quiz attempts.

        Ties are resolved by completion time, with the earliest completion
        ranking first.
        """
        return (
            cls.objects.filter(is_played=True, end_time__isnull=False)
            .order_by("-points_earned", "end_time")[:3]
        )


class DailyTopic(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    for_date = models.DateField(unique=True)

    def __str__(self):
        return self.category.name





    
# MIGRATION NEED TO BE DONE WHEN APP IS ACTIVE