from django.shortcuts import render
from django.http import JsonResponse
from .models import Player, Tournament

def home(request):
    return render(request, 'game/home.html')

def login(request):
    return render(request, 'game/login.html')

def signup(request):
    return render(request, 'game/sign_up.html')

def start_tournament(request):
    if request.method == 'POST':
        player1 = Player.objects.create(name=request.POST['player1'])
        player2 = Player.objects.create(name=request.POST['player2'])
        tournament = Tournament.objects.create(name="New Tournament")
        tournament.players.add(player1, player2)
        return render(request, 'game/game.html', {'tournament': tournament})
    return render(request, 'game/home.html')

def update_score(request):
    if request.method == 'POST':
        player_id = request.POST.get('player_id')
        player = Player.objects.get(id=player_id)
        player.score += 1
        player.save()
        return JsonResponse({'success': True, 'new_score': player.score})
    return JsonResponse({'success': False})

