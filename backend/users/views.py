from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
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

#If superuser full list, otherwise single object
class UserList(generics.ListAPIView):
  serializer_class = UserSerializer
  permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access

  def get_queryset(self):
      user = self.request.user
      # Check if the user is a superuser
      if user.is_superuser:
          return User.objects.all()  # If superuser, return all users
      return User.objects.filter(id=user.id)

#Single object    
class UserMe(APIView):
    permission_classes = [IsAuthenticated]
    #No need for query_set since we aren't filtering
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data) 
