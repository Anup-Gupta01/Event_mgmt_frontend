import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Admin.css';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '', remember: false });
  const [showPass, setShowPass] = useState(false);
  const [status, setStatus] = useState(null); // null | 'loading' | 'error'
  const [errMsg, setErrMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    // Demo authentication: admin / admin123
    setTimeout(() => {
      if (form.username === 'admin' && form.password === 'admin123') {
        if (form.remember) {
          localStorage.setItem('isAdminAuthenticated', 'true');
        } else {
          sessionStorage.setItem('isAdminAuthenticated', 'true');
        }
        navigate('/admin/dashboard');
      } else {
        setStatus('error');
        setErrMsg('Invalid credentials. Use admin / admin123 for demo access.');
      }
    }, 1000);
  };

  return (
    <div className="al-page">
      <div className="al-orb al-orb--1" />
      <div className="al-orb al-orb--2" />

      <div className="al-card">
        {/* Brand */}
        <div className="al-brand">
          <div className="al-brand__icon">✦</div>
          <div>
            <div className="al-brand__name">Raj Mahal</div>
            <div className="al-brand__sub">Est. 1947 · Jaipur</div>
          </div>
        </div>

        {/* Header */}
        <div className="al-header">
          <div className="al-lock">🔐</div>
          <h1 className="al-title">Admin Portal</h1>
          <p className="al-sub">
            Restricted access. Authorised personnel only.<br />
            All activity is logged and monitored.
          </p>
        </div>

        {/* Error alert */}
        {status === 'error' && (
          <div className="al-alert al-alert--error" style={{ marginBottom: '1.25rem' }}>
            <span className="al-alert__icon">⚠</span>
            <span>{errMsg}</span>
          </div>
        )}

        {/* Form */}
        <form className="al-form" onSubmit={handleSubmit} noValidate>
          <div className="al-form-group">
            <label className="al-label" htmlFor="admin-username">Username</label>
            <div className="al-input-wrap">
              <input
                id="admin-username"
                type="text"
                className="al-input"
                placeholder="admin"
                autoComplete="username"
                value={form.username}
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
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

          <div className="al-row">
            <label className="al-remember">
              <input
                type="checkbox"
                checked={form.remember}
                onChange={e => setForm(f => ({ ...f, remember: e.target.checked }))}
              />
              <span>Stay signed in</span>
            </label>
            <a href="#" className="al-forgot">Forgot password?</a>
          </div>

          <button
            id="admin-login-btn"
            type="submit"
            className="al-btn-primary"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <><span className="al-spinner" /> Verifying…</>
            ) : 'Access Admin Portal →'}
          </button>
        </form>

        {/* Footer */}
        <div className="al-footer">
          <p className="al-footer__text">Not an admin?</p>
          <Link to="/login" className="al-footer__link">
            ← Go to Customer Login
          </Link>
        </div>
      </div>
    </div>
  );
}
