import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Joke {
  id: string;
  joke: string;
  status: number;
}

const JokeFetcherDemo = () => {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJoke = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://icanhazdadjoke.com/', {
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch joke');
      }
      
      const data = await response.json();
      setJoke(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="space-y-6">
          <div className="flex justify-center">
            <button
              onClick={fetchJoke}
              disabled={loading}
              className={`px-6 py-3 rounded-lg transition-colors ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white font-medium`}
            >
              {loading ? 'Fetching...' : 'Get Random Joke'}
            </button>
          </div>

          <AnimatePresence mode="wait">
            {error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center text-red-500"
              >
                {error}
              </motion.div>
            ) : joke ? (
              <motion.div
                key={joke.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <div className="relative p-6 bg-white rounded-lg shadow-sm">
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl">
                    "
                  </div>
                  <p className="text-lg text-gray-700">{joke.joke}</p>
                  <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl">
                    "
                  </div>
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 text-sm text-gray-500"
                >
                  Joke ID: {joke.id}
                </motion.p>
              </motion.div>
            ) : (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-gray-500"
              >
                Click the button to fetch a random joke!
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="glass-card p-4">
        <p className="text-sm text-gray-600">
          This demo shows how to fetch data from an API with loading states,
          error handling, and animated transitions between states.
        </p>
      </div>
    </div>
  );
};

export default JokeFetcherDemo; 