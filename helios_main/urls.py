from django.conf.urls import url
from helios_main import views


urlpatterns = [
    url(r'^assign$', views.assign, name='assign'),
    url(r'^submit', views.save_duration, name='save_duration'),
    url(r'^.*', views.home, name='home'),
]
