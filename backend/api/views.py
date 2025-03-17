from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from backend.workout_logs.models import Workout
from .serializer import WorkoutSerializer, UserSerializer

# Create your views here.

class WorkoutListCreate(generics.ListCreateAPIView):
  queryset = Workout.objects.all()
  serializer_class = WorkoutSerializer
  permission_classes = [IsAuthenticated] #can't call this root unless authenticated

  def get_queryset(self):
     user = self.request.user
     return Workout.objects.filter(user=user)
  
  def perform_create(self, serializer):
    if serializer.is_valid():
      serializer.save(user=self.request.user)
    else:
      print(serializer.errors)

class WorkoutDelete(generics.DestroyAPIView):
  serializer_class = WorkoutSerializer
  permission_classes = [IsAuthenticated]
  def get_queryset(self):
    user = self.request.user
    return Workout.objects.filter(user=user)

class WorkoutDetail(generics.RetrieveAPIView):
  serializer_class = WorkoutSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    
    user = self.request.user
    return Workout.objects.filter(user=user)
  
  def get_object(self):
    pk = self.kwargs.get('pk')
    return Workout.objects.get(pk=pk, user=self.request.user)

   

class UserCreate(generics.CreateAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = [AllowAny]

  #overridinh this method actually hash the password in DRF
  #Only solution I found so far
  def perform_create(self, serializer):
        instance = serializer.save()
        instance.set_password(instance.password)
        instance.save()
  