from flask import Flask, jsonify
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk

# Download NLTK resources
nltk.download('vader_lexicon')

app = Flask(__name__)
sia = SentimentIntensityAnalyzer()

def senti_analyzer(text):
    score = sia.polarity_scores(text)
    compound = score['compound']
    if compound >= 0.05:
        sentiment = 'positive'
    elif compound <= -0.05:
        sentiment = 'negative'
    else:
        sentiment = 'neutral'
    return {"sentiment": sentiment, "score": compound}

# Flask route
@app.route('/analyze/<text>', methods=['GET'])
def analyze(text):
    result = senti_analyzer(text)
    return jsonify({"text": text, "sentiment": result['sentiment'], "score": result['score']})

if __name__ == "__main__":
    # Make Flask accessible from outside the container
    app.run(host="0.0.0.0", port=5000)
