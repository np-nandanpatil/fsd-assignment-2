import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ToggleVisibilityDemo = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [animation, setAnimation] = useState<'fade' | 'slide' | 'scale'>('fade');

  const animations = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    slide: {
      initial: { x: -100, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: 100, opacity: 0 }
    },
    scale: {
      initial: { scale: 0, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0, opacity: 0 }
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setIsVisible(!isVisible)}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {isVisible ? 'Hide' : 'Show'} Content
            </button>
            <select
              value={animation}
              onChange={(e) => setAnimation(e.target.value as typeof animation)}
              className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
            >
              <option value="fade">Fade Animation</option>
              <option value="slide">Slide Animation</option>
              <option value="scale">Scale Animation</option>
            </select>
          </div>

          <AnimatePresence mode="wait">
            {isVisible && (
              <motion.div
                {...animations[animation]}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-bold text-center">
                  Welcome to our Website!
                </h2>
                <p className="text-gray-600 text-center">
                  This is a sample paragraph that can be toggled on and off.
                  We're using Framer Motion to add smooth animations to the
                  visibility transitions.
                </p>
                <div className="flex justify-center">
                  <img
                    src="https://via.placeholder.com/400x200"
                    alt="Sample"
                    className="rounded-lg shadow-md"
                  />
                </div>
                <p className="text-gray-600 text-center">
                  Try different animation styles using the dropdown above!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="glass-card p-4">
        <p className="text-sm text-gray-600">
          This demo shows how to toggle content visibility with different
          animation styles using Framer Motion's AnimatePresence.
        </p>
      </div>
    </div>
  );
};

export default ToggleVisibilityDemo; 