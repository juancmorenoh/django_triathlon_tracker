from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializer import UserSerializer

class UserCreate(generics.CreateAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = [AllowAny]

  #overridinh this method actually hash the password in DRF
  #Only solution I found so far
  def perform_create(self, serializer):
        instance = serializer.save()
        instance.set_password(instance.password)
        instance.save()