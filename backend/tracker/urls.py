from django.urls import path
from .views import WorkoutList, WorkoutDetail, RaceList, RaceDetail,GoalList, GoalDetail
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('', views.api_root, name='api_root'),
    path('workouts/', WorkoutList.as_view(), name = 'workout-list'),
    path('workouts/<int:pk>/', WorkoutDetail.as_view(), name = 'workout-detail'),
    path('races/', RaceList.as_view(), name = 'race-list'),
    path('races/<int:pk>/', RaceDetail.as_view(), name = 'race-detail'),
    path('goals/', RaceList.as_view(), name = 'goal-list'),
    path('goals/<int:pk>/', RaceDetail.as_view(), name = 'goal-detail'),


    # path('workouts', views.workout_list, name='workout_list'),
    # path('workouts/add/', views.add_workout, name='add_workout'),
    # path('workouts/<int:workout_id>/', views.detail_workout, name='detail_workout'),
    # path('workouts/<int:workout_id>/update/', views.update_workout, name='update_workout'),
    # path('workouts/<int:id>/delete/', views.delete_workout, name='delete_workout'),

    # path('races/', views.races, name='races'),
    # path('races/add/', views.add_race, name='add_race'),
    # path('races/<int:race_id>/',views.detail_race, name ='detail_race'),
    # path('races/<int:id>/delete/', views.delete_race, name='delete_race'),
    # path('races/<int:race_id>/update/', views.update_race, name='update_race'),

    

    # path('goals/', views.goals, name='goals'),
    # path('goals/add/', views.add_goal, name='add_goal'),
    # path('goals/<int:id>/', views.detail_goal, name='detail_goal'),
    # path('goals/<int:id>/delete/', views.delete_goal, name='delete_goal'),
    # path('goals/<int:id>/update/', views.update_goal, name='update_goal'),
]

# Add format suffixes for API endpoints
urlpatterns = format_suffix_patterns(urlpatterns)