from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth import login as django_login
from django import forms
from django.views.decorators.csrf import csrf_exempt
import os


def welcome(request):
    return render(request, 'helios_usabilitystudy/welcome.html', {})


@csrf_exempt
def login(request):
    print(request.POST)
    username = request.POST['id']
    password = request.POST['password']
    language = request.POST['language']

    if not username or not password:
        print("Invalid login")

    user = authenticate(username=username, password=password)
    if user is not None:
        django_login(request, user)
        return redirect('main/' + username)
    else:
        print("User doesn't exist")
        return redirect('login/')
