from django.shortcuts import render, redirect
from django.contrib.auth import authenticate
from django.contrib.auth import login as django_login
from datetime import datetime
from django.http import HttpResponse, HttpResponseServerError
from django.views.decorators.csrf import csrf_exempt
from helios_usabilitystudy.models import Subject, Timestamp
import json


def welcome(request):
    return render(request, 'helios_usabilitystudy/welcome_DE.html', {})


@csrf_exempt
def login(request):
    print(request.POST)
    username = request.POST['id']
    password = request.POST['password']
    language = request.POST['language']

    if not username:
        error_id = "Bitte geben Sie eine ID ein."
        return render(request, 'helios_usabilitystudy/welcome_DE.html', {'error': error_id})

    if not password:
        error_pw = "Bitte geben Sie ein Passwort ein."
        return render(request, 'helios_usabilitystudy/welcome_DE.html', {'error': error_pw})

    user = authenticate(username=username, password=password)
    if user is not None:
        django_login(request, user)

        if user.username == "admin":
            return redirect("admin")
        else:
            subject = Subject.objects.get(subject_id=username)
            type = subject.experiment_type
            print("Experiment type is " + type)
            return return_experiment(experiment_type=type, username=username)
    else:
        print("User doesn't exist")
        error = "Die ID ist nicht vergeben oder das Passwort stimmt nicht."
        return render(request, 'helios_usabilitystudy/welcome_DE.html', {'error': error})


# Conditional redirect depending on experiment type
def return_experiment(experiment_type, username):
    return {
        'BE': redirect('smartphone/' + username),
        'NE': redirect('neuchatel/' + username),
    }.get(experiment_type, 1)


@csrf_exempt
def save_timestamp(request):
    subject_temp = request.POST['id']
    timestamp_temp = int(request.POST['timestamp'])
    type_temp = request.POST['type']

    subject = Subject.objects.get(subject_id=subject_temp)

    timestamp = Timestamp(subject=subject, timestamp=datetime.fromtimestamp(timestamp_temp / 1000),
                          timestamp_unix=timestamp_temp, type=type_temp)
    timestamp.save()

    return HttpResponse("OK")


@csrf_exempt
def unmanipulate(request):
    if 'id' not in request.POST:
        return HttpResponse('{"Error": "No ID supplied."}', content_type='application/json', status=400)
    subject_temp = request.POST['id']
    subject = Subject.objects.get(subject_id=subject_temp)
    subject.is_manipulated = False
    subject.save()
    return HttpResponse("OK")


@csrf_exempt
def get_manipulated(request):
    if 'id' not in request.POST:
        return HttpResponse('{"Error": "No ID supplied."}', content_type='application/json', status=400)
    subject_temp = request.POST['id']
    subject = Subject.objects.get(subject_id=subject_temp)
    return HttpResponse(json.dumps({'is_manipulated': subject.is_manipulated}), content_type='application/json')


@csrf_exempt
def logout(request):
    pass