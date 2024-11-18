from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models



class Workout(models.Model):  
    """
    This model represents a workout, including details such as activity type, 
    distance, duration, intensity, date, and optional notes.
    """

    # Define the activity types using choices. This makes it easier to standardize the data.
    ACTIVITY_CHOICES = [
        ('swim', 'Swimming'),  # 'swim' is stored in the database, 'Swimming' is displayed to users.
        ('bike', 'Cycling'),
        ('run', 'Running'),
    ]

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
        validators=[MinValueValidator(1), MaxValueValidator(10)],
        help_text="Intensity of the workout on a scale from 1 to 10"
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
    