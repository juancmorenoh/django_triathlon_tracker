from django.shortcuts import render
from rest_framework import generics
from apps.workout_logs.models import Workout
from .serializer import WorkoutSerializer

# Create your views here.

class WorkoutView(generics.ListAPIView):
  queryset = Workout.objects.all()
  serializer_class = WorkoutSerializer