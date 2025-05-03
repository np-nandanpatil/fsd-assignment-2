import { useState, useEffect } from 'react';
import { demos } from '../components/demos';
import VotingApp from '../components/demos/VotingApp';
import TodoList from '../components/demos/TodoList';
import TemperatureConverter from '../components/demos/TemperatureConverter';
import PostReactions from '../components/demos/PostReactions';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon, TrashIcon } from '@heroicons/react/24/outline';

export interface Question {
  id: number;
  title: string;
  description: string;
  code?: string;
  demoKey?: keyof typeof demos;
}

const questions: Question[] = [
  {
    id: 1,
    title: 'Props and State in React',
    description: 'Props and State are two fundamental concepts in React. Props are used to pass data from parent to child components, while State is used to manage component-specific data that can change over time.',
    code: `// Example of Props
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Example of State
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}`,
    demoKey: 'PropsStateDemo'
  },
  {
    id: 2,
    title: 'React Hooks: useState and useEffect',
    description: 'React Hooks are functions that let you "hook into" React state and lifecycle features from function components. useState and useEffect are the most commonly used hooks.',
    code: `// useState Hook
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// useEffect Hook
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>Seconds: {seconds}</div>;
}`,
    demoKey: 'HooksDemo'
  },
  {
    id: 3,
    title: 'Conditional Rendering in React',
    description: 'Conditional rendering allows you to render different components or content based on certain conditions. This can be done using if statements, ternary operators, or logical && operators.',
    code: `// Using if statements
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }
  return <h1>Please log in.</h1>;
}

// Using ternary operator
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back!</h1>
      ) : (
        <h1>Please log in.</h1>
      )}
    </div>
  );
}

// Using logical && operator
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn && <h1>Welcome back!</h1>}
      {!isLoggedIn && <h1>Please log in.</h1>}
    </div>
  );
}`,
    demoKey: 'ConditionalRenderingDemo'
  },
  {
    id: 4,
    title: 'Student Component with Props',
    description: 'Create a React functional component that receives name and grade as props and displays them.',
    code: `interface StudentProps {
  name: string;
  grade: number;
}

function Student({ name, grade }: StudentProps) {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-gray-600">Grade: {grade}</p>
    </div>
  );
}

// Usage
<Student name="John Doe" grade={85} />`,
    demoKey: 'StudentDemo'
  },
  {
    id: 5,
    title: 'Voting Application',
    description: 'Build a simple voting application with three candidates using components and useState. Only one vote allowed per user.',
    code: `interface Candidate {
  id: number;
  name: string;
  votes: number;
}

const VotingApp = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([
    { id: 1, name: 'Candidate A', votes: 0 },
    { id: 2, name: 'Candidate B', votes: 0 },
    { id: 3, name: 'Candidate C', votes: 0 },
  ]);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (candidateId: number) => {
    if (hasVoted) return;

    setCandidates(candidates.map(candidate =>
      candidate.id === candidateId
        ? { ...candidate, votes: candidate.votes + 1 }
        : candidate
    ));
    setHasVoted(true);
  };

  const totalVotes = candidates.reduce((sum, candidate) => sum + candidate.votes, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {candidates.map(candidate => (
          <div key={candidate.id} className="glass-card p-4 text-center">
            <h3 className="text-lg font-semibold mb-2">
              {candidate.name}
            </h3>
            <p className="text-2xl font-bold mb-4">
              {candidate.votes} votes
            </p>
            <button
              onClick={() => handleVote(candidate.id)}
              disabled={hasVoted}
              className="btn-primary w-full disabled:opacity-50"
            >
              {hasVoted ? 'Voted' : 'Vote'}
            </button>
          </div>
        ))}
      </div>

      <div className="glass-card p-4">
        <h3 className="text-lg font-semibold mb-2">
          Total Votes: {totalVotes}
        </h3>
        {hasVoted && (
          <p className="text-sm text-gray-600">
            Thank you for voting! You can only vote once.
          </p>
        )}
      </div>
    </div>
  );
};`,
    demoKey: 'VotingApp',
  },
  {
    id: 6,
    title: 'Background Color Changer',
    description: 'Write a React component that changes the background color of a div when a button is clicked using useState.',
    code: `function ColorChanger() {
  const [color, setColor] = useState('#ffffff');

  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];

  const changeColor = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColor);
  };

  return (
    <div style={{ backgroundColor: color }} className="p-8 rounded-lg">
      <button onClick={changeColor} className="btn-primary">
        Change Color
      </button>
    </div>
  );
}`,
    demoKey: 'ColorChangerDemo'
  },
  {
    id: 7,
    title: 'Product List with map()',
    description: 'Create a list of products using map() in React. Each product shows name, price, and a "Buy Now" button.',
    code: `interface Product {
  id: number;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: 'Laptop', price: 999 },
  { id: 2, name: 'Smartphone', price: 699 },
  { id: 3, name: 'Headphones', price: 199 },
];

function ProductList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id} className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600">\${product.price}</p>
          <button className="btn-primary mt-2">Buy Now</button>
        </div>
      ))}
    </div>
  );
}`,
    demoKey: 'ProductListDemo'
  },
  {
    id: 8,
    title: 'Controlled Form Components',
    description: 'Design a form in React with controlled components for Name and Email. Display submitted data below.',
    code: `function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>
      <button type="submit" className="btn-primary">
        Submit
      </button>
    </form>
  );
}`,
    demoKey: 'ContactFormDemo'
  },
  {
    id: 9,
    title: 'useEffect Component Mount',
    description: 'Use useEffect to display "Component Mounted" only once when the component loads.',
    code: `function MountedComponent() {
  useEffect(() => {
    console.log('Component Mounted');
  }, []); // Empty dependency array means this effect runs once on mount

  return <div>Check the console to see the mount message</div>;
}`,
    demoKey: 'MountedComponentDemo'
  },
  {
    id: 10,
    title: 'Current URL Path Component',
    description: 'Create a React component that shows the current URL path using useLocation.',
    code: `import { useLocation } from 'react-router-dom';

function CurrentPath() {
  const location = useLocation();

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <p className="text-gray-700">Current Path: {location.pathname}</p>
    </div>
  );
}`,
    demoKey: 'CurrentPathDemo'
  },
  {
    id: 11,
    title: 'Navigation Bar with React Router',
    description: 'Build a navigation bar using React Router with links to Home, About, and Contact components.',
    code: `import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link to="/" className="text-gray-900 hover:text-primary-600">
              Home
            </Link>
            <Link to="/about" className="text-gray-900 hover:text-primary-600">
              About
            </Link>
            <Link to="/contact" className="text-gray-900 hover:text-primary-600">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}`,
    demoKey: 'NavbarDemo'
  },
  {
    id: 12,
    title: 'Login Conditional Rendering',
    description: 'Implement conditional rendering: If logged in, show "Welcome", else "Please login". Use useState to toggle.',
    code: `function LoginStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="p-4">
      {isLoggedIn ? (
        <div>
          <h2 className="text-xl font-semibold">Welcome!</h2>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="btn-secondary mt-2"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold">Please login</h2>
          <button
            onClick={() => setIsLoggedIn(true)}
            className="btn-primary mt-2"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}`,
    demoKey: 'LoginStatusDemo'
  },
  {
    id: 13,
    title: 'Auto-incrementing Counter',
    description: 'Create a counter component using useState and useEffect that auto-increments until it reaches 10.',
    code: `function AutoCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count < 10) {
      const timer = setTimeout(() => {
        setCount(count + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [count]);

  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl font-bold">{count}</h2>
      {count === 10 && (
        <p className="text-green-600 mt-2">Counter reached 10!</p>
      )}
    </div>
  );
}`,
    demoKey: 'AutoCounterDemo'
  },
  {
    id: 14,
    title: 'Student List Filter',
    description: 'Create a React component that accepts a list of students as props and displays those with >50 marks.',
    code: `interface Student {
  id: number;
  name: string;
  marks: number;
}

interface StudentListProps {
  students: Student[];
}

function StudentList({ students }: StudentListProps) {
  const passingStudents = students.filter(student => student.marks > 50);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Passing Students</h2>
      {passingStudents.map(student => (
        <div key={student.id} className="p-4 border rounded-lg">
          <h3 className="font-medium">{student.name}</h3>
          <p className="text-gray-600">Marks: {student.marks}</p>
        </div>
      ))}
    </div>
  );
}`,
    demoKey: 'StudentListDemo'
  },
  {
    id: 15,
    title: 'Toggle Paragraph Visibility',
    description: 'Design a React app with a button to toggle paragraph visibility using useState.',
    code: `function ToggleVisibility() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="p-4">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="btn-primary mb-4"
      >
        {isVisible ? 'Hide' : 'Show'} Paragraph
      </button>
      {isVisible && (
        <p className="text-gray-700">
          This paragraph can be toggled on and off using the button above.
        </p>
      )}
    </div>
  );
}`,
    demoKey: 'ToggleVisibilityDemo'
  },
  {
    id: 16,
    title: 'Todo List Application',
    description: 'Build a Todo List app where users can add/delete tasks.',
    code: `interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
      },
    ]);
    setNewTodo('');
  };

  const handleToggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleAddTodo} className="flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 px-4 py-2 border rounded-md"
        />
        <button type="submit" className="btn-primary">
          Add
        </button>
      </form>

      {todos.map(todo => (
        <div key={todo.id} className="glass-card p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
              className="w-5 h-5 rounded"
            />
            <span className={todo.completed ? 'line-through text-gray-400' : ''}>
              {todo.text}
            </span>
          </div>
          <button
            onClick={() => handleDeleteTodo(todo.id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      ))}

      {todos.length === 0 && (
        <p className="text-center text-gray-500">No todos yet. Add one above!</p>
      )}
    </div>
  );
};`,
    demoKey: 'TodoList',
  },
  {
    id: 17,
    title: 'Random Joke Fetcher',
    description: 'Create a component that fetches and displays a random joke from an API.',
    code: `function JokeFetcher() {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.chucknorris.io/jokes/random');
      const data = await response.json();
      setJoke(data.value);
    } catch (error) {
      console.error('Error fetching joke:', error);
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <button
        onClick={fetchJoke}
        disabled={loading}
        className="btn-primary mb-4"
      >
        {loading ? 'Loading...' : 'Get Random Joke'}
      </button>
      {joke && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-700">{joke}</p>
        </div>
      )}
    </div>
  );
}`,
    demoKey: 'JokeFetcherDemo'
  },
  {
    id: 18,
    title: 'Live Date/Time Display',
    description: 'Make a component that displays the current date/time and updates every second using useEffect.',
    code: `function DateTimeDisplay() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl font-bold">
        {dateTime.toLocaleDateString()}
      </h2>
      <p className="text-gray-600">
        {dateTime.toLocaleTimeString()}
      </p>
    </div>
  );
}`,
    demoKey: 'DateTimeDemo'
  },
  {
    id: 19,
    title: 'Product Cart Page',
    description: 'Create a product cart page where "Add to Cart" increases the cart count.',
    code: `interface Product {
  id: number;
  name: string;
  price: number;
}

function CartPage() {
  const [cartCount, setCartCount] = useState(0);
  const [products] = useState<Product[]>([
    { id: 1, name: 'Product 1', price: 99 },
    { id: 2, name: 'Product 2', price: 149 },
    { id: 3, name: 'Product 3', price: 199 },
  ]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Shopping Cart</h2>
        <span className="text-gray-600">Items in cart: {cartCount}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="p-4 border rounded-lg">
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-gray-600">\${product.price}</p>
            <button
              onClick={() => setCartCount(cartCount + 1)}
              className="btn-primary mt-2"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}`,
  },
  {
    id: 20,
    title: 'Feedback Form',
    description: 'Design a feedback form with Name, Email, Feedback fields. Show confirmation on submit.',
    code: `function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  if (submitted) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-semibold text-green-600">
          Thank you for your feedback!
        </h2>
        <button
          onClick={() => setSubmitted(false)}
          className="btn-secondary mt-4"
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>
      <div>
        <label
          htmlFor="feedback"
          className="block text-sm font-medium text-gray-700"
        >
          Feedback
        </label>
        <textarea
          id="feedback"
          name="feedback"
          value={formData.feedback}
          onChange={handleChange}
          required
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>
      <button type="submit" className="btn-primary">
        Submit Feedback
      </button>
    </form>
  );
}`,
  },
  {
    id: 21,
    title: 'Country Dropdown List',
    description: 'Implement a dropdown list of countries. Display the selected country\'s name.',
    code: `function CountrySelector() {
  const [selectedCountry, setSelectedCountry] = useState('');

  const countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'Germany',
    'France',
    'Japan',
    'China',
  ];

  return (
    <div className="p-4">
      <label
        htmlFor="country"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Select a Country
      </label>
      <select
        id="country"
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
      >
        <option value="">Select a country</option>
        {countries.map(country => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      {selectedCountry && (
        <p className="mt-4 text-gray-700">
          Selected Country: {selectedCountry}
        </p>
      )}
    </div>
  );
}`,
  },
  {
    id: 22,
    title: 'Temperature Converter',
    description: 'Build a Celsius-to-Fahrenheit temperature converter with controlled inputs.',
    code: `const TemperatureConverter = () => {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');

  const handleCelsiusChange = (value: string) => {
    setCelsius(value);
    if (value === '') {
      setFahrenheit('');
      return;
    }
    const f = (parseFloat(value) * 9) / 5 + 32;
    setFahrenheit(f.toFixed(2));
  };

  const handleFahrenheitChange = (value: string) => {
    setFahrenheit(value);
    if (value === '') {
      setCelsius('');
      return;
    }
    const c = ((parseFloat(value) - 32) * 5) / 9;
    setCelsius(c.toFixed(2));
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-4">
        <h3 className="text-lg font-semibold mb-4">
          Temperature Converter
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="celsius" className="block text-sm font-medium mb-1">
              Celsius
            </label>
            <input
              type="number"
              id="celsius"
              value={celsius}
              onChange={(e) => handleCelsiusChange(e.target.value)}
              placeholder="Enter temperature in Celsius"
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="fahrenheit" className="block text-sm font-medium mb-1">
              Fahrenheit
            </label>
            <input
              type="number"
              id="fahrenheit"
              value={fahrenheit}
              onChange={(e) => handleFahrenheitChange(e.target.value)}
              placeholder="Enter temperature in Fahrenheit"
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="glass-card p-4">
        <p className="text-sm text-gray-600">
          Formula: °F = (°C × 9/5) + 32
        </p>
      </div>
    </div>
  );
};`,
    demoKey: 'TemperatureConverter',
  },
  {
    id: 23,
    title: 'Post Like/Dislike Counter',
    description: 'Create a React app for liking/disliking a post. Display total likes/dislikes.',
    code: `const PostReactions = () => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userReaction, setUserReaction] = useState<'like' | 'dislike' | null>(null);

  const handleLike = () => {
    if (userReaction === 'like') {
      setLikes(likes - 1);
      setUserReaction(null);
    } else {
      if (userReaction === 'dislike') {
        setDislikes(dislikes - 1);
      }
      setLikes(likes + 1);
      setUserReaction('like');
    }
  };

  const handleDislike = () => {
    if (userReaction === 'dislike') {
      setDislikes(dislikes - 1);
      setUserReaction(null);
    } else {
      if (userReaction === 'like') {
        setLikes(likes - 1);
      }
      setDislikes(dislikes + 1);
      setUserReaction('dislike');
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">
          Post Reactions
        </h3>
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className={\`flex items-center gap-2 px-4 py-2 rounded-md \${
              userReaction === 'like'
                ? 'text-green-600 bg-green-50'
                : 'text-gray-600 hover:bg-gray-50'
            }\`}
          >
            <span>👍</span>
            <span>{likes}</span>
          </button>
          <button
            onClick={handleDislike}
            className={\`flex items-center gap-2 px-4 py-2 rounded-md \${
              userReaction === 'dislike'
                ? 'text-red-600 bg-red-50'
                : 'text-gray-600 hover:bg-gray-50'
            }\`}
          >
            <span>👎</span>
            <span>{dislikes}</span>
          </button>
        </div>
      </div>

      <div className="glass-card p-4">
        <p className="text-sm text-gray-600">
          Total Reactions: {likes + dislikes}
        </p>
      </div>
    </div>
  );
};`,
    demoKey: 'PostReactions',
  },
  {
    id: 24,
    title: 'Todo List Component',
    description: 'Create a Todo List component that allows users to add, toggle, and delete todos. The component should use useState for state management and include smooth animations.',
    code: `interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoDemo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setTodos([
      ...todos,
      { id: Date.now(), text: input.trim(), completed: false }
    ]);
    setInput('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <form onSubmit={addTodo} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add
        </button>
      </form>

      <AnimatePresence>
        {todos.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500"
          >
            No todos yet. Add one above!
          </motion.p>
        ) : (
          <motion.ul className="space-y-2">
            {todos.map(todo => (
              <motion.li
                key={todo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="flex items-center gap-2 p-3 bg-white rounded-lg shadow"
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={\`p-1 rounded-full \${
                    todo.completed ? 'bg-green-100' : 'bg-gray-100'
                  }\`}
                >
                  <CheckIcon className={\`w-5 h-5 \${
                    todo.completed ? 'text-green-500' : 'text-gray-400'
                  }\`} />
                </button>
                <span className={\`flex-1 \${
                  todo.completed ? 'line-through text-gray-400' : ''
                }\`}>
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="p-1 text-red-500 hover:bg-red-100 rounded"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};`,
    demoKey: 'TodoDemo'
  },
];

export const useQuestions = () => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);

  const getQuestionById = (id: number) => {
    return questions.find(q => q.id === id) || null;
  };

  const getNextQuestion = (currentId: number) => {
    const nextId = currentId + 1;
    return nextId <= questions.length ? getQuestionById(nextId) : null;
  };

  const getPreviousQuestion = (currentId: number) => {
    const prevId = currentId - 1;
    return prevId >= 1 ? getQuestionById(prevId) : null;
  };

  const loadQuestion = (id: number) => {
    setLoading(true);
    const question = getQuestionById(id);
    setCurrentQuestion(question);
    setLoading(false);
  };

  return {
    questions,
    currentQuestion,
    loading,
    getQuestionById,
    getNextQuestion,
    getPreviousQuestion,
    loadQuestion,
  };
}; 