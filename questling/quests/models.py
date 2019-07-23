from django.db import models
from django.contrib.auth.models import User


class Quest(models.Model):
    header = models.CharField(max_length=300)
    description = models.CharField(max_length=3000, blank=True)
    # author = models.CharField(max_length=50)
    author = models.ForeignKey(
        User, related_name="quests", on_delete=models.CASCADE, null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
