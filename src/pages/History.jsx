import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';

const FALLBACK_LOGS = [
  { id: 1, created_at: '2026-04-26', network: 'Home Lab', device: 'MikroTik RBD52G', issue: 'VLAN setup — Guest network isolation', status: 'Success', status_color: '#10B981' },
  { id: 2, created_at: '2026-04-26', network: 'Office Main', device: 'Ubiquiti UDM', issue: 'Firewall rules — Block inter-VLAN', status: 'CLI Ready', status_color: '#8B5CF6' },
  { id: 3, created_at: '2026-04-24', network: 'Small Cafe Wi-Fi', device: 'TP-Link EAP245', issue: 'Channel optimisation — 5GHz band', status: 'Success', status_color: '#10B981' },
  { id: 4, created_at: '2026-04-22', network: 'Home Lab', device: 'MikroTik RBD52G', issue: 'DHCP server configuration', status: 'Success', status_color: '#10B981' },
  { id: 5, created_at: '2026-04-20', network: 'Office Main', device: 'Ubiquiti UDM', issue: 'IDS/IPS policy review', status: 'In Review', status_color: '#F59E0B' },
];

const S = {
  page: { padding: '2rem', maxWidth: '1100px', margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' },
  title: { fontSize: '1.5rem', fontWeight: '700', color: '#0f172a', marginBottom: '4px' },
  sub: { fontSize: '0.9rem', color: '#64748b' },
  actions: { display: 'flex', gap: '10px' },
  btnOutline: {
    border: '1px solid #1E3A8A', color: '#1E3A8A', backgroundColor: 'transparent',
    padding: '8px 16px', borderRadius: '8px', cursor: 'pointer',
    fontFamily: 'inherit', fontWeight: '600', fontSize: '0.85rem', transition: 'all 0.15s',
  },
  btnPrimary: {
    backgroundColor: '#1E3A8A', color: 'white', border: 'none',
    padding: '8px 16px', borderRadius: '8px', cursor: 'pointer',
    fontFamily: 'inherit', fontWeight: '600', fontSize: '0.85rem', transition: 'opacity 0.15s',
  },
  table: { width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' },
  th: { padding: '14px 16px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: '600', backgroundColor: '#f8fafc' },
  td: { padding: '14px 16px', borderBottom: '1px solid #f1f5f9', fontSize: '0.87rem', color: '#334155', verticalAlign: 'middle' },
  tdDate: { fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'monospace' },
  networkName: { fontWeight: '600', color: '#0f172a' },
  deviceName: { fontSize: '0.78rem', color: '#94a3b8' },
  badge: (color) => ({ backgroundColor: color + '1a', color, padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', display: 'inline-block' }),
  loadingText: { color: '#64748b', fontSize: '0.9rem', padding: '2rem', textAlign: 'center' },
  emptyText: { color: '#94a3b8', fontSize: '0.9rem', padding: '3rem', textAlign: 'center' },
};

const History = () => {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const load = async () => {
      if (supabase) {
        const { data, error } = await supabase
          .from('sessions')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          setLogs(data);
          setLoading(false);
          return;
        }
      }
      setLogs(FALLBACK_LOGS);
      setLoading(false);
    };
    load();
  }, []);

  const formatDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  const downloadCSV = () => {
    const headers = ['Date', 'Network', 'Device', 'Issue', 'Status'];
    const rows = logs.map(log => [
      formatDate(log.created_at), log.network, log.device, log.issue, log.status,
    ]);
    const escapeCell = (cell) => {
      const str = String(cell);
      return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
    };
    const csv = [headers, ...rows].map(row => row.map(escapeCell).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `netwizard-history-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={S.page}>
      <div style={S.header}>
        <div>
          <div style={S.title}>Project Log History</div>
          <div style={S.sub}>{logs.length} wizard session{logs.length !== 1 ? 's' : ''} recorded</div>
        </div>
        <div style={S.actions}>
          <button style={S.btnOutline} onClick={downloadCSV}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#f0f4ff'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
            ↓ Download All
          </button>
          <button style={S.btnPrimary} onClick={() => navigate('/wizard')}
            onMouseOver={e => e.currentTarget.style.opacity = '0.85'}
            onMouseOut={e => e.currentTarget.style.opacity = '1'}>
            + New Session
          </button>
        </div>
      </div>

      {loading ? (
        <div style={S.loadingText}>Loading history…</div>
      ) : logs.length === 0 ? (
        <div style={S.emptyText}>No sessions yet — start a conversation in the Wizard to log your first one.</div>
      ) : (
        <table style={S.table}>
          <thead>
            <tr>
              <th style={S.th}>Date</th>
              <th style={S.th}>Network</th>
              <th style={S.th}>Issue</th>
              <th style={S.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}
                style={{ backgroundColor: hovered === log.id ? '#f8fafc' : 'white', cursor: 'pointer' }}
                onMouseEnter={() => setHovered(log.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => navigate('/wizard')}
              >
                <td style={{ ...S.td, ...S.tdDate }}>{formatDate(log.created_at)}</td>
                <td style={S.td}>
                  <div style={S.networkName}>{log.network}</div>
                  <div style={S.deviceName}>{log.device}</div>
                </td>
                <td style={{ ...S.td, color: '#475569' }}>{log.issue}</td>
                <td style={S.td}>
                  <span style={S.badge(log.status_color)}>{log.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default History;
