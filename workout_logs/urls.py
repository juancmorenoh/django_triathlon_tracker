from django.urls import path
from .import views  # Import views from the app
from .views import WorkoutListView

urlpatterns = [
    path('workouts/', WorkoutListView.as_view(), name='workout_list'),
    path('workouts/add/', views.add_workout, name='add_workout'),
    path('workouts/<int:workout_id>/', views.detail_workout, name='detail_workout'),

]