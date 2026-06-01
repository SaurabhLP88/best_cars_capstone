#!/bin/sh

echo "Making migrations and migrating the database..."

python manage.py makemigrations --noinput
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Creating superuser if not exists..."

python manage.py shell << EOF
from django.contrib.auth.models import User

username = "admin"
email = "admin@example.com"
password = "admin123"

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username, email, password)
    print("✅ Superuser created")
else:
    print("✅ Superuser already exists")
EOF

echo "Starting Gunicorn..."

exec "$@"