from django.db import models
from django.contrib.auth.models import User
from PIL import Image

class Profile(models.Model):
    #OneToOneField = One Profile can be associated only to one User
    #on_delete=models.CASCADE = If User is deleted also delete their Profile
    #But not the other way around
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(default='default.jpg',upload_to='profile_pics')

    def __str__(self):
    
        return f"{self.user.username} Profile"

    #understand why the args and kwargs are being passed here
    def save(self, *args, **kwargs):  # Add *args and **kwargs here
        super().save(*args, **kwargs)  # Pass *args and **kwargs to the parent class's save method

        img = Image.open(self.image.path)

        if img.height > 300 or img.width > 300:
            output_size = (300,300)
            img.thumbnail(output_size)
            img.save(self.image.path)
    
    
