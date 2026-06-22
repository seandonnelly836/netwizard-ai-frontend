import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabase';

const TYPES = ['Bug', 'Suggestion', 'Question'];

const S = {
  btn: {
    position: 'fixed', bottom: '24px', right: '24px', zIndex: 900,
    backgroundColor: '#1E3A8A', color: 'white', border: 'none',
    padding: '10px 18px', borderRadius: '24px', cursor: 'pointer',
    fontFamily: 'inherit', fontWeight: '600', fontSize: '0.85rem',
    boxShadow: '0 4px 14px rgba(30,58,138,0.35)',
    display: 'flex', alignItems: 'center', gap: '6px',
    transition: 'opacity 0.15s, transform 0.15s',
  },
  overlay: {
    position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.4)',
    zIndex: 1000, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end',
    padding: '24px',
  },
  modal: {
    backgroundColor: 'white', borderRadius: '14px', padding: '1.5rem',
    width: '100%', maxWidth: '360px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
    border: '1px solid #e2e8f0',
  },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
  title: { fontSize: '1rem', fontWeight: '700', color: '#0f172a' },
  closeBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '1.1rem', padding: '2px' },
  field: { marginBottom: '12px' },
  label: { display: 'block', fontSize: '0.78rem', fontWeight: '600', color: '#334155', marginBottom: '5px' },
  select: {
    width: '100%', padding: '9px 12px', borderRadius: '8px',
    border: '1px solid #cbd5e1', fontSize: '0.88rem', fontFamily: 'inherit',
    outline: 'none', backgroundColor: 'white', color: '#0f172a', boxSizing: 'border-box',
  },
  textarea: {
    width: '100%', padding: '9px 12px', borderRadius: '8px',
    border: '1px solid #cbd5e1', fontSize: '0.88rem', fontFamily: 'inherit',
    outline: 'none', color: '#0f172a', resize: 'vertical',
    minHeight: '90px', boxSizing: 'border-box', lineHeight: '1.5',
  },
  submitBtn: {
    width: '100%', padding: '10px', borderRadius: '8px', border: 'none',
    backgroundColor: '#1E3A8A', color: 'white', fontFamily: 'inherit',
    fontWeight: '600', fontSize: '0.88rem', cursor: 'pointer', transition: 'opacity 0.15s',
  },
  submitDisabled: { opacity: 0.5, cursor: 'not-allowed' },
  thanks: { textAlign: 'center', padding: '1rem 0', color: '#0f172a' },
  thanksIcon: { fontSize: '2rem', marginBottom: '8px' },
  thanksText: { fontWeight: '700', fontSize: '1rem', marginBottom: '4px' },
  thanksSub: { fontSize: '0.85rem', color: '#64748b' },
};

const FeedbackWidget = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('Suggestion');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setLoading(true);

    try {
      await supabase.from('feedback').insert({
        user_id: user.id,
        message: message.trim(),
        type,
      });
      setSubmitted(true);
      setTimeout(() => {
        setOpen(false);
        setSubmitted(false);
        setMessage('');
        setType('Suggestion');
      }, 2000);
    } catch (err) {
      console.error('Feedback error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        style={S.btn}
        onClick={() => setOpen(true)}
        onMouseOver={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
        onMouseOut={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none'; }}
      >
        💬 Feedback
      </button>

      {open && (
        <div style={S.overlay} onClick={() => setOpen(false)}>
          <div style={S.modal} onClick={e => e.stopPropagation()}>
            {submitted ? (
              <div style={S.thanks}>
                <div style={S.thanksIcon}>🎉</div>
                <div style={S.thanksText}>Thanks for the feedback!</div>
                <div style={S.thanksSub}>We'll use it to improve NetWizard AI.</div>
              </div>
            ) : (
              <>
                <div style={S.header}>
                  <div style={S.title}>Share feedback</div>
                  <button style={S.closeBtn} onClick={() => setOpen(false)}>✕</button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div style={S.field}>
                    <label style={S.label}>Type</label>
                    <select style={S.select} value={type} onChange={e => setType(e.target.value)}>
                      {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div style={S.field}>
                    <label style={S.label}>Message</label>
                    <textarea
                      style={S.textarea}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="What's on your mind?"
                      autoFocus
                      onFocus={e => e.target.style.borderColor = '#1E3A8A'}
                      onBlur={e => e.target.style.borderColor = '#cbd5e1'}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{ ...S.submitBtn, ...(!message.trim() || loading ? S.submitDisabled : {}) }}
                    disabled={!message.trim() || loading}
                    onMouseOver={e => { if (message.trim() && !loading) e.currentTarget.style.opacity = '0.85'; }}
                    onMouseOut={e => { e.currentTarget.style.opacity = '1'; }}
                  >
                    {loading ? 'Sending…' : 'Send Feedback'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackWidget;
