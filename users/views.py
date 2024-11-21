from django.shortcuts import render , redirect, get_object_or_404
from django.contrib.auth.models import User
from .forms import userRegistrationForm
from django.contrib.auth.decorators import login_required
# Create your views here.

def register(request):
    if request.method == 'POST':
        form = userRegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('workout_list')  # Redirect to your homepage or any other page
    else:
        form = userRegistrationForm()
    return render(request, 'users/register.html', {'form': form})

    
@login_required
def profile(request):
    return render(request, 'users/profile.html')
