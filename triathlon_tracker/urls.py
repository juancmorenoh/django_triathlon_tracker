"""
URL configuration for triathlon_tracker project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import include, path
from apps.workout_logs import views as workout_logs_views

#To handle static elements (only debug=true)
from django.conf import settings 
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/', workout_logs_views.home, name='home'),
    

    path('', include('apps.workout_logs.urls')), # Include the workout_logs app URLs
    path('user/', include('apps.users.urls')), # Include the users app URLs
]
if settings.DEBUG:         
   urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

