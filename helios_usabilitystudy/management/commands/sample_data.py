from django.core.management.base import BaseCommand, CommandError
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

            for question_data in data['question']:
                question = Question()
                question.question = question_data['question']
                question.number_answers = question_data['number_answers']
                question.option = question_data['option']

        self.stdout.write("Done inserting initial data ...\n")
