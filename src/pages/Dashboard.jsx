import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const INITIAL_NETWORKS = [
  { id: 1, name: 'Home Lab', device: 'MikroTik RBD52G', status: 'Active', ip: '192.168.88.1', uptime: '14d 6h' },
  { id: 2, name: 'Office Main', device: 'Ubiquiti UDM', status: 'Warning', ip: '10.0.0.1', uptime: '3d 2h' },
  { id: 3, name: 'Small Cafe Wi-Fi', device: 'TP-Link EAP245', status: 'Active', ip: '192.168.1.1', uptime: '30d 1h' },
];

const DEVICE_OPTIONS = [
  'MikroTik RouterBoard', 'MikroTik CCR', 'Ubiquiti UDM', 'Ubiquiti USG',
  'Ubiquiti EdgeRouter', 'TP-Link EAP245', 'TP-Link Omada Controller', 'Other',
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
  sectionTitle: { fontSize: '0.78rem', fontWeight: '700', color: '#64748b', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' },
  card: {
    backgroundColor: 'white', padding: '1.4rem', borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0',
    transition: 'box-shadow 0.2s, transform 0.2s', cursor: 'pointer',
    position: 'relative',
  },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' },
  cardName: { fontSize: '1rem', fontWeight: '700', color: '#0f172a' },
  cardDevice: { fontSize: '0.82rem', color: '#64748b', marginBottom: '12px' },
  cardMeta: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #f1f5f9' },
  cardIp: { fontSize: '0.78rem', color: '#94a3b8', fontFamily: 'monospace' },
  cardUptime: { fontSize: '0.78rem', color: '#94a3b8' },
  removeBtn: {
    position: 'absolute', top: '10px', right: '10px',
    background: 'none', border: 'none', cursor: 'pointer',
    color: '#cbd5e1', fontSize: '1rem', lineHeight: 1, padding: '4px',
    transition: 'color 0.15s',
  },

  // Modal
  overlay: {
    position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.5)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000, padding: '20px',
  },
  modal: {
    backgroundColor: 'white', borderRadius: '14px', padding: '1.75rem',
    maxWidth: '420px', width: '100%', boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
  },
  modalTitle: { fontSize: '1.15rem', fontWeight: '700', color: '#0f172a', marginBottom: '4px' },
  modalSub: { fontSize: '0.85rem', color: '#64748b', marginBottom: '20px' },
  field: { marginBottom: '14px' },
  label: { display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#334155', marginBottom: '6px' },
  input: {
    width: '100%', padding: '10px 12px', borderRadius: '8px',
    border: '1px solid #cbd5e1', fontSize: '0.9rem', fontFamily: 'inherit',
    outline: 'none', color: '#0f172a', boxSizing: 'border-box',
  },
  select: {
    width: '100%', padding: '10px 12px', borderRadius: '8px',
    border: '1px solid #cbd5e1', fontSize: '0.9rem', fontFamily: 'inherit',
    outline: 'none', color: '#0f172a', backgroundColor: 'white', boxSizing: 'border-box',
  },
  modalActions: { display: 'flex', gap: '10px', marginTop: '20px' },
  btnCancel: {
    flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1',
    backgroundColor: 'white', color: '#475569', fontFamily: 'inherit',
    fontWeight: '600', fontSize: '0.88rem', cursor: 'pointer',
  },
  btnSubmit: {
    flex: 1, padding: '10px', borderRadius: '8px', border: 'none',
    backgroundColor: '#1E3A8A', color: 'white', fontFamily: 'inherit',
    fontWeight: '600', fontSize: '0.88rem', cursor: 'pointer',
  },
  btnSubmitDisabled: { opacity: 0.5, cursor: 'not-allowed' },
  errorText: { color: '#dc2626', fontSize: '0.78rem', marginTop: '4px' },
};

const statusBadge = (status) => ({
  fontSize: '0.75rem', padding: '3px 10px', borderRadius: '20px', fontWeight: '600',
  backgroundColor: status === 'Active' ? '#d1fae5' : '#fff3cd',
  color: status === 'Active' ? '#065f46' : '#92400e',
});

const IP_REGEX = /^(\d{1,3}\.){3}\d{1,3}$/;

const Dashboard = () => {
  const navigate = useNavigate();
  const [networks, setNetworks] = useState(INITIAL_NETWORKS);
  const [hovered, setHovered] = useState(null);
  const [hoveredRemove, setHoveredRemove] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', device: DEVICE_OPTIONS[0], ip: '' });
  const [errors, setErrors] = useState({});

  const activeCount = networks.filter(n => n.status === 'Active').length;
  const warningCount = networks.filter(n => n.status === 'Warning').length;

  const STATS = [
    { label: 'Networks', value: String(networks.length), icon: '🖧' },
    { label: 'Active', value: String(activeCount), icon: '✅' },
    { label: 'Warnings', value: String(warningCount), icon: '⚠️' },
    { label: 'Wizard Sessions', value: '5', icon: '🧠' },
  ];

  const openModal = () => {
    setForm({ name: '', device: DEVICE_OPTIONS[0], ip: '' });
    setErrors({});
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Network name is required';
    if (form.ip.trim() && !IP_REGEX.test(form.ip.trim())) errs.ip = 'Enter a valid IP address (e.g. 192.168.1.1)';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    const newNetwork = {
      id: Date.now(),
      name: form.name.trim(),
      device: form.device,
      status: 'Active',
      ip: form.ip.trim() || '—',
      uptime: '0m',
    };
    setNetworks(prev => [...prev, newNetwork]);
    setModalOpen(false);
  };

  const removeNetwork = (id, e) => {
    e.stopPropagation();
    setNetworks(prev => prev.filter(n => n.id !== id));
  };

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
        {networks.map(net => (
          <div
            key={net.id}
            style={{ ...S.card, boxShadow: hovered === net.id ? '0 8px 24px rgba(0,0,0,0.1)' : S.card.boxShadow, transform: hovered === net.id ? 'translateY(-2px)' : 'none' }}
            onMouseEnter={() => setHovered(net.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => navigate('/wizard')}
          >
            <button
              style={{ ...S.removeBtn, color: hoveredRemove === net.id ? '#dc2626' : '#cbd5e1' }}
              onMouseEnter={() => setHoveredRemove(net.id)}
              onMouseLeave={() => setHoveredRemove(null)}
              onClick={(e) => removeNetwork(net.id, e)}
              title="Remove network"
            >
              ✕
            </button>
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

        {/* Add network */}
        <div
          style={{ ...S.card, border: '2px dashed #cbd5e1', boxShadow: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '130px', color: '#94a3b8', flexDirection: 'column', gap: '8px' }}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#2DD4BF'}
          onMouseLeave={e => e.currentTarget.style.borderColor = '#cbd5e1'}
          onClick={openModal}
        >
          <span style={{ fontSize: '1.5rem' }}>+</span>
          <span style={{ fontSize: '0.85rem' }}>Add network</span>
        </div>
      </div>

      {modalOpen && (
        <div style={S.overlay} onClick={closeModal}>
          <div style={S.modal} onClick={e => e.stopPropagation()}>
            <div style={S.modalTitle}>Add a Network</div>
            <div style={S.modalSub}>Register a new device to monitor and configure.</div>
            <form onSubmit={handleSubmit}>
              <div style={S.field}>
                <label style={S.label}>Network name</label>
                <input
                  style={S.input}
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Garage Workshop"
                  autoFocus
                />
                {errors.name && <div style={S.errorText}>{errors.name}</div>}
              </div>
              <div style={S.field}>
                <label style={S.label}>Device</label>
                <select
                  style={S.select}
                  value={form.device}
                  onChange={e => setForm(f => ({ ...f, device: e.target.value }))}
                >
                  {DEVICE_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div style={S.field}>
                <label style={S.label}>IP address (optional)</label>
                <input
                  style={S.input}
                  value={form.ip}
                  onChange={e => setForm(f => ({ ...f, ip: e.target.value }))}
                  placeholder="e.g. 192.168.1.1"
                />
                {errors.ip && <div style={S.errorText}>{errors.ip}</div>}
              </div>
              <div style={S.modalActions}>
                <button type="button" style={S.btnCancel} onClick={closeModal}>Cancel</button>
                <button
                  type="submit"
                  style={{ ...S.btnSubmit, ...(!form.name.trim() ? S.btnSubmitDisabled : {}) }}
                  disabled={!form.name.trim()}
                >
                  Add Network
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
