import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Student {
  id: number;
  name: string;
  marks: number;
  grade: string;
}

const StudentListDemo = () => {
  const [students] = useState<Student[]>([
    { id: 1, name: 'John Doe', marks: 85, grade: 'A' },
    { id: 2, name: 'Jane Smith', marks: 92, grade: 'A+' },
    { id: 3, name: 'Bob Johnson', marks: 45, grade: 'F' },
    { id: 4, name: 'Alice Brown', marks: 78, grade: 'B+' },
    { id: 5, name: 'Charlie Wilson', marks: 35, grade: 'F' },
    { id: 6, name: 'Eva Davis', marks: 95, grade: 'A+' },
  ]);

  const [filterMark, setFilterMark] = useState(50);
  const [sortBy, setSortBy] = useState<'name' | 'marks'>('marks');

  const filteredStudents = students
    .filter(student => student.marks >= filterMark)
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return b.marks - a.marks;
    });

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Minimum Marks: {filterMark}
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={filterMark}
                onChange={(e) => setFilterMark(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="space-x-2">
              <button
                onClick={() => setSortBy('marks')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  sortBy === 'marks'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Sort by Marks
              </button>
              <button
                onClick={() => setSortBy('name')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  sortBy === 'name'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Sort by Name
              </button>
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            {filteredStudents.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-500 py-8"
              >
                No students meet the criteria
              </motion.p>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {filteredStudents.map(student => (
                  <motion.div
                    key={student.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="glass-card p-4 space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">{student.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        student.grade === 'A+' ? 'bg-green-100 text-green-700' :
                        student.grade === 'A' ? 'bg-blue-100 text-blue-700' :
                        student.grade === 'B+' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {student.grade}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${student.marks}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-600">
                        {student.marks}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="glass-card p-4">
        <p className="text-sm text-gray-600">
          This demo shows how to filter and sort a list of students,
          with animated transitions and responsive layout.
        </p>
      </div>
    </div>
  );
};

export default StudentListDemo; 