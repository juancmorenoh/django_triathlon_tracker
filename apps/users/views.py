from django.shortcuts import render , redirect, get_object_or_404
from django.contrib.auth.models import User
from .forms import UserRegistrationForm, ProfileUpdateForm, UserUpdateForm
from django.contrib.auth.decorators import login_required

# Create your views here.

def register(request):
    
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('workout_list')  # Redirect to your homepage or any other page
    else:
        form = UserRegistrationForm()
    return render(request, 'users/register.html', {'form': form})


    
@login_required
def profile(request):
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
    
    #You pass to the template a dictionary called context
    #Left value is the name you will use in the template
    #right value is what you are actually passing (The variable created in THIS view)
    context = {
        'user_form': user_form,
        'profile_form': profile_form
    }
    return render(request, 'users/profile.html', context)
