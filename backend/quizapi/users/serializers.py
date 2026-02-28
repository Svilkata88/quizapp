from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True) 
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'password2', 'points', 'rank']

    def validate(self, data):
        pw1 = data.get('password')
        pw2 = data.get('password2')

        if pw1 and pw2 and pw1 != pw2:
            raise serializers.ValidationError({"password2": "Passwords do not match."})
        return data

    def create(self, validated_data):
        validated_data.pop('password2')  
        password = validated_data.pop('password')  
        user = User(**validated_data)             
        user.set_password(password)               
        user.save()
        return user