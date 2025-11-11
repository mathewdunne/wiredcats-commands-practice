import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CommandGroupPractice } from './pages/CommandGroupPractice';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/command-group-practice" element={<CommandGroupPractice />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
