from django.urls import path
from .views import WorkoutListCreate,WorkoutDelete,UserCreate,WorkoutDetail

urlpatterns = [
    path('workouts/', WorkoutListCreate.as_view(), name = 'workouts-list'),
    path('workouts/<int:pk>', WorkoutDetail.as_view(), name = 'workouts-detail'),
    path('workouts/delete/<int:pk>', WorkoutDelete.as_view(), name='workout-delete'),
    path('user/register', UserCreate.as_view(), name='register'),  # Added this new URL path.
]
