from django.contrib import admin
from django.http import HttpResponse
from django.utils.encoding import smart_str
from helios_usabilitystudy.models import Subject
from helios_usabilitystudy.models import Option
from helios_usabilitystudy.models import Question
from helios_usabilitystudy.models import Duration
import csv


def export_csv(duration, request, queryset):

    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename=results.csv'
    writer = csv.writer(response, csv.excel)
    response.write(u'\ufeff'.encode('utf8'))
    writer.writerow([
        smart_str(u"Subject ID"),
        smart_str(u"Voting duration"),
        smart_str(u"Has verified?"),
        smart_str(u"Verification number"),
        smart_str(u"Verification duration"),
        smart_str(u"Overall"),

    ])
    for obj in queryset:
        writer.writerow([
            smart_str(obj.subject),
            smart_str(obj.voting_duration),
            smart_str(obj.has_verified),
            smart_str(obj.verification_number),
            smart_str(obj.verification_duration),
            smart_str(obj.overall_duration),
        ])
    return response
export_csv.short_description = u"Export CSV"


class MyDurationAdmin(admin.ModelAdmin):
    actions = [export_csv]
    list_display = (
    'subject', 'voting_duration', 'has_verified', 'verification_number', 'verification_duration', 'overall_duration')


admin.site.register(Duration, MyDurationAdmin)
admin.site.register(Option)
admin.site.register(Question)
admin.site.register(Subject)


