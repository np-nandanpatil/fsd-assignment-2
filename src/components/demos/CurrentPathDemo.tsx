import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const CurrentPathDemo = () => {
  const location = useLocation();

  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold mb-4">Current Path Information</h2>
          
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-semibold">Full Path:</span> {location.pathname}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Search:</span> {location.search || '(none)'}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Hash:</span> {location.hash || '(none)'}
            </p>
          </div>

          {pathSegments.length > 0 && (
            <div className="mt-6">
              <p className="font-semibold mb-2">Path Segments:</p>
              <div className="flex flex-wrap gap-2">
                {pathSegments.map((segment, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full"
                  >
                    {segment}
                  </motion.span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <div className="glass-card p-4">
        <p className="text-sm text-gray-600">
          This demo shows how to use useLocation hook from react-router-dom to
          access and display current route information.
        </p>
      </div>
    </div>
  );
};

export default CurrentPathDemo; 