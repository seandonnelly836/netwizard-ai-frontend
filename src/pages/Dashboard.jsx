import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NETWORKS = [
  { id: 1, name: 'Home Lab', device: 'MikroTik RBD52G', status: 'Active', ip: '192.168.88.1', uptime: '14d 6h' },
  { id: 2, name: 'Office Main', device: 'Ubiquiti UDM', status: 'Warning', ip: '10.0.0.1', uptime: '3d 2h' },
  { id: 3, name: 'Small Cafe Wi-Fi', device: 'TP-Link EAP245', status: 'Active', ip: '192.168.1.1', uptime: '30d 1h' },
];

const STATS = [
  { label: 'Networks', value: '3', icon: '🖧' },
  { label: 'Active', value: '2', icon: '✅' },
  { label: 'Warnings', value: '1', icon: '⚠️' },
  { label: 'Wizard Sessions', value: '5', icon: '🧠' },
];

const S = {
  page: { padding: '2rem', maxWidth: '1100px', margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' },
  greeting: { fontSize: '1.5rem', fontWeight: '700', color: '#0f172a', marginBottom: '4px' },
  sub: { fontSize: '0.9rem', color: '#64748b' },
  btnPrimary: {
    backgroundColor: '#1E3A8A', color: 'white', border: 'none',
    padding: '10px 20px', borderRadius: '8px', cursor: 'pointer',
    fontFamily: 'inherit', fontWeight: '600', fontSize: '0.9rem',
    display: 'flex', alignItems: 'center', gap: '6px',
    boxShadow: '0 2px 8px rgba(30,58,138,0.3)',
    transition: 'opacity 0.15s',
  },
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '2rem' },
  statCard: {
    backgroundColor: 'white', borderRadius: '10px', padding: '16px 20px',
    border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px',
  },
  statIcon: { fontSize: '1.4rem' },
  statValue: { fontSize: '1.5rem', fontWeight: '700', color: '#0f172a', lineHeight: 1 },
  statLabel: { fontSize: '0.78rem', color: '#64748b', marginTop: '3px' },
  sectionTitle: { fontSize: '1rem', fontWeight: '700', color: '#0f172a', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.78rem', color: '#64748b' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' },
  card: {
    backgroundColor: 'white', padding: '1.4rem', borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0',
    transition: 'box-shadow 0.2s, transform 0.2s', cursor: 'pointer',
  },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' },
  cardName: { fontSize: '1rem', fontWeight: '700', color: '#0f172a' },
  cardDevice: { fontSize: '0.82rem', color: '#64748b', marginBottom: '12px' },
  cardMeta: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #f1f5f9' },
  cardIp: { fontSize: '0.78rem', color: '#94a3b8', fontFamily: 'monospace' },
  cardUptime: { fontSize: '0.78rem', color: '#94a3b8' },
};

const statusBadge = (status) => ({
  fontSize: '0.75rem', padding: '3px 10px', borderRadius: '20px', fontWeight: '600',
  backgroundColor: status === 'Active' ? '#d1fae5' : '#fff3cd',
  color: status === 'Active' ? '#065f46' : '#92400e',
});

const Dashboard = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  return (
    <div style={S.page}>
      <div style={S.header}>
        <div>
          <div style={S.greeting}>Good to see you, Sean 👋</div>
          <div style={S.sub}>Here's an overview of your managed networks.</div>
        </div>
        <button
          style={S.btnPrimary}
          onClick={() => navigate('/wizard')}
          onMouseOver={e => e.currentTarget.style.opacity = '0.85'}
          onMouseOut={e => e.currentTarget.style.opacity = '1'}
        >
          <span>⚡</span> Open Wizard
        </button>
      </div>

      <div style={S.statsRow}>
        {STATS.map((s, i) => (
          <div key={i} style={S.statCard}>
            <span style={S.statIcon}>{s.icon}</span>
            <div>
              <div style={S.statValue}>{s.value}</div>
              <div style={S.statLabel}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={S.sectionTitle}>Your Networks</div>
      <div style={S.grid}>
        {NETWORKS.map(net => (
          <div
            key={net.id}
            style={{ ...S.card, boxShadow: hovered === net.id ? '0 8px 24px rgba(0,0,0,0.1)' : S.card.boxShadow, transform: hovered === net.id ? 'translateY(-2px)' : 'none' }}
            onMouseEnter={() => setHovered(net.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => navigate('/wizard')}
          >
            <div style={S.cardTop}>
              <div style={S.cardName}>{net.name}</div>
              <span style={statusBadge(net.status)}>{net.status}</span>
            </div>
            <div style={S.cardDevice}>{net.device}</div>
            <div style={S.cardMeta}>
              <span style={S.cardIp}>{net.ip}</span>
              <span style={S.cardUptime}>↑ {net.uptime}</span>
            </div>
          </div>
        ))}

        {/* Add network placeholder */}
        <div
          style={{ ...S.card, border: '2px dashed #cbd5e1', boxShadow: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '130px', color: '#94a3b8', flexDirection: 'column', gap: '8px' }}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#2DD4BF'}
          onMouseLeave={e => e.currentTarget.style.borderColor = '#cbd5e1'}
        >
          <span style={{ fontSize: '1.5rem' }}>+</span>
          <span style={{ fontSize: '0.85rem' }}>Add network</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
