from django.shortcuts import render , redirect , get_object_or_404
from .models import Workout
from .forms import WorkoutForm


def home(request):
    return render(request,'workout_logs/homepage.html')

def workout_list(request):
    q = request.GET.get('q') # q in quotes is whatever is passed in the URL. If there's no q, it will be None.
    if q:
        if q.isdigit(): 
            q = int(q)
            workouts = Workout.objects.filter(distance_m__icontains=q)
        else:
            workouts = (
                Workout.objects.filter(activity_type__icontains=q) | 
                Workout.objects.filter(name__icontains=q)
            )
        
    else:
        workouts = Workout.objects.all()

    workouts_count = workouts.count()

    context = {
        'workouts': workouts,
        'workouts_count' : workouts_count,
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





