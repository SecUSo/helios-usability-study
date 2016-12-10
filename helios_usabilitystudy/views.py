from django.shortcuts import render
from django.http import HttpResponse
import os


def welcome(request):
    return render(request, 'helios_usabilitystudy/welcome.html', {})


def login(request):
    pass