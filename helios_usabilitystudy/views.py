from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth import login as django_login
from django.views.decorators.csrf import csrf_exempt
from django import forms
from helios_usabilitystudy.models import Subject
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
        subject = Subject.objects.get(subject_id=username)
        type = subject.experiment_type
        print("Experiment type is " + type)

        # Conditional redirect depending on experiment type
        return returnExperiment(experiment_type=type, username=username)
    else:
        print("User doesn't exist")
        return redirect('login/')


def returnExperiment(experiment_type, username):
    return {
        '1': redirect('main/' + username),
        '2': redirect('institute/' + username),
        '3': redirect('smartphone/' + username),
    }.get(experiment_type, 1)
