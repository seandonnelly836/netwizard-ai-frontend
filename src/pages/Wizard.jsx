import React, { useState, useRef, useEffect } from 'react';
import { sendMessage } from '../services/api';

const WELCOME = "Hello Sean! I'm NetWizard AI. Describe your network issue or configuration task and I'll walk you through it step by step.";

const S = {
  page: { padding: '1.5rem', display: 'flex', justifyContent: 'center' },
  wrap: { width: '100%', maxWidth: '780px' },
  card: {
    backgroundColor: 'white', borderRadius: '14px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)', overflow: 'hidden',
    border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 140px)',
  },
  header: {
    backgroundColor: '#1E3A8A', color: 'white', padding: '14px 20px',
    display: 'flex', alignItems: 'center', gap: '10px',
  },
  headerIcon: { fontSize: '1.2rem' },
  headerTitle: { fontWeight: '700', fontSize: '1rem' },
  headerSub: { fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)', marginTop: '1px' },
  onlineDot: { width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2DD4BF', marginLeft: 'auto', boxShadow: '0 0 6px #2DD4BF' },
  messages: { flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', backgroundColor: '#f8fafc' },
  bubbleAI: {
    alignSelf: 'flex-start', backgroundColor: 'white', padding: '12px 16px',
    borderRadius: '4px 14px 14px 14px', maxWidth: '82%', fontSize: '0.88rem',
    lineHeight: '1.6', border: '1px solid #e2e8f0', color: '#0f172a',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  },
  bubbleUser: {
    alignSelf: 'flex-end', backgroundColor: '#1E3A8A', color: 'white',
    padding: '12px 16px', borderRadius: '14px 4px 14px 14px',
    maxWidth: '82%', fontSize: '0.88rem', lineHeight: '1.6',
  },
  bubbleLoading: {
    alignSelf: 'flex-start', backgroundColor: 'white', padding: '12px 16px',
    borderRadius: '4px 14px 14px 14px', border: '1px solid #e2e8f0',
    color: '#94a3b8', fontSize: '0.85rem', fontStyle: 'italic',
  },
  inputRow: {
    padding: '14px 16px', borderTop: '1px solid #e2e8f0',
    display: 'flex', gap: '10px', backgroundColor: 'white', alignItems: 'flex-end',
  },
  textarea: {
    flex: 1, padding: '10px 14px', borderRadius: '8px',
    border: '1px solid #cbd5e1', fontFamily: 'inherit', fontSize: '0.9rem',
    resize: 'none', minHeight: '42px', maxHeight: '120px', outline: 'none',
    lineHeight: '1.5', color: '#0f172a',
  },
  sendBtn: {
    backgroundColor: '#1E3A8A', color: 'white', border: 'none',
    width: '42px', height: '42px', borderRadius: '8px',
    cursor: 'pointer', fontSize: '1rem', display: 'flex',
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    transition: 'opacity 0.15s',
  },
  sendBtnDisabled: { opacity: 0.5, cursor: 'not-allowed' },
  quickPrompts: { display: 'flex', gap: '8px', padding: '0 16px 12px', flexWrap: 'wrap' },
  chip: {
    fontSize: '0.75rem', padding: '5px 12px', borderRadius: '20px',
    border: '1px solid #cbd5e1', backgroundColor: 'white', cursor: 'pointer',
    color: '#475569', fontFamily: 'inherit', transition: 'all 0.15s',
  },
};

// Minimal markdown renderer for code blocks and bold
function renderMarkdown(text) {
  const parts = text.split(/(```[\s\S]*?```)/g);
  return parts.map((part, i) => {
    if (part.startsWith('```')) {
      const lines = part.slice(3, -3).split('\n');
      const lang = lines[0].trim();
      const code = lines.slice(1).join('\n');
      return (
        <pre key={i} style={{ background: '#0f172a', color: '#e2e8f0', padding: '12px 14px', borderRadius: '8px', fontSize: '0.8rem', overflowX: 'auto', margin: '8px 0', lineHeight: '1.6' }}>
          {lang && <div style={{ color: '#2DD4BF', fontSize: '0.7rem', marginBottom: '6px', fontFamily: 'monospace' }}>{lang}</div>}
          <code>{code}</code>
        </pre>
      );
    }
    // bold
    const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
    return (
      <span key={i}>
        {boldParts.map((bp, j) =>
          bp.startsWith('**') ? <strong key={j}>{bp.slice(2, -2)}</strong> : bp
        )}
      </span>
    );
  });
}

const QUICK_PROMPTS = [
  'Set up Guest VLAN on MikroTik',
  'Configure firewall rules on UDM',
  'Optimise Wi-Fi channels EAP245',
  'Enable DHCP on RouterOS',
];

const Wizard = () => {
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]); // API history [{role, content}]
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;
    setInput('');

    const newHistory = [...history, { role: 'user', content: userText }];
    setHistory(newHistory);
    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    setLoading(true);

    try {
      const reply = await sendMessage(newHistory);
      setHistory(h => [...h, { role: 'assistant', content: reply }]);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: `⚠️ Error: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div style={S.page}>
      <div style={S.wrap}>
        <div style={S.card}>
          <div style={S.header}>
            <span style={S.headerIcon}>⬡</span>
            <div>
              <div style={S.headerTitle}>NetWizard AI Assistant</div>
              <div style={S.headerSub}>Network configuration · Powered by Claude</div>
            </div>
            <div style={S.onlineDot} />
          </div>

          <div style={S.messages}>
            <div style={S.bubbleAI}>{WELCOME}</div>
            {messages.map((m, i) => (
              <div key={i} style={m.role === 'user' ? S.bubbleUser : S.bubbleAI}>
                {m.role === 'assistant' ? renderMarkdown(m.content) : m.content}
              </div>
            ))}
            {loading && <div style={S.bubbleLoading}>NetWizard is thinking…</div>}
            <div ref={bottomRef} />
          </div>

          {messages.length === 0 && (
            <div style={S.quickPrompts}>
              {QUICK_PROMPTS.map((q, i) => (
                <button
                  key={i}
                  style={S.chip}
                  onClick={() => send(q)}
                  onMouseOver={e => { e.currentTarget.style.borderColor = '#2DD4BF'; e.currentTarget.style.color = '#1E3A8A'; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.color = '#475569'; }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <div style={S.inputRow}>
            <textarea
              ref={textareaRef}
              style={S.textarea}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Describe your network issue… (Enter to send, Shift+Enter for new line)"
              rows={1}
            />
            <button
              style={{ ...S.sendBtn, ...((!input.trim() || loading) ? S.sendBtnDisabled : {}) }}
              onClick={() => send()}
              disabled={!input.trim() || loading}
              onMouseOver={e => { if (!e.currentTarget.disabled) e.currentTarget.style.opacity = '0.85'; }}
              onMouseOut={e => { if (!e.currentTarget.disabled) e.currentTarget.style.opacity = '1'; }}
            >
              ↑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wizard;
