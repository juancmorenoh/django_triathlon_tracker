from django import forms
from .models import Workout, Race, Goal

class WorkoutForm(forms.ModelForm):
    class Meta:
        model = Workout  # Link the form to the Workout model
        fields = ['name', 'activity_type', 'distance_m', 'duration', 'date', 'intensity', 'notes']  # Specify which fields to include in the form
        
        # Custom widget for the date field
        widgets = {
            'date': forms.DateInput(attrs={'type': 'date'}),  # Ensures the browser uses a date picker
        }

        labels = {
            'activity_type': 'Type of Activity',
            'distance_m': 'Distance (in meters)',
            'duration': 'Duration',
            'date': 'Workout Date',
            'intensity': 'Intensity (1-5)',
            'notes': 'Additional Notes',
        }

class RaceForm(forms.ModelForm):
    class Meta:
        model = Race
        fields = ['race_name','date','prediction_time','location']
        labels = {
            'race_name': 'Race Name',
            'date': 'Race Date',
            'prediction_time': 'Predicted Time',
            'location': 'Location',
        }
        widgets = {
            'date': forms.DateInput(attrs={'type': 'date'}),  # Ensures the browser uses a date picker
        }

    
#You have to create a form for disciplines

class GoalForm(forms.ModelForm):
    class Meta:
        model = Goal
        fields = ['goal_type', 'target_value', 'achieved', 'start_date', 'end_date', 'description']

        widgets = {
            'start_date': forms.DateInput(attrs={'type': 'date'}), 
            'end_date': forms.DateInput(attrs={'type': 'date'}), # Ensures the browser uses a date picker
        }