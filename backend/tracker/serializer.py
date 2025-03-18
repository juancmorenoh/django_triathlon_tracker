from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Workout,Race,Goal;
    
class WorkoutSerializer(serializers.ModelSerializer):
  class Meta:
    model = Workout
    # remove user as it's set automatically with method perform_create
    fields = "__all__"

class RaceSerializer(serializers.ModelSerializer):
  class Meta:
    model = Race
    fields = "__all__"

class GoalSerializer(serializers.ModelSerializer):
  class Meta:
    model = Goal
    fields = "__all__"