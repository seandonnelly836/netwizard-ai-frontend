import { checkServerHealth } from './services/api';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Wizard from './pages/Wizard';
import History from './pages/History';

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;

import React, { useEffect } from 'react';
import { checkServerHealth } from './services/api';
// שאר האימפורטים שלך (Router, Navbar, etc...)

function App() {
  useEffect(() => {
    // הרצת בדיקת החיבור לשרת
    checkServerHealth().then(data => {
      console.log('Backend response inside React:', data);
    }).catch(err => {
      console.log('Failed to connect from React:', err);
    });
  }, []);

  return (
    
    <div>פרויקט NetWizard AI המאובטח</div>
  );
}

export default App;