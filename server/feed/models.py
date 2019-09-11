from django.db import models


class Link(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=4096)
    url = models.URLField()
