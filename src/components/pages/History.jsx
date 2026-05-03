import React from 'react';

const History = () => {
  const logs = [
    { date: '24/04/26', network: 'Home Lab', issue: 'VLAN setup', status: 'Success', color: '#10B981' },
    { date: '24/04/26', network: 'Office Main', issue: 'CLI Config', status: 'CLI Ready', color: '#8B5CF6' },
  ];

  return (
    <div style={{ padding: '20px', backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>Project Log History</h2>
        <button style={{ border: '1px solid #1E3A8A', padding: '5px 15px', borderRadius: '5px' }}>Download All</button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #edf2f7' }}>
            <th style={{ padding: '15px' }}>Date</th>
            <th>Network</th>
            <th>Issue</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #edf2f7' }}>
              <td style={{ padding: '15px' }}>{log.date}</td>
              <td>{log.network}</td>
              <td>{log.issue}</td>
              <td>
                <span style={{ backgroundColor: log.color, color: 'white', padding: '2px 10px', borderRadius: '12px', fontSize: '0.8rem' }}>
                  {log.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;