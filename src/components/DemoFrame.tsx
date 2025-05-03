import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface DemoFrameProps {
  children: ReactNode;
  title?: string;
}

const DemoFrame = ({ children, title }: DemoFrameProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border border-gray-200 rounded-lg overflow-hidden"
    >
      {title && (
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        </div>
      )}
      <div className="p-4 bg-white">{children}</div>
    </motion.div>
  );
};

export default DemoFrame; 