from django.shortcuts import render , redirect
from django.contrib.auth import login
from django.contrib.auth.models import User
from .forms import UserRegistrationForm, ProfileUpdateForm, UserUpdateForm
from django.contrib.auth.decorators import login_required

from apps.workout_logs.models import Workout
from datetime import timedelta, datetime
from django.db.models import Avg, Max, Sum, Count
from django.utils.timezone import localtime

# Create your views here.

def register(request):
    
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('workout_list') 
    else:
        form = UserRegistrationForm()
    return render(request, 'users/register.html', {'form': form})

@login_required
def update_profile(request):
    if request.method == 'POST':
        user_form =  UserUpdateForm(request.POST, instance=request.user)
        profile_form = ProfileUpdateForm(request.POST,
                                        request.FILES,
                                        instance=request.user.profile)
        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            return redirect('profile')
    else:
        user_form =  UserUpdateForm(instance=request.user)
        profile_form = ProfileUpdateForm(instance=request.user.profile)
    
    context = {
        'user_form': user_form,
        'profile_form': profile_form
    }
    return render(request, 'users/update_profile.html', context)

@login_required
def profile(request):
    user = request.user
    current_date = datetime.now()
    current_year = current_date.year
    four_weeks_ago = current_date - timedelta(weeks=4)
    range_selected_years = range(current_year - 5, current_year + 1)

    activity_type = request.GET.get('activity_type', 'run')

    selected_year = int(request.GET.get('year', current_year))
    workouts = Workout.objects.filter(user=user, activity_type=activity_type)

    last_4_weeks = workouts.filter(date__gte=four_weeks_ago) #any date >= 4weeks ago
    last_4_weeks_count = last_4_weeks.count()
    avg_distance_last_4_weeks = last_4_weeks.aggregate(Avg('distance_m'))['distance_m__avg'] or 0#if avd distance is None, set it to 0
    avg_time_last_4_weeks = last_4_weeks.aggregate(Avg('duration'))['duration__avg'] or 0

    longest_activity = workouts.aggregate(Max('distance_m'), Max('duration'))
    longest_distance = longest_activity['distance_m__max'] or 0
    longest_time = longest_activity['duration__max'] or 0

    total_distance = workouts.aggregate(Sum('distance_m'))['distance_m__sum'] or 0
    total_time = workouts.aggregate(Sum('duration'))['duration__sum'] or 0
    total_activities = workouts.count()

    yearly_workouts = workouts.filter(date__year=selected_year)
    yearly_count = yearly_workouts.count()
    yearly_distance = yearly_workouts.aggregate(total_distance=Sum('distance_m'))['total_distance'] or 0
    yearly_time = yearly_workouts.aggregate(total_time=Sum('duration'))['total_time'] or 0

    context = {
        'last_4_weeks_count': last_4_weeks_count,
        'avg_distance_last_4_weeks': avg_distance_last_4_weeks / 1000, 
        'avg_time_last_4_weeks': avg_time_last_4_weeks,

        'longest_distance': longest_distance / 1000, 
        'longest_time': longest_time,
        'total_distance': total_distance / 1000,
        'total_time': total_time,
        'total_activities': total_activities,

        'yearly_count': yearly_count,
        'yearly_distance': yearly_distance / 1000, 
        'yearly_time': yearly_time,
        'selected_year': selected_year,
        'range_selected_years': range_selected_years,
        'activity_type': activity_type,
        
    }

    
    return render(request, 'users/profile.html', context)