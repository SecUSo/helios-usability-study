from django.conf.urls import url
from helios_smartphone import views


urlpatterns = [
    url(r'^.*', views.home, name='home'),
    # url(r'^main$', views.introduction, name='introduction'),
    # url(r'^booth$', 'helios_main.views.TODO', name='TODO'),
    # url(r'^submit', 'helios_main.views.TODO', name='TODO'),
]
