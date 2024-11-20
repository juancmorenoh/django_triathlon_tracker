from django.shortcuts import render , redirect

from .forms import userRegistrationForm

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

    """
    def login(request):
    if request.method == 'POST':
        form = customerLoginForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('home')  # Redirect to homepage or dashboard
    else:
        form = customerLoginForm()
    
    return render(request, 'users/login.html', {'form': form})
    """
