from django.conf import settings
from django.conf.urls import url
from helios_main import views
from django.conf.urls.static import static

urlpatterns = static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + [
    url(r'^.*', views.home, name='home'),
    # url(r'^main$', views.introduction, name='introduction'),
    # url(r'^booth$', 'helios_main.views.TODO', name='TODO'),
    # url(r'^submit', 'helios_main.views.TODO', name='TODO'),
]
