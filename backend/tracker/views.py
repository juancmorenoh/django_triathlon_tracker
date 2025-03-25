from .serializer import RaceSerializer, WorkoutSerializer, GoalSerializer, DisciplineSerializer
from .models import Workout, Race, Goal, Discipline
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.reverse import reverse


# Display available urls in root rest _framework
@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'workouts': reverse('workout-list', request=request, format=format),
        'races': reverse('race-list', request=request, format=format),
        'goals': reverse('goal-list', request=request, format=format),
    })

#View to Create and view WORKOUTS
class WorkoutList(generics.ListCreateAPIView):
  queryset = Workout.objects.all()
  serializer_class = WorkoutSerializer
  permission_classes = [IsAuthenticated] #can't call this root unless authenticated

  def get_queryset(self):
     user = self.request.user
     return Workout.objects.filter(user=user)
  
  def perform_create(self, serializer):
    serializer.save(user=self.request.user)
    

class WorkoutDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Workout.objects.all()
  serializer_class = WorkoutSerializer
  permission_classes = [IsAuthenticated]
  
  
#View to Create and view RACES
class RaceList(generics.ListCreateAPIView):
  serializer_class = RaceSerializer
  permission_classes = [IsAuthenticated]
  
  def get_queryset(self):
    user = self.request.user
    return Race.objects.filter(user=user)
  
  def perform_create(self, serializer):
    serializer.save(user=self.request.user)
    

class RaceDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Race.objects.all()
  serializer_class = RaceSerializer
  permission_classes = [IsAuthenticated]

#View to Create and view GOALS
class GoalList(generics.ListCreateAPIView):
  serializer_class = GoalSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    user = self.request.user
    return Goal.objects.filter(user=user)
  
  def perform_create(self, serializer):
    serializer.save(user=self.request.user)
    
     
    
class GoalDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Goal.objects.all()
  serializer_class = GoalSerializer
  permission_classes = [IsAuthenticated]

#View to Create and view DISCIPLINES
class DisciplineList(generics.ListCreateAPIView):
  serializer_class = DisciplineSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    race_id = self.kwargs['pk']
    return Discipline.objects.filter(race__id=race_id)
  
  def perform_create(self, serializer):
    race_id = self.kwargs['pk']
    race = Race.objects.get(id=race_id)
    serializer.save(race=race)
    
    
class DisciplineDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Discipline.objects.all()
  serializer_class = DisciplineSerializer
  permission_classes = [IsAuthenticated]









