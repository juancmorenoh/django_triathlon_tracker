from django.urls import path
from . import views as user_views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('register/', user_views.register, name='register'),
    path('profile/', user_views.profile, name='profile'),
    path('profile/update', user_views.update_profile, name='profile_update'),
    path('login/', auth_views.LoginView.as_view(template_name ='users/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(template_name ='users/logout.html'), name='logout'),
]