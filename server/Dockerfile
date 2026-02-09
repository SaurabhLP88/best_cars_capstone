FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONPATH=/app

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN python -c "import os; print(os.listdir('/app'))"

CMD ["sh", "-c", "gunicorn djangoproj.wsgi:application --bind 0.0.0.0:$PORT"]
