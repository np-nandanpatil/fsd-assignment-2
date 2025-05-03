import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Todo {
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
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add
        </button>
      </form>

      <AnimatePresence>
        {todos.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 py-8"
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
                className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm hover:shadow transition-shadow"
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`p-1 rounded-full transition-colors ${
                    todo.completed ? 'bg-green-100' : 'bg-gray-100'
                  }`}
                >
                  <CheckIcon className={`w-5 h-5 transition-colors ${
                    todo.completed ? 'text-green-500' : 'text-gray-400'
                  }`} />
                </button>
                <span className={`flex-1 transition-all ${
                  todo.completed ? 'line-through text-gray-400' : ''
                }`}>
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="p-1 text-red-500 hover:bg-red-100 rounded transition-colors"
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
};

export default TodoDemo; 