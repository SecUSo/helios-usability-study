#!/bin/bash
python3.5 manage.py flush
python3.5 manage.py sqlflush
python3.5 manage.py makemigrations
python3.5 manage.py migrate
python3.5 manage.py migrate --run-syncdb
python3.5 manage.py sample_data
echo "Set superuser password:"
python3.5 manage.py createsuperuser --username admin --email ""
