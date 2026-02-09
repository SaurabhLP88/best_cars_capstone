import requests
import os
from dotenv import load_dotenv

load_dotenv()

BACKEND_URL = os.getenv("BACKEND_URL")

SENTIMENT_ANALYZER_URL = os.getenv(
    "SENTIMENT_ANALYZER_URL"
)

def get_request(endpoint):
    url = f"{BACKEND_URL}{endpoint}"
    print("🔍 Django calling:", url)

    try:
        response = requests.get(url, timeout=5)
        print("🔍 Status code:", response.status_code)
        print("🔍 Raw text:", response.text[:200])
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print("❌ GET request failed:", e)
        return None


def post_request(endpoint, data):
    url = f"{BACKEND_URL}{endpoint}"
    try:
        response = requests.post(url, json=data, timeout=5)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print("POST request failed:", e)
        return None


def analyze_review_sentiments(text):
    if not SENTIMENT_ANALYZER_URL:
        return {"sentiment": "Unknown"}

    try:
        response = requests.get(
            f"{SENTIMENT_ANALYZER_URL}analyze/{text}",
            timeout=5
        )
        return response.json()
    except Exception:
        return {"sentiment": "Unknown"}

