from .models import UserDailyQuiz, DailyQuizSummary, DailyTopic
from rest_framework import serializers


class DailyQuizSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyQuizSummary
        fields = [
            "id",
            "topic",
            "for_date",
            "players_count",
            "first_place_user_quiz",
            "second_place_user_quiz",
            "third_place_user_quiz",
        ]