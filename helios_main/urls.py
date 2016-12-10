from django.conf.urls import patterns, url

urlpatterns = patterns(
    '',
    url(r'^main$', 'helios_main.views.TODO', name='TODO'),
    url(r'^booth$', 'helios_main.views.TODO', name='TODO'),
    url(r'^submit', 'helios_main.views.TODO', name='TODO'),
)

