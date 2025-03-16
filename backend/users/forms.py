from django import forms
from django.contrib.auth.forms import UserCreationForm 
from django.contrib.auth.models import User
from .models import Profile

class UserRegistrationForm(UserCreationForm):
    email = forms.EmailField()
    class Meta:
        model = User
        fields = ['username','email', 'password1', 'password2',]



#form to update useranem and password
class UserUpdateForm(forms.ModelForm):
    email = forms.EmailField()
    class Meta:
        model = User
        fields = ['username','email']


#form to update img
class ProfileUpdateForm(forms.ModelForm):
    remove_image = forms.BooleanField(required=False, label="Remove Profile Image")

    #If the profile pic is not the default the form will show remove image field
    def __init__(self, *args, **kwargs):
        profile = kwargs.get('instance')
        super().__init__(*args, **kwargs)
        if profile.image.name == 'default.jpg':
            self.fields['remove_image'].widget = forms.HiddenInput()
            
    class Meta:
        model = Profile
        fields = ['image']