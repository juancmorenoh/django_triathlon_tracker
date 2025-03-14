from django.urls import include, path
from .views import WorkoutView

urlpatterns = [
    path('', WorkoutView.as_view())
]
