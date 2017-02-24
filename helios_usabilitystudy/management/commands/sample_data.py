from django.core.management.base import BaseCommand
from helios_usabilitystudy.models import Question, Option
import json
import os


class Command(BaseCommand):
    help = 'Create some sample data'

    def handle(self, *args, **options):
        self.stdout.write("Inserting initial data ...\n")

        with open(os.path.abspath(
                os.path.join(
                    os.path.dirname(__file__),
                    os.path.pardir,
                    os.path.pardir,
                    os.path.pardir,
                    "sample_data.json")),
                'r') as data_file:
            data = json.loads(data_file.read())
            for option_data in data['option']:
                option = Option()
                option.option_code = option_data['option_code']
                option.option = option_data['option']
                option.option_description = option_data['option_description']
                option.save()

            for question_data in data['question']:
                question = Question()
                question.question = question_data['question']
                question.number_answers = question_data['number_answers']
                question.save()
                for option_id in question_data['options']:
                    question.options.add(Option.objects.get(pk=option_id))
                question.save()

        self.stdout.write("Done inserting initial data ...\n")
