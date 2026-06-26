import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Wizard from './pages/Wizard';
import History from './pages/History';
import FeedbackWidget from './components/FeedbackWidget';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/wizard" element={<Wizard />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Analytics />
        <FeedbackWidget />
      </AuthProvider>
    </Router>
  );
}

export default App;
