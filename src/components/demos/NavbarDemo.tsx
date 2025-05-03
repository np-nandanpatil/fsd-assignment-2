import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const NavbarDemo = () => {
  const location = useLocation();

  const links = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/blog', label: 'Blog' },
  ];

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <nav className="space-y-6">
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex justify-center space-x-8">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3 py-2 text-lg transition-colors ${
                    location.pathname === link.path
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 right-0 h-0.5 bg-blue-600 bottom-0"
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <div className="flex flex-col space-y-2">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === link.path
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Current Route Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center pt-6 border-t"
          >
            <p className="text-gray-600">
              Current Route: <span className="font-mono">{location.pathname}</span>
            </p>
          </motion.div>
        </nav>
      </div>

      <div className="glass-card p-4">
        <p className="text-sm text-gray-600">
          This demo shows how to create a responsive navigation bar using React Router
          with active route highlighting and smooth transitions.
        </p>
      </div>
    </div>
  );
};

export default NavbarDemo; 