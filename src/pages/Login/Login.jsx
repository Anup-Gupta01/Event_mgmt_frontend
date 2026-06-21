import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [loginForm, setLoginForm] = useState({ email: '', password: '', remember: false });
  const [regForm, setRegForm]     = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [showRegPass, setShowRegPass]     = useState(false);
  const [status, setStatus] = useState(null); // 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setMessage('Welcome back! Redirecting to your dashboard…');
    }, 1200);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (regForm.password !== regForm.confirm) {
      setStatus('error');
      setMessage('Passwords do not match. Please try again.');
      return;
    }
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setMessage('Account created! Our team will verify and activate your account within 24 hours.');
    }, 1200);
  };

  return (
    <div className="login-page">

      {/* Left panel — branding */}
      <div className="login-panel login-panel--left">
        <div className="login-panel__bg">
          <img src="/hero_palace.png" alt="Raj Mahal Palace" />
          <div className="login-panel__overlay" />
        </div>
        <div className="login-panel__content">
          <Link to="/" className="login-logo">
            <span className="login-logo__icon">✦</span>
            <div>
              <div className="login-logo__name">Raj Mahal</div>
              <div className="login-logo__sub">Est. 1947 · Jaipur</div>
            </div>
          </Link>

          <div className="login-brand">
            <h2 className="login-brand__title">
              Where Royalty<br /><em>Meets Celebration</em>
            </h2>
            <p className="login-brand__desc">
              Sign in to manage your bookings, track event progress, and communicate with your dedicated events team.
            </p>
            <div className="login-brand__features">
              {[
                'Track your booking status in real-time',
                'Download invoices and proposals',
                'Communicate with your event manager',
                'View and approve event timelines',
              ].map((f) => (
                <div key={f} className="login-brand__feature">
                  <span>✦</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="login-panel__bottom">
            <Link to="/contact" className="login-panel__event-link">
              Planning an event? <span>Contact our team →</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="login-panel login-panel--right">
        <div className="login-form-wrap">
          {/* Back to site */}
          <Link to="/" className="login-back">
            ← Back to site
          </Link>

          {/* Tabs */}
          <div className="login-tabs" role="tablist">
            <button
              id="tab-login"
              role="tab"
              aria-selected={tab === 'login'}
              className={`login-tab ${tab === 'login' ? 'login-tab--active' : ''}`}
              onClick={() => { setTab('login'); setStatus(null); }}
            >
              Sign In
            </button>
            <button
              id="tab-register"
              role="tab"
              aria-selected={tab === 'register'}
              className={`login-tab ${tab === 'register' ? 'login-tab--active' : ''}`}
              onClick={() => { setTab('register'); setStatus(null); }}
            >
              Create Account
            </button>
          </div>

          {/* Success / error messages */}
          {status === 'success' && (
            <div className="login-alert login-alert--success">
              <span>✓</span> {message}
            </div>
          )}
          {status === 'error' && (
            <div className="login-alert login-alert--error">
              <span>⚠</span> {message}
            </div>
          )}

          {/* Login Form */}
          {tab === 'login' && (
            <form className="login-form" onSubmit={handleLogin} noValidate>
              <h1 className="login-form__title">Welcome Back</h1>
              <p className="login-form__sub">Sign in to your Raj Mahal account</p>

              <div className="form-group">
                <label className="form-label" htmlFor="login-email">Email Address</label>
                <input
                  id="login-email"
                  type="email"
                  className="form-input"
                  placeholder="you@example.com"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm(f => ({ ...f, email: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="login-pass">
                  Password
                  <a href="#" className="login-forgot" tabIndex={-1}>Forgot password?</a>
                </label>
                <div className="login-input-wrap">
                  <input
                    id="login-pass"
                    type={showLoginPass ? 'text' : 'password'}
                    className="form-input"
                    placeholder="••••••••"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm(f => ({ ...f, password: e.target.value }))}
                    required
                  />
                  <button
                    type="button"
                    className="login-toggle-pass"
                    onClick={() => setShowLoginPass(!showLoginPass)}
                    aria-label={showLoginPass ? 'Hide password' : 'Show password'}
                  >
                    {showLoginPass ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <label className="login-remember">
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
                className="btn btn--primary btn--lg login-submit"
                disabled={status === 'loading'}
              >
                {status === 'loading' && tab === 'login' ? 'Signing in…' : 'Sign In →'}
              </button>

              <p className="login-switch">
                Don't have an account?{' '}
                <button type="button" className="login-switch__btn" onClick={() => setTab('register')}>
                  Create one
                </button>
              </p>
            </form>
          )}

          {/* Register Form */}
          {tab === 'register' && (
            <form className="login-form" onSubmit={handleRegister} noValidate>
              <h1 className="login-form__title">Create Account</h1>
              <p className="login-form__sub">Join Raj Mahal's client portal</p>

              <div className="login-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-name">Full Name *</label>
                  <input
                    id="reg-name"
                    type="text"
                    className="form-input"
                    placeholder="Your full name"
                    value={regForm.name}
                    onChange={(e) => setRegForm(f => ({ ...f, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-phone">Phone Number</label>
                  <input
                    id="reg-phone"
                    type="tel"
                    className="form-input"
                    placeholder="+91 98765 43210"
                    value={regForm.phone}
                    onChange={(e) => setRegForm(f => ({ ...f, phone: e.target.value }))}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="reg-email">Email Address *</label>
                <input
                  id="reg-email"
                  type="email"
                  className="form-input"
                  placeholder="you@example.com"
                  value={regForm.email}
                  onChange={(e) => setRegForm(f => ({ ...f, email: e.target.value }))}
                  required
                />
              </div>

              <div className="login-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-pass">Password *</label>
                  <div className="login-input-wrap">
                    <input
                      id="reg-pass"
                      type={showRegPass ? 'text' : 'password'}
                      className="form-input"
                      placeholder="Min. 8 characters"
                      value={regForm.password}
                      onChange={(e) => setRegForm(f => ({ ...f, password: e.target.value }))}
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      className="login-toggle-pass"
                      onClick={() => setShowRegPass(!showRegPass)}
                      aria-label="Toggle password"
                    >
                      {showRegPass ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-confirm">Confirm Password *</label>
                  <input
                    id="reg-confirm"
                    type={showRegPass ? 'text' : 'password'}
                    className="form-input"
                    placeholder="Repeat password"
                    value={regForm.confirm}
                    onChange={(e) => setRegForm(f => ({ ...f, confirm: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <p className="login-terms">
                By creating an account, you agree to our{' '}
                <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
              </p>

              <button
                id="register-submit-btn"
                type="submit"
                className="btn btn--primary btn--lg login-submit"
                disabled={status === 'loading'}
              >
                {status === 'loading' && tab === 'register' ? 'Creating account…' : 'Create Account →'}
              </button>

              <p className="login-switch">
                Already have an account?{' '}
                <button type="button" className="login-switch__btn" onClick={() => setTab('login')}>
                  Sign in
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
