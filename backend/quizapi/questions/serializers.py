from rest_framework import serializers
from .models import Question, Answer, QuestionIssues


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'text']


class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)
    correct_answer = AnswerSerializer(read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'text', 'answers', 'correct_answer', 'author', 'rating']

class QuestionIssueSerializer(serializers.ModelField):
    question = QuestionSerializer(read_only=True)

    class Meta:
        model = QuestionIssues
        fields = ['id', 'Status', 'description', 'decision']