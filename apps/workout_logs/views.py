from django.shortcuts import render , redirect , get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Workout, Race
from .forms import WorkoutForm, RaceForm

from datetime import datetime

def home(request):
    return render(request,'workout_logs/homepage.html')

@login_required
def workout_list(request):
    q = request.GET.get('q') # q in quotes is whatever is passed in the URL. If there's no q, it will be None.
    workouts = Workout.objects.filter(user = request.user)

    if q:
        if q.isdigit(): 
            q = int(q)
            workouts = Workout.objects.filter(distance_m__icontains=q)
        else:
             #Use Q object instead (remember to implement)
            workouts = (
                Workout.objects.filter(activity_type__icontains=q) | 
                Workout.objects.filter(name__icontains=q)
            )       

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
            workout = form.save(commit=False)
            workout.user = request.user 
            workout.save()
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


#CRUD RACE MODEL
@login_required
def races(request):
    current_date = datetime.now()
    user_races = Race.objects.filter(user = request.user)
    
    upcoming_races = Race.objects.filter(date__gte=current_date)
    past_races = Race.objects.filter(date__lt=current_date)
    past_races_count = past_races.count()
    upcoming_races_count = upcoming_races.count()
    context = {
        'races': user_races,
        'past_races': past_races,
        'upcoming_races': upcoming_races,
        'past_races_count': past_races_count,
        'upcoming_races_count': upcoming_races_count,
    }

    return render(request,'workout_logs/races.html', context)


def add_race(request):
    if request.method ==  'POST':
        form = RaceForm(request.POST)
        if form.is_valid():
            race = form.save(commit=False)  # Do not save to the database yet
            race.user = request.user 
            race.save()
            return redirect('races')
    else:
        form = RaceForm()
    return render(request, 'workout_logs/add_race.html', {'form': form})

def delete_race(request, race_id):
    race = get_object_or_404(Race, id=race_id)
    if request.method ==  'POST':
        race.delete()
        return redirect('races')
    return render(request, 'workout_logs/delete_race.html', {'race': race})


def update_race(request, race_id):
    race = get_object_or_404(Race, id=race_id)
    if request.method ==  'POST':
        form = RaceForm(request.POST, instance=race)
        if form.is_valid():
            form.save()
            return redirect('races')
    else:
        form = RaceForm(instance=race)

    context={
        'race': race,
        'form': form,
    }
    return render(request, 'workout_logs/add_race.html', context)
