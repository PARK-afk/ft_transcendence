from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('static/', views.static, name='static'),
    # path('', views.index, name='index'),
    # path('login/', views.login, name='login'),
    # path('signup/', views.signup, name='signup'),
    # path('start/', views.start_tournament, name='start_tournament'),
    # path('update_score/', views.update_score, name='update_score'),
    # path('save_result/', views.save_result, name='save_result'),
]