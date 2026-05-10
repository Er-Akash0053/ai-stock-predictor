import { useEffect, useState } from "react";
import axios from "axios";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";

function App() {

  const [symbol, setSymbol] = useState("GC=F");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // YOUR LIVE RENDER BACKEND
  const API_URL =
    "https://ai-stock-predictor-yhdz.onrender.com";

  const chartSymbols = {
    "GC=F": "COMEX:GC1!",
    "SI=F": "COMEX:SI1!",
    "BTC-USD": "BINANCE:BTCUSDT",
    "ETH-USD": "BINANCE:ETHUSDT"
  };

  const fetchPrediction = async () => {

    try {

      setLoading(true);

      const response = await axios.get(
        `${API_URL}/predict/${symbol}`
      );

      setData(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

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

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">

          <div>

            <h1 className="text-5xl font-bold text-yellow-400">
              AI Trading Dashboard
            </h1>

            <p className="text-gray-400 mt-2">
              Live Market Analysis with AI Predictions
            </p>

          </div>

          <select
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="bg-gray-900 border border-gray-700 p-3 rounded-xl mt-5 lg:mt-0"
          >

            <option value="GC=F">Gold</option>
            <option value="SI=F">Silver</option>
            <option value="BTC-USD">Bitcoin</option>
            <option value="ETH-USD">Ethereum</option>

          </select>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* CHART */}

          <div className="bg-gray-900 p-4 rounded-2xl shadow-2xl">

            <AdvancedRealTimeChart
              theme="dark"
              symbol={chartSymbols[symbol]}
              width="100%"
              height="550"
              interval="15"
            />

          </div>

          {/* ANALYSIS PANEL */}

          <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl">

            {loading ? (

              <div className="flex items-center justify-center h-full">

                <p className="text-2xl text-yellow-400">
                  Loading AI Analysis...
                </p>

              </div>

            ) : data ? (

              <>

                <div className="mb-8">

                  <h2 className="text-4xl font-bold text-white">
                    {data.symbol}
                  </h2>

                  <p className="text-gray-400 mt-2">
                    Live AI Market Insights
                  </p>

                </div>

                <div className="space-y-5 text-lg">

                  <div className="bg-black p-4 rounded-xl">

                    <p className="text-gray-400">
                      Current Price
                    </p>

                    <h3 className="text-3xl text-yellow-400 font-bold">
                      {data.price}
                    </h3>

                  </div>

                  <div className="grid grid-cols-2 gap-4">

                    <div className="bg-black p-4 rounded-xl">

                      <p className="text-gray-400">
                        Prediction
                      </p>

                      <h3 className={`text-2xl font-bold ${
                        data.prediction === "Bullish"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}>

                        {data.prediction}

                      </h3>

                    </div>

                    <div className="bg-black p-4 rounded-xl">

                      <p className="text-gray-400">
                        Confidence
                      </p>

                      <h3 className="text-2xl text-blue-400 font-bold">
                        {data.confidence}%
                      </h3>

                    </div>

                  </div>

                  <div className="grid grid-cols-2 gap-4">

                    <div className="bg-black p-4 rounded-xl">

                      <p className="text-gray-400">
                        RSI
                      </p>

                      <h3 className="text-xl">
                        {data.rsi}
                      </h3>

                    </div>

                    <div className="bg-black p-4 rounded-xl">

                      <p className="text-gray-400">
                        EMA
                      </p>

                      <h3 className="text-xl">
                        {data.ema}
                      </h3>

                    </div>

                  </div>

                  <div className="bg-black p-4 rounded-xl">

                    <p className="text-gray-400">
                      MACD
                    </p>

                    <h3 className="text-xl">
                      {data.macd}
                    </h3>

                  </div>

                  <div className="grid grid-cols-2 gap-4">

                    <div className="bg-green-950 p-5 rounded-xl border border-green-700">

                      <p className="text-green-300">
                        Target
                      </p>

                      <h3 className="text-3xl font-bold text-green-400">
                        {data.target}
                      </h3>

                    </div>

                    <div className="bg-red-950 p-5 rounded-xl border border-red-700">

                      <p className="text-red-300">
                        Stop Loss
                      </p>

                      <h3 className="text-3xl font-bold text-red-400">
                        {data.stop_loss}
                      </h3>

                    </div>

                  </div>

                  <div className="bg-black p-4 rounded-xl">

                    <p className="text-gray-400">
                      Market Strength
                    </p>

                    <h3 className="text-xl text-cyan-400">
                      {data.strength}
                    </h3>

                  </div>

                </div>

              </>

            ) : (

              <div className="flex items-center justify-center h-full">

                <p className="text-red-400 text-xl">
                  Failed to load market data
                </p>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;
