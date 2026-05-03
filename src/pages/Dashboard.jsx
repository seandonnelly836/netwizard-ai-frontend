import React from 'react';

const Dashboard = () => {
  const networks = [
    { id: 1, name: 'Home Lab', device: 'MikroTik RBD52G', status: 'Active' },
    { id: 2, name: 'Office Main', device: 'Ubiquiti UDM', status: 'Warning' },
    { id: 3, name: 'Small Cafe Wi-Fi', device: 'TP-Link EAP245', status: 'Active' }
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>My Networks</h1>
        <button style={{ backgroundColor: '#1E3A8A', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>
          + New Network
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {networks.map(net => (
          <div key={net.id} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>{net.name}</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Device: {net.device}</p>
            <span style={{ 
              fontSize: '0.8rem', 
              padding: '4px 12px', 
              borderRadius: '20px', 
              backgroundColor: net.status === 'Active' ? '#d1fae5' : '#fee2e2',
              color: net.status === 'Active' ? '#065f46' : '#991b1b'
            }}>
              {net.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;