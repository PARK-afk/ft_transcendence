#!/bin/bash

if [ ! -f /app/app/manage.py ]; then
  echo "Creating Django project..."

  while ! nc -z db 5432; do #5432
    echo "Waiting for the PostgreSQL database to be ready..."
    sleep 0.5
  done

  echo "PostgreSQL started"
fi


python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py createsuperuser \
        --noinput --username suhyun \
        --display_name suhyun_dp
#--username --display-name
exec "$@"
