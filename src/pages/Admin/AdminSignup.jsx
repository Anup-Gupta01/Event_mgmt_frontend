import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import './Admin.css';

export default function AdminSignup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirm: '', inviteCode: '',
  });
  const [showPass, setShowPass] = useState(false);
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setStatus('error');
      setMessage('Passwords do not match.');
      return;
    }
    if (form.password.length < 6) {
      setStatus('error');
      setMessage('Password must be at least 6 characters.');
      return;
    }
    setStatus('loading');
    setMessage('');

    try {
      const res = await api.post('/api/auth/admin-register', {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        inviteCode: form.inviteCode,
      });
      const data = res.data;
      if (!data.success) throw new Error(data.message || 'Registration failed');

      login(data); // store token + user
      setStatus('success');
      setMessage('Admin account created! Redirecting to dashboard�');
      setTimeout(() => navigate('/admin/dashboard', { replace: true }), 1200);
    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.message || err.message || 'Registration failed. Please check your invite code.');
    }
  };

  return (
    <div className="al-page">
      <div className="al-orb al-orb--1" />
      <div className="al-orb al-orb--2" />

      <div className="al-card" style={{ maxWidth: '480px' }}>
        {/* Brand */}
        <div className="al-brand">
          <div className="al-brand__icon">?</div>
          <div>
            <div className="al-brand__name">Eventora</div>
            <div className="al-brand__sub">Est. 1947 � Jaipur</div>
          </div>
        </div>

        {/* Header */}
        <div className="al-header">
          <div className="al-lock">???</div>
          <h1 className="al-title">Create Admin Account</h1>
          <p className="al-sub">
            An invite code is required to register an admin account.<br />
            Contact your system administrator for access.
          </p>
        </div>

        {/* Status alerts */}
        {status === 'success' && (
          <div className="al-alert al-alert--success" style={{ marginBottom: '1.25rem' }}>
            <span className="al-alert__icon">?</span>
            <span>{message}</span>
          </div>
        )}
        {status === 'error' && (
          <div className="al-alert al-alert--error" style={{ marginBottom: '1.25rem' }}>
            <span className="al-alert__icon">?</span>
            <span>{message}</span>
          </div>
        )}

        {/* Form */}
        <form className="al-form" onSubmit={handleSubmit} noValidate>
          {/* Name + Phone row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="al-form-group">
              <label className="al-label" htmlFor="signup-name">Full Name *</label>
              <input
                id="signup-name"
                type="text"
                className="al-input"
                placeholder="Your full name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
            </div>
            <div className="al-form-group">
              <label className="al-label" htmlFor="signup-phone">Phone</label>
              <input
                id="signup-phone"
                type="tel"
                className="al-input"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              />
            </div>
          </div>

          <div className="al-form-group">
            <label className="al-label" htmlFor="signup-email">Email Address *</label>
            <input
              id="signup-email"
              type="email"
              className="al-input"
              placeholder="admin@rajmahal.com"
              autoComplete="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
            />
          </div>

          {/* Password + Confirm row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="al-form-group">
              <label className="al-label" htmlFor="signup-pass">Password *</label>
              <div className="al-input-wrap">
                <input
                  id="signup-pass"
                  type={showPass ? 'text' : 'password'}
                  className="al-input"
                  placeholder="Min. 6 chars"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  required
                  style={{ paddingRight: '40px' }}
                />
                <button
                  type="button"
                  className="al-eye"
                  onClick={() => setShowPass(!showPass)}
                  aria-label="Toggle password"
                >
                  {showPass ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="al-form-group">
              <label className="al-label" htmlFor="signup-confirm">Confirm Password *</label>
              <input
                id="signup-confirm"
                type={showPass ? 'text' : 'password'}
                className="al-input"
                placeholder="Repeat password"
                value={form.confirm}
                onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
                required
              />
            </div>
          </div>

          {/* Invite code */}
          <div className="al-form-group">
            <label className="al-label" htmlFor="signup-invite">
              Admin Invite Code *
              <span style={{ marginLeft: '0.5rem', fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)', fontWeight: 400 }}>
                (provided by your system administrator)
              </span>
            </label>
            <input
              id="signup-invite"
              type="text"
              className="al-input"
              placeholder="Enter invite code"
              value={form.inviteCode}
              onChange={e => setForm(f => ({ ...f, inviteCode: e.target.value }))}
              required
              style={{ letterSpacing: '0.1em', fontFamily: 'monospace', fontSize: '0.95rem' }}
            />
          </div>

          <button
            id="admin-signup-btn"
            type="submit"
            className="al-btn-primary"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <><span className="al-spinner" /> Creating account�</>
            ) : 'Create Admin Account ?'}
          </button>
        </form>

        {/* Footer */}
        <div className="al-footer">
          <p className="al-footer__text">Already have an admin account?</p>
          <Link to="/admin/login" className="al-footer__link">? Back to Admin Login</Link>
        </div>
      </div>
    </div>
  );
}
