from django.contrib import admin
from django.http import HttpResponse
from django.utils.encoding import smart_str
from helios_usabilitystudy.models import Subject
from helios_usabilitystudy.models import Option
from helios_usabilitystudy.models import Question
from helios_usabilitystudy.models import Timestamp
import csv


def export_csv(timestamp, request, queryset):

    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename=results.csv'
    writer = csv.writer(response, csv.excel)
    response.write(u'\ufeff'.encode('utf8'))
    writer.writerow([
        smart_str(u"Subject"),
        smart_str(u"Timestamp"),
        smart_str(u"Type"),

    ])
    for obj in queryset:
        writer.writerow([
            smart_str(obj.subject),
            smart_str(obj.timestamp),
            smart_str(obj.type),
        ])
    return response
export_csv.short_description = u"Export CSV"


class MyDurationAdmin(admin.ModelAdmin):
    actions = [export_csv]
    list_display = ('subject', 'timestamp', 'type')


admin.site.register(Timestamp, MyDurationAdmin)
admin.site.register(Option)
admin.site.register(Question)
admin.site.register(Subject)


