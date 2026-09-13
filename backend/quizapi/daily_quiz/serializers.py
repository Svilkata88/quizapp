from .models import UserDailyQuiz, DailyQuizSummary, DailyTopic
from rest_framework import serializers
from users.serializers import UserSerializer


class DailyQuizSummarySerializer(serializers.ModelSerializer):
    first_place_user_quiz = UserSerializer(
        source="first_place_user_quiz.user",
        read_only=True,
    )
    second_place_user_quiz = UserSerializer(
        source="second_place_user_quiz.user",
        read_only=True,
    )
    third_place_user_quiz = UserSerializer(
        source="third_place_user_quiz.user",
        read_only=True,
    )

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
