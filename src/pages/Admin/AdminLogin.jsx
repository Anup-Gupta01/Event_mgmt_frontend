import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import './Admin.css';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, isAdmin } = useAuth();

  // Redirect if already logged in as admin
  if (isAdmin) {
    navigate('/admin/dashboard', { replace: true });
  }

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [status, setStatus] = useState(null); // null | 'loading' | 'error'
  const [errMsg, setErrMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrMsg('');

    try {
      const res = await api.post('/api/auth/login', {
        email: form.email,
        password: form.password,
      });
      const data = res.data;

      if (!data.success) throw new Error(data.message || 'Login failed');

      // Verify admin role
      if (data.user.role !== 'admin') {
        setStatus('error');
        setErrMsg('Access denied. This portal is for administrators only.');
        return;
      }

      login(data); // store token + user
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setStatus('error');
      setErrMsg(err.response?.data?.message || err.message || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="al-page">
      <div className="al-orb al-orb--1" />
      <div className="al-orb al-orb--2" />

      <div className="al-card">
        {/* Brand */}
        <div className="al-brand">
          <div className="al-brand__icon">?</div>
          <div>
            <div className="al-brand__name">Raj Mahal</div>
            <div className="al-brand__sub">Est. 1947 · Jaipur</div>
          </div>
        </div>

        {/* Header */}
        <div className="al-header">
          <div className="al-lock">??</div>
          <h1 className="al-title">Admin Portal</h1>
          <p className="al-sub">
            Restricted access. Authorised personnel only.<br />
            All activity is logged and monitored.
          </p>
        </div>

        {/* Error alert */}
        {status === 'error' && (
          <div className="al-alert al-alert--error" style={{ marginBottom: '1.25rem' }}>
            <span className="al-alert__icon">?</span>
            <span>{errMsg}</span>
          </div>
        )}

        {/* Form */}
        <form className="al-form" onSubmit={handleSubmit} noValidate>
          <div className="al-form-group">
            <label className="al-label" htmlFor="admin-email">Email Address</label>
            <div className="al-input-wrap">
              <input
                id="admin-email"
                type="email"
                className="al-input"
                placeholder="admin@rajmahal.com"
                autoComplete="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="al-form-group">
            <label className="al-label" htmlFor="admin-password">Password</label>
            <div className="al-input-wrap">
              <input
                id="admin-password"
                type={showPass ? 'text' : 'password'}
                className="al-input"
                placeholder="••••••••"
                autoComplete="current-password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                required
                style={{ paddingRight: '40px' }}
              />
              <button
                type="button"
                className="al-eye"
                onClick={() => setShowPass(!showPass)}
                aria-label={showPass ? 'Hide password' : 'Show password'}
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

          <button
            id="admin-login-btn"
            type="submit"
            className="al-btn-primary"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <><span className="al-spinner" /> Verifying…</>
            ) : 'Access Admin Portal ?'}
          </button>
        </form>

        {/* Footer */}
        <div className="al-footer">
          <p className="al-footer__text">Not an admin?</p>
          <Link to="/login" className="al-footer__link">? Go to Customer Login</Link>
          <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <Link to="/admin/signup" className="al-footer__link" style={{ fontSize: '0.8rem', opacity: 0.7 }}>
              + Register new admin account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
