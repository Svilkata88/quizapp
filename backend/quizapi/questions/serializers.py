from rest_framework import serializers
from .models import Question, Answer, QuestionIssues, Category
from users.serializers import UserSerializer


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'text']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class QuestionSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    answers = AnswerSerializer(many=True, read_only=True)
    correct_answer = AnswerSerializer(read_only=True)
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'text', 'answers', 'correct_answer', 'author', 'rating', 'difficulty', 'info', 'status', 'category']


class UpdateQuestionsSerializer(serializers.Serializer):
    answeredCorrectly = serializers.ListField(
        child=serializers.IntegerField(), required=False
    )
    answeredWrong = serializers.IntegerField(required=False)


class QuestionIssueSerializer(serializers.ModelField):
    question = QuestionSerializer(read_only=True)

    class Meta:
        model = QuestionIssues
        fields = ['id', 'Status', 'description', 'decision', 'question']