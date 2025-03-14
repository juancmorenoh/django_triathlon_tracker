from django.db import models
from django.contrib.auth.models import User
from PIL import Image
import os
from django.conf import settings

class Profile(models.Model):
    #OneToOneField = One Profile can be associated only to one User
    #on_delete=models.CASCADE = If User is deleted also delete their Profile
    #But not the other way around
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(default='default.jpg',  null=True)

    def __str__(self):
    
        return f"{self.user.username} Profile"

    #understand why the args and kwargs are being passed here
    def save(self, *args, **kwargs):
        # Ensure default is used if image is None
        if not self.image:
            self.image = 'default.jpg'

        super().save(*args, **kwargs)

        # Resize image if not default
        if self.image and self.image.name != 'default.jpg':
            img = Image.open(self.image.path)
            if img.height > 300 or img.width > 300:
                output_size = (300, 300)
                img.thumbnail(output_size)
                img.save(self.image.path)
    
    
