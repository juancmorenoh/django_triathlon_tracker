from django.urls import path
from . import views  # Import views from the app

urlpatterns = [
    path('workouts/', views.workout_list, name='workout_list'),
]