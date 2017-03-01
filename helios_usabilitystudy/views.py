from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth import login as django_login
from django.contrib.auth import logout as django_logout
from django.views.decorators.csrf import csrf_exempt
from django import forms
from helios_usabilitystudy.models import Subject
import os


def welcome(request):
    return render(request, 'helios_usabilitystudy/welcome_DE.html', {})


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
        subject = Subject.objects.get(subject_id=username)
        type = subject.experiment_type
        print("Experiment type is " + type)

        return return_experiment(experiment_type=type, username=username)
    else:
        print("User doesn't exist")
        error = "Die ID ist nicht vergeben oder das Passwort stimmt nicht."
        return render(request, 'helios_usabilitystudy/welcome_DE.html', {'error': error})
        #return redirect('login/')


# Conditional redirect depending on experiment type
def return_experiment(experiment_type, username):
    return {
        '1': redirect('main/' + username),
        '2': redirect('institute/' + username),
        '3': redirect('smartphone/' + username),
    }.get(experiment_type, 1)


@csrf_exempt
def logout(request):
    pass

