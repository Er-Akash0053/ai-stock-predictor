from flask import Flask
from flask_cors import CORS
from predictor import predict_market

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
    app.run(debug=True)