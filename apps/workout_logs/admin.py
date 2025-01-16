from django.contrib import admin
from .models import Workout, Race, Discipline

# Register your models here.
admin.site.register(Workout)

admin.site.register(Race)

admin.site.register(Discipline)