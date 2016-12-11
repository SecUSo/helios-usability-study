from django.db import models


class Subject(models.Model):
    subject_id = models.CharField('Subject ID', max_length=30, unique=True, primary_key=True)
    subject_token = models.CharField('Subject_Token', max_length=30, unique=False)
    experiment_type = models.CharField('Experiment_Type', max_length=30, unique=False)

    def __str__(self):
        return 'Subject: ' + str(self.subject_id)


class Duration(models.Model):
    subject = models.ForeignKey(Subject)
    has_verified = models.NullBooleanField('Verification performed', editable=False)
    verification_number = models.BigIntegerField('Number of verifications', editable=False)
    overall_duration = models.BigIntegerField('Overall (Millisec)', editable=False)
    voting_duration = models.BigIntegerField('Voting (Millisec)', editable=False)
    verification_duration = models.BigIntegerField('Verification (Millisec)', editable=False)

    def __str__(self):
            return 'Subject: ' + str(self.subject_id)


class Option(models.Model):
    option_code = models.CharField('Option_code', max_length=4, unique=True, primary_key=True)
    option = models.CharField('Option', max_length=50)

    def __str__(self):
        return 'Option: ' + str(self.option)


class Question(models.Model):
    question = models.CharField('Question', max_length=2000)
    option = models.ManyToManyField(Option)

    def __str__(self):
        return 'Question: ' + str(self.question)
