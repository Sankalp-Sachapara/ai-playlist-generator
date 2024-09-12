import os
import warnings
from transformers import pipeline

# Suppress specific warnings
warnings.filterwarnings("ignore", message=r"`clean_up_tokenization_spaces` was not set", category=FutureWarning)
os.environ['HF_HUB_DISABLE_SYMLINKS_WARNING'] = '1'

# Load the sentiment-analysis pipeline
print("Loading sentiment analysis pipeline...")
sentiment_pipeline = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")

def analyze_sentiment(text):
    print(f"Analyzing sentiment for text: {text}")
    result = sentiment_pipeline(text)[0]  # Removed the clean_up_tokenization_spaces argument
    print(f"Sentiment analysis result: {result}")
    return result['label']

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        text = sys.argv[1]
        sentiment = analyze_sentiment(text)
        print(sentiment)
    else:
        print("Error: No text provided for sentiment analysis.")
