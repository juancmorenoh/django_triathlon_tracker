from .serializer import RaceSerializer, WorkoutSerializer, GoalSerializer
from .models import Workout, Race, Goal
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny

#View to Create and view WORKOUTS
class WorkoutList(generics.ListCreateAPIView):
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

class WorkoutDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Workout.objects.all()
  serializer_class = WorkoutSerializer
  permission_classes = [IsAuthenticated]
  
  
#View to Create and view RACES
class RaceList(generics.ListCreateAPIView):
    queryset = Race.objects.all()
    serializer_class = RaceSerializer

class RaceDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Race.objects.all()
  serializer_class = RaceSerializer
  permission_classes = [IsAuthenticated]

#View to Create and view GOALS
class GoalList(generics.ListCreateAPIView):
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer

class GoalDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Goal.objects.all()
  serializer_class = GoalSerializer
  permission_classes = [IsAuthenticated]











