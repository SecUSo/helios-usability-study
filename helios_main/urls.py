from django.conf.urls import url
from helios_main import views


urlpatterns = [
    url(r'^.*', views.home, name='home'),
    url(r'^assign$', views.assign, name='assign'),
]
