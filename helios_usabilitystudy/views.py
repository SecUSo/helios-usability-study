from django.shortcuts import render, redirect
from django.http import HttpResponse
import os


def welcome(request):
    return render(request, 'helios_usabilitystudy/welcome.html', {})


def login(request):
    print(request.POST)
    return redirect('main/')