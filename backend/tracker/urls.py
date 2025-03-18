from django.urls import path
from . import views  # Import views from the app

from .views import RaceList

urlpatterns = [
    path('workouts', views.workout_list, name='workout_list'),
    path('workouts/add/', views.add_workout, name='add_workout'),
    path('workouts/<int:workout_id>/', views.detail_workout, name='detail_workout'),
    path('workouts/<int:workout_id>/update/', views.update_workout, name='update_workout'),
    path('workouts/<int:id>/delete/', views.delete_workout, name='delete_workout'),

    path('races/', views.races, name='races'),
    path('races/add/', views.add_race, name='add_race'),
    path('races/<int:race_id>/',views.detail_race, name ='detail_race'),
    path('races/<int:id>/delete/', views.delete_race, name='delete_race'),
    path('races/<int:race_id>/update/', views.update_race, name='update_race'),

    

    path('goals/', views.goals, name='goals'),
    path('goals/add/', views.add_goal, name='add_goal'),
    path('goals/<int:id>/', views.detail_goal, name='detail_goal'),
    path('goals/<int:id>/delete/', views.delete_goal, name='delete_goal'),
    path('goals/<int:id>/update/', views.update_goal, name='update_goal'),
    
    path('api/races/', RaceList.as_view(), name = 'race_list_api')
]