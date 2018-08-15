from django.conf.urls import url
from neuchatel import views


urlpatterns = [
    url(r'^assign$', views.assign, name='assign'),
    url(r'^.*', views.home, name='home'),
]
