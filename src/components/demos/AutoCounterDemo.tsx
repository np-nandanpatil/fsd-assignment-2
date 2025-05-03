import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AutoCounterDemo = () => {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isRunning && count < 10) {
      timer = setTimeout(() => {
        setCount(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [count, isRunning]);

  const resetCounter = () => {
    setCount(0);
    setIsRunning(true);
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="text-center space-y-6">
          <motion.div
            key={count}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <div className="text-6xl font-bold text-blue-600">
              {count}
            </div>
            {count === 10 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full"
              >
                Done!
              </motion.div>
            )}
          </motion.div>

          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-500"
              initial={{ width: '0%' }}
              animate={{ width: `${(count / 10) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="space-x-4">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isRunning
                  ? 'bg-yellow-500 hover:bg-yellow-600'
                  : 'bg-green-500 hover:bg-green-600'
              } text-white`}
              disabled={count === 10}
            >
              {isRunning ? 'Pause' : 'Resume'}
            </button>
            <button
              onClick={resetCounter}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="glass-card p-4">
        <p className="text-sm text-gray-600">
          This demo shows an auto-incrementing counter that stops at 10,
          with pause/resume functionality and progress indication.
        </p>
      </div>
    </div>
  );
};

export default AutoCounterDemo; 