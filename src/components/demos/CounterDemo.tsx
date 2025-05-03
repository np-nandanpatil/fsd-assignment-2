import { useState } from 'react';
import { motion } from 'framer-motion';

const CounterDemo = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(0);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center gap-4 p-6 rounded-lg bg-white shadow-sm"
    >
      <motion.div
        key={count}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="text-4xl font-bold text-gray-800"
      >
        {count}
      </motion.div>
      <div className="flex gap-3">
        <button
          onClick={decrement}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Decrease
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
        <button
          onClick={increment}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Increase
        </button>
      </div>
    </motion.div>
  );
};

export default CounterDemo; 