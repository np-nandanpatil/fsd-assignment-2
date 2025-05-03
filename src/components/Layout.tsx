import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/fsd-assignment-2/';

  return (
    <div className="min-h-screen">
      {!isHomePage && (
        <nav className="fixed top-0 w-full nav-glass">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="flex items-center h-full">
              <Link to="/" className="back-button">
                <ArrowLeftIcon className="h-5 w-5" />
                Return to Landing Page
              </Link>
            </div>
            
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="header-title"
            >
              FSD Assignment 2
            </motion.h1>
          </div>
        </nav>
      )}

      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout; 