from rest_framework import serializers
from .models import User
from questions.models import Question

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False) 
    password2 = serializers.CharField(write_only=True, required=False)
    addedQuestions = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'password2', 'points', 'xp', 'image', 'addedQuestions']

    def get_addedQuestions(self, obj):
        return Question.objects.filter(author=obj).count()

    def validate(self, data):
        pw1 = data.get('password')
        pw2 = data.get('password2')

        if pw1 and pw2 and pw1 != pw2:
            raise serializers.ValidationError({"password2": "Passwords do not match."})
        return data

    def create(self, validated_data):
        validated_data.pop('password2', None)  
        password = validated_data.pop('password', None)  
        user = User(**validated_data)             
        if password:
            user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        validated_data.pop('password2', None)
        password = validated_data.pop('password', None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        if password:
            instance.set_password(password)
        
        instance.save()
        return instance