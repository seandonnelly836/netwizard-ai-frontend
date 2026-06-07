import React from 'react';

// Design Tokens
const COLORS = {
  primary: '#4F46E5',
  secondary: '#EEF2FF',
  accent: '#10B981',
  background: '#F9FAFB',
  textDark: '#1F2937',
  textLight: '#6B7280'
};

const Dashboard = () => {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', backgroundColor: COLORS.background, minHeight: '100vh', padding: '24px' }}>
      
      {/* Greeting & Streak Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ color: COLORS.textDark, margin: '0 0 8px 0', fontSize: '2rem' }}>Good morning, Maya 👋</h1>
          <p style={{ color: COLORS.textLight, margin: 0 }}>Ready for a focused study day?</p>
        </div>
        <div style={{ backgroundColor: COLORS.accent, color: 'white', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>🔥</span> 5 Day Streak
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Sessions This Week', value: '8' },
          { label: 'Hours Studied', value: '14.5h' },
          { label: 'Completion Rate', value: '92%' }
        ].map((stat, i) => (
          <div key={i} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '16px', boxLight: '0 4px 6px -1px rgba(79, 70, 229, 0.05)', border: '1px solid #E5E7EB' }}>
            <span style={{ color: COLORS.textLight, fontSize: '0.875rem' }}>{stat.label}</span>
            <div style={{ color: COLORS.textDark, fontSize: '1.75rem', fontWeight: 'bold', marginTop: '4px' }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Today's Sessions Section */}
      <div>
        <h2 style={{ color: COLORS.textDark, fontSize: '1.5rem', marginBottom: '16px' }}>Today's Sessions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: '0 0 4px 0', color: COLORS.textDark }}>Introduction to UI Design</h3>
              <span style={{ color: COLORS.textLight, fontSize: '0.875rem' }}>10:00 AM · 2 hours</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
              <span style={{ backgroundColor: COLORS.secondary, color: COLORS.primary, padding: '4px 12px', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '500' }}>In Progress</span>
              <span style={{ color: COLORS.textLight, fontSize: '0.75rem' }}>3/5 tasks done</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button style={{ position: 'fixed', bottom: '32px', right: '32px', backgroundColor: COLORS.primary, color: 'white', border: 'none', padding: '16px 24px', borderRadius: '30px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.3)' }}>
        + Plan a Session
      </button>

    </div>
  );
};

export default Dashboard;