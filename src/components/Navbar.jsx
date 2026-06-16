import React from 'react';
import { NavLink } from 'react-router-dom';

const S = {
  nav: {
    backgroundColor: '#1E3A8A',
    color: 'white',
    padding: '0 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '60px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontWeight: '800',
    fontSize: '1.25rem',
    letterSpacing: '-0.5px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  logoAccent: { color: '#2DD4BF' },
  links: { display: 'flex', gap: '4px' },
  link: {
    color: 'rgba(255,255,255,0.7)',
    textDecoration: 'none',
    padding: '6px 14px',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.15s',
  },
  activeLink: {
    color: 'white',
    backgroundColor: 'rgba(45,212,191,0.15)',
    borderBottom: '2px solid #2DD4BF',
  },
  welcome: {
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.75)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  avatar: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: '#2DD4BF',
    color: '#1E3A8A',
    fontWeight: '700',
    fontSize: '0.8rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const Navbar = () => (
  <nav style={S.nav}>
    <div style={S.logo}>
      <span style={S.logoAccent}>⬡</span> NetWizard <span style={S.logoAccent}>AI</span>
    </div>
    <div style={S.links}>
      {[
        { to: '/', label: 'Dashboard' },
        { to: '/wizard', label: 'Wizard' },
        { to: '/history', label: 'History' },
      ].map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          style={({ isActive }) => ({ ...S.link, ...(isActive ? S.activeLink : {}) })}
        >
          {label}
        </NavLink>
      ))}
    </div>
    <div style={S.welcome}>
      <span>Sean</span>
      <div style={S.avatar}>S</div>
    </div>
  </nav>
);

export default Navbar;
