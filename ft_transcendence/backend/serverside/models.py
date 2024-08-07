from django.db import models

class MatchResult(models.Model):
    player1_score = models.IntegerField()
    player2_score = models.IntegerField()
    match_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.match_date} - Player 1: {self.player1_score}, Player2: {self.player2_score}"

