import { useState } from 'react';
import { motion } from 'framer-motion';

const TemperatureConverter = () => {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');

  const handleCelsiusChange = (value: string) => {
    setCelsius(value);
    if (value === '') {
      setFahrenheit('');
      return;
    }
    const f = (parseFloat(value) * 9) / 5 + 32;
    setFahrenheit(f.toFixed(2));
  };

  const handleFahrenheitChange = (value: string) => {
    setFahrenheit(value);
    if (value === '') {
      setCelsius('');
      return;
    }
    const c = ((parseFloat(value) - 32) * 5) / 9;
    setCelsius(c.toFixed(2));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-primary-600 mb-4">
          Temperature Converter
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="celsius" className="block text-sm font-medium text-gray-700 mb-1">
              Celsius
            </label>
            <input
              type="number"
              id="celsius"
              value={celsius}
              onChange={(e) => handleCelsiusChange(e.target.value)}
              placeholder="Enter temperature in Celsius"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label htmlFor="fahrenheit" className="block text-sm font-medium text-gray-700 mb-1">
              Fahrenheit
            </label>
            <input
              type="number"
              id="fahrenheit"
              value={fahrenheit}
              onChange={(e) => handleFahrenheitChange(e.target.value)}
              placeholder="Enter temperature in Fahrenheit"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      <div className="glass-card p-4">
        <p className="text-sm text-gray-600">
          Formula: °F = (°C × 9/5) + 32
        </p>
      </div>
    </motion.div>
  );
};

export default TemperatureConverter; 