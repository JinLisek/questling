from django.db import models

class Quest(models.Model):
    header = models.CharField(max_length = 300)
    description = models.CharField(max_length = 3000, blank = True)
    author = models.CharField(max_length = 50)
    created_at = models.DateTimeField(auto_now_add = True)
