import React from 'react';

const Wizard = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <div style={{ backgroundColor: '#1E3A8A', color: 'white', padding: '1rem', textAlign: 'center' }}>
          <strong>NetWizard AI Assistant</strong>
        </div>
        <div style={{ height: '400px', padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ alignSelf: 'flex-start', backgroundColor: '#f1f5f9', padding: '12px', borderRadius: '12px', maxWidth: '80% shadow-sm' }}>
            Hello Sean! How can I help with your network configuration today?
          </div>
          <div style={{ alignSelf: 'flex-end', backgroundColor: '#2DD4BF', color: 'white', padding: '12px', borderRadius: '12px', maxWidth: '80%' }}>
            I need to set up a Guest VLAN on my MikroTik router.
          </div>
        </div>
        <div style={{ padding: '1rem', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '10px' }}>
          <input type="text" placeholder="Describe your issue..." style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
          <button style={{ backgroundColor: '#1E3A8A', color: 'white', border: 'none', padding: '0 20px', borderRadius: '8px' }}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Wizard;