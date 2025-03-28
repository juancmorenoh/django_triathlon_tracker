# Generated by Django 5.1.4 on 2025-01-13 11:11

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tracker', '0005_workout_user'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Race',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('race_name', models.CharField(max_length=100)),
                ('date', models.DateField()),
                ('prediction_time', models.DurationField()),
                ('final_time', models.DurationField(blank=True, null=True)),
                ('location', models.CharField(max_length=200)),
                ('user', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-date'],
            },
        ),
    ]
