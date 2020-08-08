from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    # additional fields
    notes = models.TextField()

    class Meta:
        ordering = ["-id"]
    
    def __str__(self):
        return self.username

