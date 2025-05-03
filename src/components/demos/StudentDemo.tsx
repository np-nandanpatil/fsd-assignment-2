import { useState } from 'react';
import { motion } from 'framer-motion';

interface StudentProps {
  name: string;
  grade: number;
}

function Student({ name, grade }: StudentProps) {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
      <p className="text-gray-600">Grade: {grade}</p>
    </div>
  );
}

const StudentDemo = () => {
  const [students] = useState<StudentProps[]>([
    { name: "John Doe", grade: 85 },
    { name: "Jane Smith", grade: 92 },
    { name: "Bob Johnson", grade: 78 }
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {students.map((student, index) => (
        <motion.div
          key={student.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Student name={student.name} grade={student.grade} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StudentDemo; 