import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DateTimeDemo = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [timeFormat, setTimeFormat] = useState<'12' | '24'>('24');
  const [showSeconds, setShowSeconds] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: '2-digit',
      ...(showSeconds && { second: '2-digit' }),
      hour12: timeFormat === '12'
    };
    return date.toLocaleTimeString(undefined, options);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="space-y-8">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setTimeFormat(timeFormat === '12' ? '24' : '12')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {timeFormat === '12' ? '24-hour' : '12-hour'} Format
            </button>
            <button
              onClick={() => setShowSeconds(!showSeconds)}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              {showSeconds ? 'Hide' : 'Show'} Seconds
            </button>
          </div>

          <div className="text-center">
            <motion.div
              key={dateTime.toISOString()}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <motion.div
                className="text-6xl font-bold text-blue-600 font-mono"
                layoutId="time"
              >
                {formatTime(dateTime)}
              </motion.div>
              
              <motion.div
                className="text-2xl text-gray-600"
                layoutId="date"
              >
                {formatDate(dateTime)}
              </motion.div>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
            <div className="glass-card p-3">
              <p className="text-gray-500">Timezone</p>
              <p className="font-mono">{dateTime.toLocaleTimeString('en-US', { timeZoneName: 'short' }).split(' ')[2]}</p>
            </div>
            <div className="glass-card p-3">
              <p className="text-gray-500">Unix Timestamp</p>
              <p className="font-mono">{Math.floor(dateTime.getTime() / 1000)}</p>
            </div>
            <div className="glass-card p-3">
              <p className="text-gray-500">Week Number</p>
              <p className="font-mono">{Math.ceil((((dateTime.getTime() - new Date(dateTime.getFullYear(), 0, 1).getTime()) / 86400000) + 1) / 7)}</p>
            </div>
            <div className="glass-card p-3">
              <p className="text-gray-500">Day of Year</p>
              <p className="font-mono">{Math.floor((dateTime.getTime() - new Date(dateTime.getFullYear(), 0, 1).getTime()) / 86400000) + 1}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-4">
        <p className="text-sm text-gray-600">
          This demo shows how to create a live clock with different time formats,
          date information, and additional time-related calculations.
        </p>
      </div>
    </div>
  );
};

export default DateTimeDemo; 