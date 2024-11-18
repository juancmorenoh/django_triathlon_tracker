from django.shortcuts import render , redirect , get_object_or_404
from .models import Workout
from .forms import WorkoutForm


# Create your views here.
def workout_list(request):
    workouts = Workout.objects.all()
    return render(request, 'workout_logs/workout_list.html', {'workouts':workouts})

def add_workout(request):
    if request.method ==  'POST':
        form = WorkoutForm(request.POST)
        if form.is_valid():
            form.save()
        else:
            # Print errors to the console for debugging if form is invalid
            print(form.errors) 
            
        return redirect('workout_list')
    else:
        form = WorkoutForm()
    return render(request, 'workout_logs/add_workout.html', {'form': form})

def detail_workout(request,workout_id):
    workout = get_object_or_404(Workout, id=workout_id)
    return render(request,'workout_logs/detail_workout.html',{'workout': workout})

