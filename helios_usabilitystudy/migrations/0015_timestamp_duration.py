# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2018-08-16 09:19
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('helios_usabilitystudy', '0014_auto_20180816_0849'),
    ]

    operations = [
        migrations.AddField(
            model_name='timestamp',
            name='duration',
            field=models.CharField(default='0', max_length=100, verbose_name='Duration'),
        ),
    ]
