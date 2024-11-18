from django import forms
from .models import Workout

class WorkoutForm(forms.ModelForm):
    class Meta:
        model = Workout  # Link the form to the Workout model
        fields = ['activity_type', 'distance_m', 'duration', 'date', 'intensity', 'notes']  # Specify which fields to include in the form
        
        # Custom widget for the date field
        widgets = {
            'date': forms.DateInput(attrs={'type': 'date'}),  # Ensures the browser uses a date picker
        }

        labels = {
            'activity_type': 'Type of Activity',
            'distance_m': 'Distance (in meters)',
            'duration': 'Duration',
            'date': 'Workout Date',
            'intensity': 'Intensity (1-10)',
            'notes': 'Additional Notes',
        }