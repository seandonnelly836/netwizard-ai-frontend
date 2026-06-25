import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../navbar.css';

const S = {
  nav: {
    backgroundColor: '#1E3A8A', color: 'white', padding: '0 1rem',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    height: '60px', boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    position: 'sticky', top: 0, zIndex: 100, gap: '8px',
  },
  logo: { fontWeight: '800', fontSize: '1.1rem', letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 },
  logoAccent: { color: '#2DD4BF' },
  links: { display: 'flex', gap: '2px', flexShrink: 0 },
  link: { color: 'rgba(255,255,255,0.7)', textDecoration: 'none', padding: '6px 10px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: '500', transition: 'all 0.15s', whiteSpace: 'nowrap' },
  activeLink: { color: 'white', backgroundColor: 'rgba(45,212,191,0.15)', borderBottom: '2px solid #2DD4BF' },
  right: { display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 },
  avatar: {
    width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
    backgroundColor: '#2DD4BF', color: '#1E3A8A', fontWeight: '700',
    fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
  },
};

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await signOut();
    navigate('/login');
  };

  const initial = user?.email?.[0]?.toUpperCase() || 'U';

  return (
    <nav style={S.nav}>
      <div style={S.logo}>
        <span style={S.logoAccent}>⬡</span> NetWizard <span style={S.logoAccent}>AI</span>
      </div>

      {user && (
        <div style={S.links}>
          {[{ to: '/', label: 'Dashboard' }, { to: '/wizard', label: 'Wizard' }, { to: '/history', label: 'History' }].map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'}
              style={({ isActive }) => ({ ...S.link, ...(isActive ? S.activeLink : {}) })}>
              {label}
            </NavLink>
          ))}
        </div>
      )}

      {user ? (
        <div style={S.right}>
          <div style={S.avatar} title={user.email}>{initial}</div>
          <button className="nav-logout" onClick={handleLogout} disabled={loggingOut}>
            <span className="nav-logout-text">{loggingOut ? '…' : 'Sign out'}</span>
            {loggingOut ? '' : ''}
          </button>
        </div>
      ) : (
        <div style={S.right} />
      )}
    </nav>
  );
};

export default Navbar;
