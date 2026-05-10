from flask import Flask
from flask_cors import CORS
from predictor import predict_market
import os

app = Flask(__name__)

CORS(app)

@app.route("/")
def home():
    return {
        "message": "AI Stock Predictor Running"
    }

@app.route("/predict/<symbol>")
def predict(symbol):
    return predict_market(symbol)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))

    app.run(
        host="0.0.0.0",
        port=port
    )