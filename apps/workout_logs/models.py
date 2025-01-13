from django.contrib.auth.models import User
from django.db import models




class Workout(models.Model):  
    """
    This model represents a workout, including details such as activity type, 
    distance, duration, intensity, date, and optional notes.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    # Define the activity types using choices. This makes it easier to standardize the data.
    ACTIVITY_CHOICES = [
        ('swim', 'Swim'),  # 'swim' is stored in the database, 'Swim' is displayed to users.
        ('ride', 'Ride'),
        ('run', 'Run'),
    ]

    INTENSITY_CHOICES = [
        (1, 'Very Low'),
        (2, 'Low'),
        (3, 'Medium'),
        (4, 'High'),
        (5, 'Very High'),
    ]

    name = models.CharField(
        blank=True,
        max_length=100,
        help_text="Name or title of the workout"
    )

    activity_type = models.CharField(
        max_length=10, 
        choices=ACTIVITY_CHOICES  # Restricts input to the predefined activity types.
    )

    distance_m = models.IntegerField(
        help_text="Distance in meters"
    )

    duration = models.DurationField(
        help_text="Duration of the workout (hh:mm:ss)"
    )


    date = models.DateField(
        help_text="Date of the workout"
    )

    intensity = models.PositiveSmallIntegerField(
        choices=INTENSITY_CHOICES,
        help_text="Intensity of the workout on a scale from 1 - 5"
    )

    notes = models.TextField(
        blank=True,  # Allows the field to be left empty in forms.
        null=True,   # Allows NULL values in the database.
        help_text="Optional notes about the workout"
    )

    def __str__(self):
        # get_activity_type_display() returns the user-friendly name from ACTIVITY_CHOICES.
        # django generates get_<field_name>_display() function when using "choices" field
        return f"{self.get_activity_type_display()} on {self.date}"



class Race(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True)

    race_name = models.CharField(max_length=100)
    date = models.DateField()
    prediction_time = models.DurationField()
    final_time = models.DurationField(null=True, blank=True)
    location = models.CharField(max_length=200)

    
    class Meta:
        ordering = ['date']

    def __str__(self):
        return self.race_name