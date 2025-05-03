import { useState } from 'react';
import { motion } from 'framer-motion';

interface GreetingProps {
  name: string;
}

function Greeting({ name }: GreetingProps) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-2xl font-bold mb-4"
    >
      Hello, {name}!
    </motion.h1>
  );
}

const PropsStateDemo = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <Greeting name={name || 'Guest'} />
        <div className="mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
          />
        </div>
        <div className="text-center">
          <motion.p
            key={count}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="text-3xl font-bold mb-4"
          >
            Count: {count}
          </motion.p>
          <button
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Increment
          </button>
        </div>
      </div>

      <div className="glass-card p-4">
        <p className="text-sm text-gray-600">
          This demo shows how Props are used to pass data to child components (Greeting)
          and how State manages component data (count and name).
        </p>
      </div>
    </div>
  );
};

export default PropsStateDemo; 