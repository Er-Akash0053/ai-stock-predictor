import { useEffect, useState } from "react";
import axios from "axios";

import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";

function App() {

  const [symbol, setSymbol] = useState("GC=F");
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
        `http://127.0.0.1:5000/predict/${symbol}`
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

  return (

    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-4xl font-bold mb-8">
        AI Trading Dashboard
      </h1>

      <select
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        className="bg-gray-800 p-3 rounded mb-6"
      >

        <option value="GC=F">Gold</option>
        <option value="SI=F">Silver</option>
        <option value="BTC-USD">Bitcoin</option>
        <option value="ETH-USD">Ethereum</option>

      </select>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-gray-900 p-4 rounded-xl">

          <AdvancedRealTimeChart
            theme="dark"
            symbol={chartSymbols[symbol]}
            width="100%"
            height="500"
            interval="15"
          />

        </div>

        {data && (

          <div className="bg-gray-900 p-8 rounded-xl">

            <h2 className="text-3xl font-bold mb-6">
              {data.symbol}
            </h2>

            <div className="space-y-4 text-lg">

              <p>
                Current Price:
                <span className="ml-2 text-yellow-400">
                  {data.price}
                </span>
              </p>

              <p>
                Prediction:
                <span className="ml-2 text-green-400 font-bold">
                  {data.prediction}
                </span>
              </p>

              <p>
                Market Strength:
                <span className="ml-2 text-blue-400">
                  {data.strength}
                </span>
              </p>

              <p>
                RSI:
                <span className="ml-2">
                  {data.rsi}
                </span>
              </p>

              <p>
                EMA:
                <span className="ml-2">
                  {data.ema}
                </span>
              </p>

              <p>
                MACD:
                <span className="ml-2">
                  {data.macd}
                </span>
              </p>

              <p>
                Target:
                <span className="ml-2 text-green-500 font-bold">
                  {data.target}
                </span>
              </p>

              <p>
                Stop Loss:
                <span className="ml-2 text-red-500 font-bold">
                  {data.stop_loss}
                </span>
              </p>

              <p>
                Confidence:
                <span className="ml-2">
                  {data.confidence}%
                </span>
              </p>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default App;