from django.shortcuts import render
from django.http import JsonResponse
from .models import MatchResult
import json

def index(request):
    return render(request, 'serverside/index.html')

def save_result(request):
    if request.method == "POST":
        data = json.loads(request.body)
        result = MatchResult(player1_score=data['player1_score'], player2_score=data['player2_score'])
        result.save()
        return JsonResponse({"message": "Result saved!"})

