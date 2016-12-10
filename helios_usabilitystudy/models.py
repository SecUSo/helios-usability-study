from django.db import models


class Subjects(models.Model):
    subject_id = models.CharField('Subject ID', max_length=30, unique=True, editable=False)
    subject_token = models.CharField('Subject_Token', max_length=30, unique=False, editable=False)


class TimeSpent (models.Model):
    has_verified = models.BooleanField('Verification performed', editable=False)
    verification_number = models.BigIntegerField('Number of verifications', editable=False)
    overall_duration = models.BigIntegerField('Overall (Millisec)', editable=False)
    voting_duration = models.BigIntegerField('Voting (Millisec)', editable=False)
    verification_duration = models.BigIntegerField('Verification (Millisec)', editable=False)


class Choices(models.Model):
    question = models.CharField(max_length=2000)
    option1 = models.CharField(max_length=2000)
    option2 = models.CharField(max_length=2000)
    option3 = models.CharField(max_length=2000)

