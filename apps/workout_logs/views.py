from django.shortcuts import render , redirect , get_object_or_404
from django.contrib.auth.decorators import login_required
from django.db.models import Q
from .models import Workout, Race, Goal, Discipline
from .forms import WorkoutForm, RaceForm, GoalForm
from django.urls import reverse
from datetime import datetime
from django.forms import inlineformset_factory

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
            workouts = (
                Workout.objects.filter(Q(activity_type__icontains=q) | Q(name__icontains=q))   
            )       

    workouts = workouts.order_by('-date')
    workouts_count = workouts.count()

    context = {
        'workouts': workouts,
        'workouts_count' : workouts_count,
    } 
    return render(request, 'workout_logs/workout_list.html', context)

@login_required
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

@login_required
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

@login_required
def delete_workout(request, id):
    return delete_object(request, Workout, id, 'workout_list')

@login_required
def detail_workout(request,workout_id):
    workout = get_object_or_404(Workout, id=workout_id)
    return render(request,'workout_logs/detail_workout.html',{'workout': workout})


#CRUD RACE MODEL
@login_required
def races(request):
    
    user_races = Race.objects.filter(user = request.user)
    current_date = datetime.now()
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


################################
#FIX THIS!!!!!!!! discipline_form evaluetes to FALSE, always??
################################
def add_race(request):
    DisciplineFormSet = inlineformset_factory(
    Race,
    Discipline,
    fields = ['name','distance','time_limit','order'],
    extra = 3
    )
    
    if request.method ==  'POST':
        race_form = RaceForm(request.POST)
        formset = DisciplineFormSet(request.POST)
        
        if race_form.is_valid() and formset.is_valid():
            print("Hello")
            race = race_form.save(commit=False)  # Do not save to the database yet
            race.user = request.user 
            race.save()
            disciplines = formset.save(commit=False)
            
            for discipline in disciplines:
                discipline.race = race
                discipline.save()
            return redirect('races')
    else:
        race_form = RaceForm()
        formset = DisciplineFormSet()

    context = {
        'race_form' : race_form,
        'formset': formset
    }
    return render(request, 'workout_logs/add_race.html', context)

def delete_race(request, id):
    return delete_object(request, Race, id, 'races')


def update_race(request, race_id):
    race = get_object_or_404(Race, id=race_id)

    disciplines_count = race.disciplines.count()
    extra_forms = max(0, 3 - disciplines_count)

    DisciplineFormSet = inlineformset_factory(
        Race,
        Discipline,
        fields=['name', 'distance', 'time_limit','order'],
        extra=extra_forms
    )

    if request.method ==  'POST':
        race_form = RaceForm(request.POST, instance=race)
        formset = DisciplineFormSet(request.POST, instance=race)

        if race_form.is_valid() and formset.is_valid():
            race = race_form.save()
            disciplines = formset.save(commit=False)
            for discipline in disciplines:
                discipline.race = race
                discipline.save()

            return redirect('races')
    else:
        race_form = RaceForm(instance=race)
        formset = DisciplineFormSet(instance=race)

    context={
        
        'race_form': race_form,
        'formset': formset,
    }
    return render(request, 'workout_logs/add_race.html', context)


def detail_race(request, race_id):
    race = get_object_or_404(Race, id= race_id)
    disciplines = race.disciplines.all() #related_name in the model= disciplines instead of discipline_set
    context={ 'race': race , 'disciplines': disciplines} 
    return render(request, 'workout_logs/detail_race.html', context)


#CRUD Create, Read, Update, Delete for Goals
def goals(request):
    user_goals = Goal.objects.filter(user=request.user)
    achieved_goals = user_goals.filter(achieved=True)   
    not_achieved_goals = user_goals.filter(achieved=False)

    context = {
        'goals': user_goals,
        'achieved_goals': achieved_goals,
        'not_achieved_goals': not_achieved_goals,
    }
    return render(request,'workout_logs/goals.html', context)


def add_goal(request):
    if request.method == 'POST':
        form = GoalForm(request.POST)
        if form.is_valid():
            goal = form.save(commit=False)
            goal.user = request.user
            goal.save()
            return redirect('goals')
    else:
        form = GoalForm()
    return render(request, 'workout_logs/add_goal.html', {'form': form})

def delete_goal(request, id):
    return delete_object(request, Goal, id, 'goals')

def detail_goal(request, id):
    goal = get_object_or_404(Goal, id=id)
    return render(request, 'workout_logs/detail_goal.html', {'goal': goal})

def update_goal(request, id):
    goal = get_object_or_404(Goal, id=id)
    if request.method == 'POST':
        form = GoalForm(request.POST, instance=goal)
        if form.is_valid():
            form.save()
            return redirect('goals')
    else:
        form = GoalForm(instance=goal)
    context = {
        'goal': goal, 
        'form': form
        }
    return render(request, 'workout_logs/create_goal.html', context)





#Generic function to delete the model and id of the object passed
def delete_object(request, model, id, redirect_url):
    obj = get_object_or_404(model, id=id)

    if request.method == 'POST':
        obj.delete()
        return redirect(redirect_url)
    
    context = {
        'object': obj,
        'reverse_url': reverse(redirect_url),
    }
    return render(request, 'workout_logs/generic_delete.html', context)


