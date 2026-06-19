from rest_framework import serializers
from .models import Question, Answer, QuestionIssues
from users.serializers import UserSerializer


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'text']


class QuestionSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    answers = AnswerSerializer(many=True, read_only=True)
    correct_answer = AnswerSerializer(read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'text', 'answers', 'correct_answer', 'author', 'rating', 'difficulty', 'info']


class UpdateQuestionsSerializer(serializers.Serializer):
    answeredCorrectly = serializers.ListField(
        child=serializers.IntegerField(), required=False
    )
    answeredWrong = serializers.IntegerField(required=False)


class QuestionIssueSerializer(serializers.ModelField):
    question = QuestionSerializer(read_only=True)

    class Meta:
        model = QuestionIssues
        fields = ['id', 'Status', 'description', 'decision']