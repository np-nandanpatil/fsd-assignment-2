import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const questions = [
  { id: 1, title: 'Props and State in React', description: 'Learn about component props and state management' },
  { id: 2, title: 'React Hooks: useState and useEffect', description: 'Explore fundamental React hooks' },
  { id: 3, title: 'Conditional Rendering in React', description: 'Master conditional rendering techniques' },
  { id: 4, title: 'Student Component with Props', description: 'Build a reusable student component' },
  { id: 5, title: 'Voting Application', description: 'Create an interactive voting system' },
  { id: 6, title: 'Background Color Changer', description: 'Implement dynamic background updates' },
  { id: 7, title: 'Product List with map()', description: 'Work with arrays and the map function' },
  { id: 8, title: 'Controlled Form Components', description: 'Handle form inputs in React' },
  { id: 9, title: 'useEffect Component Mount', description: 'Understand component lifecycle' },
  { id: 10, title: 'Current URL Path Component', description: 'Access and display route information' },
  { id: 11, title: 'Navigation Bar with React Router', description: 'Implement navigation with React Router' },
  { id: 12, title: 'Login Conditional Rendering', description: 'Create conditional login flows' },
  { id: 13, title: 'Auto-incrementing Counter', description: 'Build an automatic counter component' },
  { id: 14, title: 'Student List Filter', description: 'Filter and display student data' },
  { id: 15, title: 'Toggle Paragraph Visibility', description: 'Control element visibility' },
  { id: 16, title: 'Todo List Application', description: 'Create a full todo list app' },
  { id: 17, title: 'Random Joke Fetcher', description: 'Fetch and display API data' },
  { id: 18, title: 'Live Date/Time Display', description: 'Show real-time date and time' },
  { id: 19, title: 'Product Cart Page', description: 'Build a shopping cart interface' },
  { id: 20, title: 'Feedback Form', description: 'Create an interactive feedback form' },
  { id: 21, title: 'Country Dropdown List', description: 'Implement a searchable country list' },
  { id: 22, title: 'Temperature Converter', description: 'Convert between temperature units' },
  { id: 23, title: 'Post Like/Dislike Counter', description: 'Build an engagement counter' },
];

const Home = () => {
  const [showQuestions, setShowQuestions] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > window.innerHeight * 0.2) {
        setShowQuestions(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-text">
            Master React Concepts
          </h1>
          <p className="hero-subtitle">
            Explore 23 practical React examples with interactive demos
          </p>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span>Scroll Down</span>
          <svg
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </section>

      {/* Questions Grid */}
      <section className="questions-section">
        <motion.div
          className="questions-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: showQuestions ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {questions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={showQuestions ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                to={`/question/${question.id}`}
                className="glass-card block hover:no-underline"
              >
                <span className="question-number">Question {question.id}</span>
                <h2 className="question-title">
                  {question.title}
                </h2>
                <p className="question-description">
                  {question.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Home; 