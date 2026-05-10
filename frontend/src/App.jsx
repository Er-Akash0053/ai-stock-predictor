import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [symbol, setSymbol] = useState("BTC-USD");
  const [data, setData] = useState(null);

  const chartSymbols = {
    "GC=F": "COMEX:GC1!",
    "SI=F": "COMEX:SI1!",
    "BTC-USD": "BINANCE:BTCUSDT",
    "ETH-USD": "BINANCE:ETHUSDT"
  };

  const fetchPrediction = async () => {

    try {

      const response = await axios.get(
        `https://ai-stock-predictor-yhdz.onrender.com/predict/${symbol}`
      );

      setData(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    fetchPrediction();

    const interval = setInterval(() => {
      fetchPrediction();
    }, 10000);

    return () => clearInterval(interval);

  }, [symbol]);

  useEffect(() => {

    const script = document.createElement("script");

    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";

    script.type = "text/javascript";
    script.async = true;

    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: chartSymbols[symbol],
      interval: "15",
      timezone: "Asia/Kolkata",
      theme: "dark",
      style: "1",
      locale: "en",
      enable_publishing: false,
      allow_symbol_change: true,
      container_id: "tradingview_chart"
    });

    const container = document.getElementById("tradingview_chart");

    if (container) {
      container.innerHTML = "";
      container.appendChild(script);
    }

  }, [symbol]);

  return (

    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-4xl font-bold mb-8 text-center">
        AI Trading Dashboard
      </h1>

      <div className="flex justify-center mb-8">

        <select
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="bg-gray-800 p-3 rounded text-white"
        >

          <option value="BTC-USD">Bitcoin</option>
          <option value="ETH-USD">Ethereum</option>
          <option value="GC=F">Gold</option>
          <option value="SI=F">Silver</option>

        </select>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-gray-900 rounded-xl overflow-hidden">

          <div
            id="tradingview_chart"
            style={{ height: "600px", width: "100%" }}
          ></div>

        </div>

        {data && (

          <div className="bg-gray-900 p-6 rounded-xl">

            <div className="mb-6">

              <h2 className="text-2xl font-bold mb-2">
                {data.symbol}
              </h2>

              <p className="text-gray-400">
                Live AI Market Analysis
              </p>

            </div>

            <div className="space-y-5">

              <div className="bg-black p-4 rounded-xl">
                <p className="text-gray-400">Current Price</p>
                <p className="text-yellow-400 text-4xl font-bold">
                  {data.price}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div className="bg-black p-4 rounded-xl">
                  <p className="text-gray-400">Prediction</p>
                  <p className={`text-3xl font-bold ${
                    data.prediction === "Bullish"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}>
                    {data.prediction}
                  </p>
                </div>

                <div className="bg-black p-4 rounded-xl">
                  <p className="text-gray-400">Confidence</p>
                  <p className="text-blue-400 text-3xl font-bold">
                    {data.confidence}%
                  </p>
                </div>

              </div>

              <div className="grid grid-cols-2 gap-4">

                <div className="bg-black p-4 rounded-xl">
                  <p className="text-gray-400">RSI</p>
                  <p className="text-2xl">{data.rsi}</p>
                </div>

                <div className="bg-black p-4 rounded-xl">
                  <p className="text-gray-400">EMA</p>
                  <p className="text-2xl">{data.ema}</p>
                </div>

              </div>

              <div className="bg-black p-4 rounded-xl">
                <p className="text-gray-400">MACD</p>
                <p className="text-2xl">{data.macd}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div className="bg-green-900 p-4 rounded-xl border border-green-500">
                  <p className="text-green-300">Target</p>
                  <p className="text-4xl font-bold text-green-400">
                    {data.target}
                  </p>
                </div>

                <div className="bg-red-900 p-4 rounded-xl border border-red-500">
                  <p className="text-red-300">Stop Loss</p>
                  <p className="text-4xl font-bold text-red-400">
                    {data.stop_loss}
                  </p>
                </div>

              </div>

              <div className="bg-black p-4 rounded-xl">
                <p className="text-gray-400">Market Strength</p>
                <p className="text-cyan-400 text-2xl font-bold">
                  {data.strength}
                </p>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default App;