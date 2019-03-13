from django.db import models

# Create your models here.

class Tweet(models.Model):
    content = models.CharField(max_length = 800)
    date = models.DateField(auto_now_add = True)

    __str__ = lambda self: self.content[:100]
# end