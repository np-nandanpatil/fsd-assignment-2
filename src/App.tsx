import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import QuestionPage from './pages/QuestionPage';

function App() {
  return (
    <Router basename="/fsd-assignment-2">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/question/:id" element={<QuestionPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
