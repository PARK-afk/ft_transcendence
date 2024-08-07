from django.db import models

class Player(models.Model):
    name = models.CharField(max_length=100)
    score = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class Tournament(models.Model):
    name = models.CharField(max_length=100)
    players = models.ManyToManyField(Player)

    def __str__(self):
        return self.name