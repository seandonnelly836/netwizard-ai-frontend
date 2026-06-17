import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const S = {
  page: {
    minHeight: '100vh', display: 'flex', alignItems: 'center',
    justifyContent: 'center', backgroundColor: '#F8FAFC', padding: '20px',
  },
  card: {
    backgroundColor: 'white', borderRadius: '16px', padding: '2.5rem',
    width: '100%', maxWidth: '400px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
    border: '1px solid #e2e8f0',
  },
  logo: {
    display: 'flex', alignItems: 'center', gap: '8px',
    fontWeight: '800', fontSize: '1.4rem', color: '#1E3A8A',
    marginBottom: '8px',
  },
  logoAccent: { color: '#2DD4BF' },
  subtitle: { fontSize: '0.9rem', color: '#64748b', marginBottom: '2rem' },
  tabs: { display: 'flex', gap: '0', marginBottom: '1.5rem', borderBottom: '2px solid #e2e8f0' },
  tab: (active) => ({
    flex: 1, padding: '10px', border: 'none', backgroundColor: 'transparent',
    fontFamily: 'inherit', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer',
    color: active ? '#1E3A8A' : '#94a3b8',
    borderBottom: active ? '2px solid #1E3A8A' : '2px solid transparent',
    marginBottom: '-2px', transition: 'all 0.15s',
  }),
  field: { marginBottom: '14px' },
  label: { display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#334155', marginBottom: '6px' },
  input: {
    width: '100%', padding: '11px 14px', borderRadius: '8px',
    border: '1px solid #cbd5e1', fontSize: '0.9rem', fontFamily: 'inherit',
    outline: 'none', color: '#0f172a', boxSizing: 'border-box', transition: 'border-color 0.15s',
  },
  btn: {
    width: '100%', padding: '12px', borderRadius: '8px', border: 'none',
    backgroundColor: '#1E3A8A', color: 'white', fontFamily: 'inherit',
    fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer',
    marginTop: '8px', transition: 'opacity 0.15s',
    boxShadow: '0 2px 8px rgba(30,58,138,0.3)',
  },
  btnDisabled: { opacity: 0.6, cursor: 'not-allowed' },
  error: {
    backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626',
    padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '14px',
  },
  success: {
    backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a',
    padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '14px',
  },
};

const Login = () => {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const { error } = await signIn(email, password);
        if (error) throw error;
        navigate('/');
      } else {
        const { error } = await signUp(email, password);
        if (error) throw error;
        setSuccess('Account created! Check your email to confirm, then sign in.');
        setMode('login');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={S.page}>
      <div style={S.card}>
        <div style={S.logo}>
          <span style={S.logoAccent}>⬡</span> NetWizard <span style={S.logoAccent}>AI</span>
        </div>
        <div style={S.subtitle}>Network configuration, powered by Claude</div>

        <div style={S.tabs}>
          <button style={S.tab(mode === 'login')} onClick={() => { setMode('login'); setError(''); setSuccess(''); }}>Sign In</button>
          <button style={S.tab(mode === 'signup')} onClick={() => { setMode('signup'); setError(''); setSuccess(''); }}>Create Account</button>
        </div>

        {error && <div style={S.error}>{error}</div>}
        {success && <div style={S.success}>{success}</div>}

        <form onSubmit={handleSubmit}>
          <div style={S.field}>
            <label style={S.label}>Email</label>
            <input
              style={S.input}
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoFocus
              required
              onFocus={e => e.target.style.borderColor = '#1E3A8A'}
              onBlur={e => e.target.style.borderColor = '#cbd5e1'}
            />
          </div>
          <div style={S.field}>
            <label style={S.label}>Password</label>
            <input
              style={S.input}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="minimum 6 characters"
              required
              onFocus={e => e.target.style.borderColor = '#1E3A8A'}
              onBlur={e => e.target.style.borderColor = '#cbd5e1'}
            />
          </div>
          <button
            type="submit"
            style={{ ...S.btn, ...(loading ? S.btnDisabled : {}) }}
            disabled={loading}
            onMouseOver={e => { if (!loading) e.currentTarget.style.opacity = '0.85'; }}
            onMouseOut={e => { e.currentTarget.style.opacity = '1'; }}
          >
            {loading ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
