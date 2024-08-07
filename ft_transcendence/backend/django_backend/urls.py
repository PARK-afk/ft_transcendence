"""
URL configuration for django_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from game import views as single_views
from serverside import views as serverside_views

urlpatterns = [
    path('', single_views.home, name='home'),
    path('serverside/', serverside_views.index, name='index'),
    path('save_result/', serverside_views.save_result, name='save_result'),
    path('login/', single_views.login, name='login'),
    path('signup/', single_views.signup, name='signup'),
    path('admin/', admin.site.urls),
    path('start/', single_views.start_tournament, name='start_tournament'),
    path('update_score/', single_views.update_score, name='update_score'),
    path('pong/', include('pong.urls')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
