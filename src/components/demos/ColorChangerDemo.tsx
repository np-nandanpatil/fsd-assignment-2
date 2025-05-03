import { useState } from 'react';
import { motion } from 'framer-motion';

const ColorChangerDemo = () => {
  const [color, setColor] = useState('#ffffff');

  const colors = [
    '#ff6b6b',  // Red
    '#4ecdc4',  // Teal
    '#45b7d1',  // Blue
    '#96ceb4',  // Green
    '#ffeead',  // Yellow
    '#d4a5a5',  // Pink
    '#9a9eab',  // Gray
    '#ff9a9e',  // Coral
  ];

  const changeColor = () => {
    const currentIndex = colors.indexOf(color);
    const nextIndex = (currentIndex + 1) % colors.length;
    setColor(colors[nextIndex]);
  };

  return (
    <div className="space-y-6">
      <motion.div
        className="glass-card overflow-hidden"
        animate={{ backgroundColor: color }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6 space-y-4">
          <motion.div
            className="w-full h-32 rounded-lg"
            style={{ backgroundColor: color }}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="text-center">
            <p className="mb-4 font-mono">Current Color: {color}</p>
            <button
              onClick={changeColor}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Change Color
            </button>
          </div>
        </div>
      </motion.div>

      <div className="glass-card p-4">
        <p className="text-sm text-gray-600">
          This demo shows how to use useState to manage the current color and
          animate color transitions using Framer Motion.
        </p>
      </div>
    </div>
  );
};

export default ColorChangerDemo; 