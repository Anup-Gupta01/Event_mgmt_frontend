import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [tab, setTab] = useState('login');
  const [loginForm, setLoginForm] = useState({ email: '', password: '', remember: false });
  const [regForm, setRegForm]     = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [showRegPass, setShowRegPass]     = useState(false);
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    try {
      const res = await api.post('/api/auth/login', {
        email: loginForm.email,
        password: loginForm.password,
      });
      const data = res.data;
      if (!data.success) throw new Error(data.message || 'Login failed');

      // Block admin accounts from customer portal
      if (data.user.role === 'admin') {
        setStatus('error');
        setMessage('Admin accounts must use the Admin Portal to log in.');
        return;
      }

      login(data); // stores token + user in context + localStorage
      setStatus('success');
      setMessage('Welcome back! Redirecting to your portal…');
      setTimeout(() => navigate('/my-bookings'), 1000);
    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.message || err.message || 'Login failed. Please try again.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (regForm.password !== regForm.confirm) {
      setStatus('error');
      setMessage('Passwords do not match. Please try again.');
      return;
    }
    setStatus('loading');
    setMessage('');
    try {
      const res = await api.post('/api/auth/register', {
        name: regForm.name,
        email: regForm.email,
        phone: regForm.phone,
        password: regForm.password,
      });
      const data = res.data;
      if (!data.success) throw new Error(data.message || 'Registration failed');

      login(data); // auto-login after registration
      setStatus('success');
      setMessage('Account created! Redirecting to your portal…');
      setTimeout(() => navigate('/my-bookings'), 1000);
    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.message || err.message || 'Registration failed. Please try again.');
    }
  };

  const switchTab = (t) => { setTab(t); setStatus(null); setMessage(''); };

  return (
    <div className="lp-page">
      {/* Decorative background orbs */}
      <div className="lp-orb lp-orb--1" />
      <div className="lp-orb lp-orb--2" />

      <div className="lp-card">
        {/* Card header — logo + title */}
        <div className="lp-header">
          <Link to="/" className="lp-logo">
            <span className="lp-logo__icon">?</span>
            <div>
              <div className="lp-logo__name">Raj Mahal</div>
              <div className="lp-logo__sub">Est. 1947 · Jaipur</div>
            </div>
          </Link>
          <div className="lp-divider" />
          <h1 className="lp-portal-title">Client Portal</h1>
          <p className="lp-portal-sub">Manage your events, track bookings, download proposals</p>
        </div>

        {/* Tabs */}
        <div className="lp-tabs" role="tablist">
          <button
            id="tab-signin"
            role="tab"
            aria-selected={tab === 'login'}
            className={`lp-tab ${tab === 'login' ? 'lp-tab--active' : ''}`}
            onClick={() => switchTab('login')}
          >
            Sign In
          </button>
          <button
            id="tab-register"
            role="tab"
            aria-selected={tab === 'register'}
            className={`lp-tab ${tab === 'register' ? 'lp-tab--active' : ''}`}
            onClick={() => switchTab('register')}
          >
            Create Account
          </button>
        </div>

        {/* Alert messages */}
        {status === 'success' && (
          <div className="lp-alert lp-alert--success">
            <span className="lp-alert__icon">?</span>
            <span>{message}</span>
          </div>
        )}
        {status === 'error' && (
          <div className="lp-alert lp-alert--error">
            <span className="lp-alert__icon">?</span>
            <span>{message}</span>
          </div>
        )}

        {/* -- Sign In Form -- */}
        {tab === 'login' && (
          <form className="lp-form" onSubmit={handleLogin} noValidate>
            <div className="form-group">
              <label className="form-label lp-form__label" htmlFor="login-email">Email Address</label>
              <input
                id="login-email"
                type="email"
                className="form-input lp-input"
                placeholder="you@example.com"
                value={loginForm.email}
                onChange={(e) => setLoginForm(f => ({ ...f, email: e.target.value }))}
                required
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label className="form-label lp-form__label" htmlFor="login-pass">
                Password
                <a href="#" className="lp-forgot">Forgot password?</a>
              </label>
              <div className="lp-input-wrap">
                <input
                  id="login-pass"
                  type={showLoginPass ? 'text' : 'password'}
                  className="form-input lp-input"
                  placeholder="••••••••"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(f => ({ ...f, password: e.target.value }))}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="lp-eye"
                  onClick={() => setShowLoginPass(!showLoginPass)}
                  aria-label={showLoginPass ? 'Hide password' : 'Show password'}
                >
                  {showLoginPass ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
            </div>

            <label className="lp-remember">
              <input
                type="checkbox"
                checked={loginForm.remember}
                onChange={(e) => setLoginForm(f => ({ ...f, remember: e.target.checked }))}
              />
              <span>Remember me for 30 days</span>
            </label>

            <button
              id="login-submit-btn"
              type="submit"
              className="lp-btn-primary"
              disabled={status === 'loading'}
            >
              {status === 'loading' && tab === 'login' ? (
                <><span className="lp-spinner" /> Signing in…</>
              ) : 'Sign In ?'}
            </button>

            <p className="lp-switch">
              Don't have an account?{' '}
              <button type="button" className="lp-switch__link" onClick={() => switchTab('register')}>
                Create one free
              </button>
            </p>
          </form>
        )}

        {/* -- Register Form -- */}
        {tab === 'register' && (
          <form className="lp-form" onSubmit={handleRegister} noValidate>
            <div className="lp-grid-2">
              <div className="form-group">
                <label className="form-label lp-form__label" htmlFor="reg-name">Full Name *</label>
                <input
                  id="reg-name"
                  type="text"
                  className="form-input lp-input"
                  placeholder="Your full name"
                  value={regForm.name}
                  onChange={(e) => setRegForm(f => ({ ...f, name: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label lp-form__label" htmlFor="reg-phone">Phone Number</label>
                <input
                  id="reg-phone"
                  type="tel"
                  className="form-input lp-input"
                  placeholder="+91 98765 43210"
                  value={regForm.phone}
                  onChange={(e) => setRegForm(f => ({ ...f, phone: e.target.value }))}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label lp-form__label" htmlFor="reg-email">Email Address *</label>
              <input
                id="reg-email"
                type="email"
                className="form-input lp-input"
                placeholder="you@example.com"
                value={regForm.email}
                onChange={(e) => setRegForm(f => ({ ...f, email: e.target.value }))}
                required
              />
            </div>

            <div className="lp-grid-2">
              <div className="form-group">
                <label className="form-label lp-form__label" htmlFor="reg-pass">Password *</label>
                <div className="lp-input-wrap">
                  <input
                    id="reg-pass"
                    type={showRegPass ? 'text' : 'password'}
                    className="form-input lp-input"
                    placeholder="Min. 6 characters"
                    value={regForm.password}
                    onChange={(e) => setRegForm(f => ({ ...f, password: e.target.value }))}
                    required
                    minLength={6}
                  />
                  <button type="button" className="lp-eye" onClick={() => setShowRegPass(!showRegPass)} aria-label="Toggle password">
                    {showRegPass ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label lp-form__label" htmlFor="reg-confirm">Confirm Password *</label>
                <input
                  id="reg-confirm"
                  type={showRegPass ? 'text' : 'password'}
                  className="form-input lp-input"
                  placeholder="Repeat password"
                  value={regForm.confirm}
                  onChange={(e) => setRegForm(f => ({ ...f, confirm: e.target.value }))}
                  required
                />
              </div>
            </div>

            <p className="lp-terms">
              By creating an account, you agree to our{' '}
              <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            </p>

            <button
              id="register-submit-btn"
              type="submit"
              className="lp-btn-primary"
              disabled={status === 'loading'}
            >
              {status === 'loading' && tab === 'register' ? (
                <><span className="lp-spinner" /> Creating account…</>
              ) : 'Create Account ?'}
            </button>

            <p className="lp-switch">
              Already have an account?{' '}
              <button type="button" className="lp-switch__link" onClick={() => switchTab('login')}>
                Sign in
              </button>
            </p>
          </form>
        )}

        {/* Footer links */}
        <div className="lp-footer">
          <Link to="/" className="lp-footer__link">? Back to website</Link>
          <span className="lp-footer__sep">·</span>
          <Link to="/admin/login" className="lp-footer__link lp-footer__link--admin">Admin Portal</Link>
        </div>
      </div>
    </div>
  );
}
