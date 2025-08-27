import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import "./App.css";

export default function HopfieldDemo() {
  const inputPattern = "/noisy.png";
  const outputPattern = "/recalled.png";

  const [slider, setSlider] = useState(0);
  const [energyData, setEnergyData] = useState([]);

  // Energy updates dynamically
  useEffect(() => {
    setEnergyData((prev) => [
      ...prev,
      { step: prev.length, energy: Math.max(0, 100 - slider) },
    ]);
  }, [slider]);

  const totalNeurons = 100;
  const neuronsToShow = Math.floor((slider / 100) * totalNeurons);
  const blendOpacity = slider / 100;

  // Orbit parameters
  const orbitRadius = 20;
  const maxRotations = 5;
  const orbitAngle =
    slider < 100
      ? (slider / 100) * 2 * Math.PI * maxRotations
      : 2 * Math.PI * maxRotations; // stops at convergence
  const orbitNeuronIndex = Math.floor((orbitAngle / (2 * Math.PI * maxRotations)) * totalNeurons);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100 p-6">
      <div className="flex flex-col items-center w-full">
        <h1 className="text-3xl font-bold mb-6">Hopfield Network Demo</h1>

        {/* Labels */}
        <div className="flex justify-between w-full max-w-4xl px-4 text-gray-700 font-semibold mb-2">
          <span>Input (Noisy)</span>
          <span>Hopfield Machine</span>
          <span>Output (Recalled)</span>
        </div>

        {/* Pipeline */}
        <div className="relative flex items-center justify-between w-full max-w-4xl h-64 px-4 mb-8">
          {/* Input */}
          <img
            src={inputPattern}
            className="absolute w-28 h-28 rounded shadow-lg"
            style={{ opacity: slider < 5 ? 1 : 0 }}
            alt="Noisy input"
          />

          {/* Animated pipeline */}
          <div className="absolute top-1/2 left-1/6 w-2/3 h-2 bg-gray-300 rounded">
            <motion.div
              className="h-2 bg-green-500 rounded"
              style={{ width: `${slider}%` }}
            />
          </div>

          {/* Rotating circle along pipeline */}
          <motion.div
            className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"
            style={{
              position: "absolute",
              left: `${slider * 0.66}%`,
              top: "50%",
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{ rotate: slider * 10 }}
            transition={{ duration: 0.05 }}
          />

          {/* Sun-earth orbit */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-12 w-12 flex items-center justify-center">
            <div className="w-6 h-6 bg-yellow-400 rounded-full" /> {/* Sun */}
            <motion.div
              className="w-3 h-3 bg-blue-500 rounded-full absolute"
              style={{
                left: `${orbitRadius * Math.cos(orbitAngle)}px`,
                top: `${orbitRadius * Math.sin(orbitAngle)}px`,
              }}
            />
          </div>

          {/* Hopfield Machine */}
          <div className="w-32 h-32 bg-gray-200 rounded shadow-xl flex items-center justify-center relative overflow-hidden">
            {/* Blend input pattern partially */}
            <img
              src={inputPattern}
              className="absolute w-32 h-32 rounded"
              style={{ opacity: 0.3 }}
            />

            {/* Neuron-by-neuron update following orbit */}
            {Array.from({ length: totalNeurons }).map((_, idx) => {
              const blockOpacity = idx <= orbitNeuronIndex ? 1 : 0;
              return (
                <div
                  key={idx}
                  className="absolute w-3 h-3 rounded"
                  style={{
                    top: `${(idx % 10) * 10}%`,
                    left: `${Math.floor(idx / 10) * 10}%`,
                    backgroundImage: `url(${inputPattern})`,
                    backgroundSize: "320% 320%",
                    backgroundPosition: `${(idx % 10) * 10}% ${Math.floor(idx / 10) * 10}%`,
                    opacity: blockOpacity,
                  }}
                />
              );
            })}
          </div>

          {/* Output gradually appears */}
          <img
            src={outputPattern}
            className="w-28 h-28 rounded shadow-lg"
            style={{ opacity: blendOpacity }}
            alt="Recalled output"
          />
        </div>

        {/* Slider */}
        <div className="w-full max-w-2xl mb-8">
          <input
            type="range"
            min="0"
            max="100"
            value={slider}
            onChange={(e) => setSlider(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Energy Graph */}
        <div className="mt-6 w-full max-w-2xl">
          <LineChart width={500} height={200} data={energyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="step"
              label={{ value: "Iteration Step", position: "insideBottom", offset: -5 }}
            />
            <YAxis
              label={{ value: "Energy", angle: -90, position: "insideLeft", offset: 10 }}
            />
            <Tooltip />
            <Line type="monotone" dataKey="energy" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
          <p className="text-center text-gray-600 mt-2 text-sm">
            Energy decreases as the Hopfield network converges neuron-by-neuron.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center text-xs text-gray-500 py-4 border-t bg-gray-100 mt-6">
        <a
          href="https://github.com/atnatewoss"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Visit my GitHub: atnatewoss
        </a>
      </footer>
    </div>
  );
}