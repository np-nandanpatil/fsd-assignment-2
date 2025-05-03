import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useQuestions } from '../hooks/useQuestions';
import CodeBlock from '../components/CodeBlock';
import DemoFrame from '../components/DemoFrame';
import { demos } from '../components/demos';

const QuestionPage = () => {
  const { id } = useParams<{ id: string }>();
  const {
    currentQuestion,
    loading,
    questions,
    loadQuestion,
    getNextQuestion,
    getPreviousQuestion,
  } = useQuestions();

  useEffect(() => {
    const questionId = parseInt(id || '1');
    loadQuestion(questionId);
  }, [id, loadQuestion]);

  if (loading || !currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const progress = (currentQuestion.id / questions.length) * 100;
  const nextQuestion = getNextQuestion(currentQuestion.id);
  const prevQuestion = getPreviousQuestion(currentQuestion.id);

  const DemoComponent = currentQuestion.demoKey ? demos[currentQuestion.demoKey] : null;

  return (
    <div className="answer-layout">
      <div className="mobile-question-nav">
        <div className="text-white mb-4">
          Question {currentQuestion.id} of {questions.length}
        </div>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-4">
          <div>
            {currentQuestion.id > 1 && (
              <Link
                to={`/question/${currentQuestion.id - 1}`}
                className="nav-link"
              >
                ← Previous
              </Link>
            )}
          </div>
          <div>
            {currentQuestion.id < questions.length && (
              <Link
                to={`/question/${currentQuestion.id + 1}`}
                className="nav-link"
              >
                Next →
              </Link>
            )}
          </div>
        </div>
      </div>

      <motion.div
        className="answer-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-6">
          {currentQuestion.title}
        </h1>
        <p className="text-gray-600 mb-6">{currentQuestion.description}</p>
        
        {currentQuestion.code && (
          <div className="mb-6">
            <CodeBlock code={currentQuestion.code} />
          </div>
        )}

        {DemoComponent && (
          <DemoFrame title="Interactive Demo">
            <DemoComponent />
          </DemoFrame>
        )}
      </motion.div>

      <motion.div
        className="answer-sidebar desktop-question-nav"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="text-white mb-4">
          Question {currentQuestion.id} of {questions.length}
        </div>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-6">
          <div>
            {currentQuestion.id > 1 && (
              <Link
                to={`/question/${currentQuestion.id - 1}`}
                className="nav-link"
              >
                ← Previous
              </Link>
            )}
          </div>
          <div>
            {currentQuestion.id < questions.length && (
              <Link
                to={`/question/${currentQuestion.id + 1}`}
                className="nav-link"
              >
                Next →
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default QuestionPage; 