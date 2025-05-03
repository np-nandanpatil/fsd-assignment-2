import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ConditionalRenderingDemo = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [userType, setUserType] = useState<'admin' | 'user' | 'guest'>('guest');

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="space-y-6">
          {/* If/Else using Ternary */}
          <div className="text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={isLoggedIn ? 'logged-in' : 'logged-out'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-4"
              >
                {isLoggedIn ? (
                  <h2 className="text-2xl font-bold text-green-600">Welcome back!</h2>
                ) : (
                  <h2 className="text-2xl font-bold text-gray-600">Please log in.</h2>
                )}
              </motion.div>
            </AnimatePresence>
            <button
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>
          </div>

          {/* Logical && operator */}
          <div className="text-center">
            <button
              onClick={() => setShowContent(!showContent)}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors mb-4"
            >
              Toggle Content
            </button>
            <AnimatePresence>
              {showContent && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-600">
                    This content can be toggled using the logical && operator.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Switch/Case using Object */}
          <div className="text-center">
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value as 'admin' | 'user' | 'guest')}
              className="mb-4 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
            >
              <option value="guest">Guest</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <AnimatePresence mode="wait">
              <motion.div
                key={userType}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {{
                  admin: <p className="text-green-600">Welcome, Administrator!</p>,
                  user: <p className="text-blue-600">Welcome, User!</p>,
                  guest: <p className="text-gray-600">Welcome, Guest!</p>,
                }[userType]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="glass-card p-4">
        <p className="text-sm text-gray-600">
          This demo shows three methods of conditional rendering:
          <br />
          1. If/Else using ternary operator
          <br />
          2. Logical && operator for showing/hiding content
          <br />
          3. Switch/Case using object literals
        </p>
      </div>
    </div>
  );
};

export default ConditionalRenderingDemo; 