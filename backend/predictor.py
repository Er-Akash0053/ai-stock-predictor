import yfinance as yf
import pandas as pd

from ta.trend import EMAIndicator, MACD
from ta.momentum import RSIIndicator


def predict_market(symbol):

    data = yf.download(
        tickers=symbol,
        period="1mo",
        interval="15m",
        auto_adjust=True
    )

    if data.empty:
        return {
            "error": "No market data found"
        }

    close_prices = data["Close"].to_numpy().flatten()

    close_series = pd.Series(close_prices)

    ema = EMAIndicator(
        close=close_series,
        window=9
    ).ema_indicator()

    rsi = RSIIndicator(
        close=close_series,
        window=14
    ).rsi()

    macd = MACD(close_series)

    latest_price = float(close_series.iloc[-1])
    latest_rsi = float(rsi.iloc[-1])
    latest_ema = float(ema.iloc[-1])
    latest_macd = float(macd.macd().iloc[-1])

    prediction = "Bullish"
    strength = "Weak"

    if latest_rsi > 70:
        prediction = "Bearish"

    if latest_rsi > 60 and latest_macd > 0:
        strength = "Strong Bullish"

    if latest_rsi < 40 and latest_macd < 0:
        strength = "Strong Bearish"

    target = round(latest_price * 1.01, 2)
    stop_loss = round(latest_price * 0.995, 2)

    confidence = round(
        abs(50 - latest_rsi) + 50,
        2
    )

    return {
        "symbol": symbol,
        "price": round(latest_price, 2),
        "prediction": prediction,
        "strength": strength,
        "confidence": confidence,
        "rsi": round(latest_rsi, 2),
        "ema": round(latest_ema, 2),
        "macd": round(latest_macd, 2),
        "target": target,
        "stop_loss": stop_loss
    }