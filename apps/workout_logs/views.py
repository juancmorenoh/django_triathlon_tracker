from django.shortcuts import render , redirect , get_object_or_404
from .models import Workout
from .forms import WorkoutForm




def workout_list(request):
    workouts = Workout.objects.all()
    return render(request, 'workout_logs/workout_list.html', {'workouts': workouts})

def home(request):
    return render(request,'workout_logs/homepage.html')

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

#You can create a separate view for deleting
#you might create a html with the button and add the block
#to the detail.html
def detail_workout(request,workout_id):
    workout = get_object_or_404(Workout, id=workout_id)
    return render(request,'workout_logs/detail_workout.html',{'workout': workout})





