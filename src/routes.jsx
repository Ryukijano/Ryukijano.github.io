import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Intro from './pages/Intro.jsx';
import Academic from './pages/Academic.jsx';
import WorkIndex from './pages/WorkIndex.jsx';
import CaseStudyPage from './pages/CaseStudyPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/academic" element={<Academic />} />
        <Route path="/work" element={<WorkIndex />} />
        <Route path="/work/:slug" element={<CaseStudyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
