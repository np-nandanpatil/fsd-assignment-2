import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/fsd-assignment-2/';

  useEffect(() => {
    document.title = 'FSD Assignment 2';
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {!isHomePage && (
        <nav className="fixed top-0 w-full nav-glass">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="flex items-center h-full">
              <Link to="/" className="back-button">
                <ArrowLeftIcon className="h-5 w-5" />
                Return to Landing Page
              </Link>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="header-title flex items-center justify-center gap-2"
            >
              <img 
                src="/Logo-white.png"
                alt="Logo" 
                className="h-8 w-8 rounded-full object-cover" 
              />
              <h1>FSD Assignment 2</h1>
            </motion.div>
          </div>
        </nav>
      )}

      <main className="flex-grow">
        {children}
      </main>

      <footer className="py-4 px-4 bg-white/10 backdrop-blur-sm border-t border-white/20">
        <div className="max-w-7xl mx-auto flex justify-center items-center">
          <p className="text-sm text-gray-300">
            Developed by{' '}
            <img 
              src="/Logo-white.png"
              alt="Logo" 
              className="inline-block rounded-full object-cover align-middle mx-1"
              style={{ width: '16px', height: '16px' }}
            />
            <a 
              href="https://github.com/np-nandanpatil" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Nandan
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 