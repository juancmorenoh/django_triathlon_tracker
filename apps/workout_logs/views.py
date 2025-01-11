from django.shortcuts import render , redirect , get_object_or_404
from .models import Workout
from .forms import WorkoutForm


def home(request):
    return render(request,'workout_logs/homepage.html')

def workout_list(request):
    workouts = Workout.objects.all()
    activity_type = request.GET.get('activity_type')

    if activity_type:
        workouts = workouts.filter(activity_type=activity_type)
    
    context = {
        'workouts': workouts,
    }
        

    return render(request, 'workout_logs/workout_list.html', context)

def add_workout(request):
    if request.method ==  'POST':
        form = WorkoutForm(request.POST)
        if form.is_valid():
            form.save()
        return redirect('workout_list')
    else:
        form = WorkoutForm()
    return render(request, 'workout_logs/add_workout.html', {'form': form})

def update_workout(request, workout_id):
    workout = get_object_or_404(Workout, id=workout_id)
    if request.method == "POST":
        form = WorkoutForm(request.POST, instance=workout)
        if form.is_valid():
            form.save()
            return redirect('workout_list')  # Redirect to the workout list after update
    else:
        form = WorkoutForm(instance=workout)
    return render(request, 'workout_logs/add_workout.html', {'form': form})

def delete_workout(request, workout_id):
    workout = get_object_or_404(Workout, id=workout_id)
    if request.method == "POST":
        workout.delete()
        return redirect('workout_list')  # Redirect to the workout list after delete
    return render(request,'workout_logs/delete_workout.html',{'workout': workout})

def detail_workout(request,workout_id):
    workout = get_object_or_404(Workout, id=workout_id)
    return render(request,'workout_logs/detail_workout.html',{'workout': workout})





