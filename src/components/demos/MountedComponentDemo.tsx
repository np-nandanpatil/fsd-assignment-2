import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MountedComponentDemo = () => {
  const [mountTime, setMountTime] = useState<string>('');

  useEffect(() => {
    const time = new Date().toLocaleTimeString();
    setMountTime(time);
    console.log('Component Mounted at:', time);

    return () => {
      console.log('Component Unmounted at:', new Date().toLocaleTimeString());
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Component Mount Demo</h2>
          <p className="text-gray-600 mb-4">
            This component was mounted at: {mountTime}
          </p>
          <p className="text-gray-500">
            Check the console to see mount/unmount messages
          </p>
        </motion.div>
      </div>

      <div className="glass-card p-4">
        <p className="text-sm text-gray-600">
          This demo shows how useEffect runs when a component mounts and
          how cleanup functions work when it unmounts.
        </p>
      </div>
    </div>
  );
};

export default MountedComponentDemo; 