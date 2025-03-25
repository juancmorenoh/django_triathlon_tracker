from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Workout,Race,Goal, Discipline
    
class WorkoutSerializer(serializers.HyperlinkedModelSerializer):
  #HyperlinkedModelSerializer tries to create URLs for related fields (user ForeignKey).
  #So need read_only to fix the problem since no user-detail url present
  user = serializers.PrimaryKeyRelatedField(read_only=True)
  class Meta:
    model = Workout
    fields = ['id', 'activity_type', 'date', 'distance_m', 'duration', 'name', 'intensity', 'user', 'notes']
    read_only_fields = ['user']

class DisciplineSerializer(serializers.HyperlinkedModelSerializer):
  race = serializers.HyperlinkedRelatedField(read_only=True, view_name='race-detail')
  class Meta:
    model = Discipline
    fields = '__all__'

class RaceSerializer(serializers.HyperlinkedModelSerializer):
    disciplines = DisciplineSerializer(many=True, read_only=True)
    class Meta:
      model = Race
      exclude = ['user']
    

class GoalSerializer(serializers.ModelSerializer):
  class Meta:
    model = Goal
    exclude = ['user']


