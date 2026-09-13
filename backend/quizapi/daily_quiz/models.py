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


class DailyQuizSummary(models.Model):
    topic=models.CharField(max_length=255)
    for_date = models.DateField()
    players_count = models.PositiveIntegerField(default=0)
    first_place_user_quiz = models.ForeignKey(UserDailyQuiz, on_delete=models.SET_NULL, null=True, blank=True, related_name="first_place_summary"    )
    second_place_user_quiz = models.ForeignKey(UserDailyQuiz, on_delete=models.SET_NULL, null=True, blank=True, related_name="second_place_summary")
    third_place_user_quiz = models.ForeignKey(UserDailyQuiz, on_delete=models.SET_NULL, null=True, blank=True, related_name="third_place_summary")

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["topic", "for_date"],
                name="unique_daily_quiz_summary_per_topic_and_date",
            )
    ]


class DailyTopic(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    for_date = models.DateField(unique=True)

    def __str__(self):
        return self.category.name





    
# MIGRATION NEED TO BE DONE WHEN APP IS ACTIVE