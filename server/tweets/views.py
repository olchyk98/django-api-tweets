from django.shortcuts import render

from rest_framework import viewsets
from .models import Tweet
from .serializers import TweetSerializer

# Create your views here.

class TweetsView(viewsets.ModelViewSet):
    queryset = Tweet.objects.all().order_by('-date')
    serializer_class = TweetSerializer
# end
