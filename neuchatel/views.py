from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from helios_usabilitystudy.models import Question, Subject, Timestamp
import json
import os


def home(request):
    with open(os.path.join(os.path.dirname(__file__), "static/neuchatel/index.html"), 'r') as index_html_file:
        return HttpResponse(index_html_file.read(), content_type='text/html')


@csrf_exempt
def assign(request):
    if 'id' not in request.POST:
        return HttpResponse('{"Error": "No ID supplied."}', content_type='application/json', status=400)

    question = Question.objects.all()[0]
    question_one = Question.objects.all()[1]
    options_list = question.options.all()
    options_list_one = question_one.options.all()

    options_dict = {}
    options_dict_one = {}

    for op in options_list:
        options_dict[op.option_code] = {
            'option': op.option,
            'option_description': op.option_description,
            'option_return_code': op.option_return_code}

    for op in options_list_one:
        options_dict_one[op.option_code] = {
            'option': op.option,
            'option_description': op.option_description,
            'option_return_code': op.option_return_code}

    print("Experiment assigned")

    return HttpResponse(json.dumps({
        'question_data': {
            'question_id': question.pk,
            'question_one': question_one.question,
            'question_one_answers': question_one.number_answers,
            'question': question.question,
            'answers': question.number_answers,
            'options': options_dict,
            'options_one': options_dict_one
        }
    }), content_type='application/json')
