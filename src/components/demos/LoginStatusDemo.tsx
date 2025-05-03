import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoginStatusDemo = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <AnimatePresence mode="wait">
          {isLoggedIn ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                Welcome, {username}!
              </h2>
              <p className="text-gray-600 mb-6">
                You are now logged in successfully.
              </p>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="login-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleLogin}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
                Please Login
              </h2>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Login
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      <div className="glass-card p-4">
        <p className="text-sm text-gray-600">
          This demo shows conditional rendering based on login state,
          with form handling and animated transitions between states.
        </p>
      </div>
    </div>
  );
};

export default LoginStatusDemo; 