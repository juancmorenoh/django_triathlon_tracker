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

    

    
