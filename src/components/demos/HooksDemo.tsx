import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HooksDemo = () => {
  const [count, setCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.title = `Count: ${count}`;
    return () => {
      document.title = 'React App';
    };
  }, [count]);

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.p
            key={count}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="text-3xl font-bold mb-4"
          >
            Count: {count}
          </motion.p>
          <p className="text-gray-600 mb-4">
            Time Elapsed: {timeElapsed} seconds
          </p>
          <button
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Increment
          </button>
        </motion.div>
      </div>

      <div className="glass-card p-4">
        <p className="text-sm text-gray-600">
          This demo shows useState for managing count and time, and useEffect for:
          <br />
          1. Setting up an interval timer (runs once)
          <br />
          2. Updating document title when count changes
        </p>
      </div>
    </div>
  );
};

export default HooksDemo; 