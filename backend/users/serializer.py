from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = '__all__'
    #Only accept pass, don't return it
    extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
      user = User.objects.create_user(**validated_data)
      return user


class ProfileSerializer(serializers.ModelSerializer):
  user = UserSerializer()
  class Meta:
    model = Profile
    fields = ['image','user']