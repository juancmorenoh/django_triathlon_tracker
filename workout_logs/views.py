from django.shortcuts import render
from .models import Workout


# Create your views here.
def workout_list(request):
    workouts = Workout.objects.all()

    return render(request, 'workout_logs/workout_list.html', {'workouts':workouts})