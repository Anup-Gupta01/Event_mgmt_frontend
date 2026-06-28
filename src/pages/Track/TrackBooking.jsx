import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './TrackBooking.css';

const API = 'http://localhost:5000';

const STATUS_CONFIG = {
  Pending:   { cls: 'track-badge--pending',   icon: '⏳', label: 'Pending Review',   msg: 'Your booking request has been received and is under review by our team.' },
  Approved:  { cls: 'track-badge--approved',  icon: '✅', label: 'Approved',          msg: 'Congratulations! Your booking has been approved. Our team will contact you shortly.' },
  Confirmed: { cls: 'track-badge--approved',  icon: '✅', label: 'Confirmed',         msg: 'Your booking is confirmed. Our team will be in touch with a detailed proposal.' },
  Rejected:  { cls: 'track-badge--rejected',  icon: '❌', label: 'Not Available',     msg: 'We regret that we are unable to accommodate this booking. Please call us to discuss alternatives.' },
  Completed: { cls: 'track-badge--completed', icon: '🏆', label: 'Event Completed',   msg: 'Thank you for celebrating with us! We hope your event was truly memorable.' },
};

export default function TrackBooking() {
  const [searchParams] = useSearchParams();
  const [form, setForm]       = useState({ id: searchParams.get('id') || '', phone: '' });
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [searched, setSearched] = useState(false);

  // Auto-search if id is prefilled from success screen
  useEffect(() => {
    if (searchParams.get('id')) {
      setForm(f => ({ ...f, id: searchParams.get('id') }));
    }
  }, [searchParams]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!form.id.trim() || !form.phone.trim()) {
      setError('Please enter both Booking ID and phone number.');
      return;
    }
    setLoading(true);
    setError('');
    setBooking(null);
    setSearched(true);
    try {
      const res = await axios.get(`${API}/api/bookings/track`, {
        params: { id: form.id.trim(), phone: form.phone.trim() },
      });
      setBooking(res.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('No booking found with this ID and phone number combination. Please check your details and try again.');
      } else {
        setError('Unable to connect to the server. Please try again later or call us directly.');
      }
    } finally {
      setLoading(false);
    }
  };

  const statusCfg = booking ? (STATUS_CONFIG[booking.status] || STATUS_CONFIG.Pending) : null;

  return (
    <div>
      <title>Track Your Booking — Raj Mahal</title>

      {/* Page hero */}
      <div className="page-hero" style={{ minHeight: '260px', height: '34vh' }}>
        <div className="page-hero__bg">
          <img src="/hero_palace.png" alt="Raj Mahal Palace" />
          <div className="page-hero__overlay" />
        </div>
        <div className="page-hero__content container">
          <p className="page-hero__eyebrow">Booking Status</p>
          <h1 className="page-hero__title">Track Your <em>Booking</em></h1>
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Track Booking</span>
          </nav>
        </div>
      </div>

      <div className="track-page">
        <div className="container">
          <div className="track-layout">

            {/* ── Search Card ── */}
            <div className="track-search-card">
              <div className="track-search-card__head">
                <span className="track-search-card__icon">🔍</span>
                <div>
                  <h2 className="track-search-card__title">Find Your Booking</h2>
                  <p className="track-search-card__sub">Enter your Booking ID and registered phone number</p>
                </div>
              </div>

              <form onSubmit={handleSearch} noValidate>
                <div className="form-group" style={{ marginBottom: 'var(--sp-4)' }}>
                  <label className="form-label" htmlFor="track-id">Booking ID</label>
                  <input
                    id="track-id"
                    type="text"
                    className="form-input"
                    placeholder="e.g. BK-2026-001"
                    value={form.id}
                    onChange={e => setForm(f => ({ ...f, id: e.target.value }))}
                    required
                    autoComplete="off"
                    style={{ fontFamily: 'var(--ff-sans)', letterSpacing: '0.04em' }}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 'var(--sp-6)' }}>
                  <label className="form-label" htmlFor="track-phone">Registered Phone Number</label>
                  <input
                    id="track-phone"
                    type="tel"
                    className="form-input"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    required
                    autoComplete="tel"
                  />
                  <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--clr-muted)', marginTop: 'var(--sp-2)' }}>
                    Use the phone number you provided when booking.
                  </p>
                </div>

                {error && (
                  <div className="track-alert track-alert--error">
                    <span>⚠</span>
                    <span>{error}</span>
                  </div>
                )}

                <button
                  id="track-search-btn"
                  type="submit"
                  className="btn btn--primary btn--lg"
                  disabled={loading}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {loading ? <><span className="track-spinner" /> Searching…</> : '🔍 Track Booking'}
                </button>
              </form>

              <div className="track-divider">
                <span>Need help?</span>
              </div>

              <div className="track-help">
                <a href="tel:+911412345678" className="track-help__item">
                  <span>📞</span>
                  <span>+91 141 234 5678</span>
                </a>
                <a href="mailto:events@rajmahal.com" className="track-help__item">
                  <span>✉️</span>
                  <span>events@rajmahal.com</span>
                </a>
              </div>
            </div>

            {/* ── Result Panel ── */}
            <div className="track-result">
              {!searched && !booking && (
                <div className="track-empty">
                  <div className="track-empty__icon">📋</div>
                  <h3 className="track-empty__title">Enter your details to track</h3>
                  <p className="track-empty__sub">
                    Your Booking ID was provided in the confirmation message after you submitted a booking request.
                  </p>
                  <div className="track-tips">
                    <div className="track-tip">
                      <span className="track-tip__icon">✦</span>
                      <span>Booking IDs look like: <strong>BK-2026-001</strong></span>
                    </div>
                    <div className="track-tip">
                      <span className="track-tip__icon">✦</span>
                      <span>Use the phone number you registered with</span>
                    </div>
                    <div className="track-tip">
                      <span className="track-tip__icon">✦</span>
                      <span>Status updates within 24 hours of submission</span>
                    </div>
                  </div>
                </div>
              )}

              {searched && !booking && !loading && !error && (
                <div className="track-empty">
                  <div className="track-empty__icon">🔍</div>
                  <h3 className="track-empty__title">No booking found</h3>
                  <p className="track-empty__sub">Please check your Booking ID and phone number.</p>
                </div>
              )}

              {booking && statusCfg && (
                <div className="track-card animate-fade-up">

                  {/* Status header */}
                  <div className="track-card__status-head">
                    <div className="track-card__status-row">
                      <span className={`track-badge ${statusCfg.cls}`}>
                        {statusCfg.icon} {statusCfg.label}
                      </span>
                      <span className="track-card__id">{booking.id}</span>
                    </div>
                    <p className="track-card__status-msg">{statusCfg.msg}</p>
                  </div>

                  {/* Progress bar */}
                  <div className="track-progress">
                    {['Pending', 'Approved', 'Completed'].map((s, i) => {
                      const statusOrder = { Pending: 0, Approved: 1, Confirmed: 1, Completed: 2, Rejected: -1 };
                      const current = statusOrder[booking.status] ?? 0;
                      const done = i <= current;
                      const active = i === current;
                      return (
                        <div key={s} className={`track-progress__step ${done ? 'track-progress__step--done' : ''} ${active ? 'track-progress__step--active' : ''}`}>
                          <div className="track-progress__dot" />
                          <span className="track-progress__label">{s}</span>
                          {i < 2 && <div className={`track-progress__line ${done && i < current ? 'track-progress__line--done' : ''}`} />}
                        </div>
                      );
                    })}
                  </div>

                  {/* Booking details */}
                  <div className="track-details">
                    <h3 className="track-details__title">Booking Details</h3>
                    <div className="track-details__grid">
                      {[
                        ['Event Type',  booking.eventType || '—'],
                        ['Date',        booking.date ? new Date(booking.date + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'],
                        ['Guest Count', booking.guestRange || '—'],
                        ['Venue',       booking.venue || '—'],
                        ['Package',     booking.package || '—'],
                        ['Submitted',   new Date(booking.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })],
                      ].map(([k, v]) => (
                        <div key={k} className="track-details__row">
                          <span className="track-details__key">{k}</span>
                          <span className="track-details__val">{v}</span>
                        </div>
                      ))}
                    </div>

                    {booking.addons && booking.addons.length > 0 && (
                      <div className="track-details__row track-details__row--full">
                        <span className="track-details__key">Add-on Services</span>
                        <div className="track-details__tags">
                          {booking.addons.map(a => (
                            <span key={a} className="track-details__tag">{a}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {booking.notes && (
                      <div className="track-details__row track-details__row--full">
                        <span className="track-details__key">Your Notes</span>
                        <span className="track-details__val track-details__val--notes">{booking.notes}</span>
                      </div>
                    )}

                    {booking.adminNotes && (
                      <div className="track-admin-note">
                        <div className="track-admin-note__head">
                          <span>✦</span>
                          <span>Message from Raj Mahal Team</span>
                        </div>
                        <p className="track-admin-note__text">{booking.adminNotes}</p>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="track-card__actions">
                    <Link to="/booking" className="btn btn--primary" id="track-new-booking">
                      + New Booking
                    </Link>
                    <a href="tel:+911412345678" className="btn btn--secondary" id="track-call">
                      📞 Call Us
                    </a>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
