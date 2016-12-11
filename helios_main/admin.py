from django.contrib import admin
from helios_usabilitystudy.models import Subject
from helios_usabilitystudy.models import Option
from helios_usabilitystudy.models import Question
from helios_usabilitystudy.models import Duration


admin.site.register(Option)
admin.site.register(Question)
admin.site.register(Duration)
admin.site.register(Subject)



