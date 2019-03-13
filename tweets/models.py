from django.db import models

# Create your models here.

class Tweet(models.Model):
    content = models.TextField()
    date = models.DateField(auto_now_add = True)
# end
