from django.urls import path
from .views import WorkoutListCreate,WorkoutDelete

urlpatterns = [
    path('workouts/', WorkoutListCreate.as_view(), name = 'workouts-list'),
    path('workouts/delete/<int:pk>', WorkoutDelete.as_view(), name='workout-delete'),
]
