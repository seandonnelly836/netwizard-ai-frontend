import React from 'react';

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: '#1E3A8A', color: 'white', padding: '1rem', display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>NetWizard AI</div>
      <div>
        <span style={{ marginRight: '15px' }}>Dashboard</span>
        <span style={{ marginRight: '15px' }}>Wizard</span>
        <span style={{ marginRight: '15px' }}>History</span>
      </div>
      <div>Welcome, Sean</div>
    </nav>
  );
};

export default Navbar;