from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    #OneToOneField = One Profile can be associated only to one User
    #on_delete=models.CASCADE = If User is deleted also delete their Profile
    #But not the other way around
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(default='default.jpg',upload_to='profile_pics')

    def __str__(self):
    
        return f"{self.user.username} Profile"