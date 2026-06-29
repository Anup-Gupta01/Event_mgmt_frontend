import { useState, useEffect, useCallback } from 'react';
import { Link, Navigate } from 'react-router-dom';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import './MyBookings.css';

/* -- Helpers ------------------------------------------------------------------ */
function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

function formatPrice(n) {
  if (!n && n !== 0) return '?—';
  return '?' + Number(n).toLocaleString('en-IN');
}

function getInitials(name) {
  if (!name) return '?';
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

const STATUS_META = {
  pending:   { label: 'Pending Review', color: '#92400E', bg: '#FEF3C7', dot: '#F59E0B', icon: '?' },
  approved:  { label: 'Approved',       color: '#166534', bg: '#DCFCE7', dot: '#22C55E', icon: '?'  },
  confirmed: { label: 'Confirmed',      color: '#166534', bg: '#DCFCE7', dot: '#22C55E', icon: '?'  },
  rejected:  { label: 'Rejected',       color: '#991B1B', bg: '#FEE2E2', dot: '#EF4444', icon: '?'  },
  completed: { label: 'Completed',      color: '#1E40AF', bg: '#DBEAFE', dot: '#3B82F6', icon: '?'  },
};

function StatusBadge({ status }) {
  const meta = STATUS_META[status?.toLowerCase()] || STATUS_META.pending;
  return (
    <span className="mb-badge" style={{ color: meta.color, background: meta.bg }}>
      <span className="mb-badge__dot" style={{ background: meta.dot }} />
      {meta.label}
    </span>
  );
}

/* -- Component ---------------------------------------------------------------- */
export default function MyBookings() {
  const { user, logout, isAuthenticated } = useAuth();
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedId, setExpandedId]     = useState(null);
  const [profileOpen, setProfileOpen]   = useState(false);
  const [bookings, setBookings]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/api/bookings/my');
      const list = res.data?.bookings || res.data || [];
      // Normalize status to lowercase for STATUS_META compatibility
      setBookings(list.map(b => ({ ...b, status: b.status?.toLowerCase() || 'pending' })));
    } catch (err) {
      setError('Could not load your bookings. Please try again.');
      console.warn('Booking fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  const filtered = filterStatus === 'all'
    ? bookings
    : bookings.filter(b => b.status === filterStatus);

  const stats = {
    total:     bookings.length,
    upcoming:  bookings.filter(b => b.status === 'approved' || b.status === 'confirmed').length,
    pending:   bookings.filter(b => b.status === 'pending').length,
    completed: bookings.filter(b => b.status === 'completed').length,
  };

  const handleDownload = (booking, e) => {
    e.stopPropagation();
    const bId = booking.bookingId || booking._id || booking.id || 'N/A';
    const content = [
      '-------------------------------------------',
      '  RAJ MAHAL — EVENT BOOKING CONFIRMATION',
      '-------------------------------------------',
      '',
      `Booking ID : ${bId}`,
      `Event      : ${booking.eventType}`,
      `Date       : ${formatDate(booking.date)}`,
      `Venue      : ${booking.venue || 'TBD'}`,
      `Package    : ${booking.package || 'TBD'}`,
      `Status     : ${STATUS_META[booking.status]?.label || booking.status}`,
      '',
      'Notes:',
      booking.notes || 'None',
      '',
      booking.adminNotes ? `Admin Update:\n${booking.adminNotes}` : '',
      '-------------------------------------------',
      'Raj Mahal Palace · Jaipur, Rajasthan',
      'events@rajmahal.com · +91 141 400 1947',
      '-------------------------------------------',
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${bId}-confirmation.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mb-page">
      {/* -- Dashboard Header ------------------------------------------------ */}
      <header className="mb-header">
        <div className="mb-header__inner">
          {/* Brand */}
          <Link to="/" className="mb-brand">
            <span className="mb-brand__icon">?</span>
            <div>
              <div className="mb-brand__name">Raj Mahal</div>
              <div className="mb-brand__sub">Client Portal</div>
            </div>
          </Link>

          {/* Nav */}
          <nav className="mb-nav">
            <span className="mb-nav__item mb-nav__item--active">My Bookings</span>
            <Link to="/booking" className="mb-nav__item">New Booking</Link>
            <Link to="/contact" className="mb-nav__item">Contact Us</Link>
          </nav>

          {/* Profile */}
          <div className="mb-profile" onClick={() => setProfileOpen(!profileOpen)}>
            <div className="mb-profile__avatar">{getInitials(user?.name)}</div>
            <div className="mb-profile__info">
              <div className="mb-profile__name">{user?.name || 'Guest'}</div>
              <div className="mb-profile__email">{user?.email || ''}</div>
            </div>
            <svg className={`mb-profile__chevron ${profileOpen ? 'mb-profile__chevron--open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
            {profileOpen && (
              <div className="mb-profile__dropdown">
                <button className="mb-profile__drop-item">? Account Settings</button>
                <button className="mb-profile__drop-item">?? My Documents</button>
                <div className="mb-profile__drop-divider" />
                <button
                  className="mb-profile__drop-item mb-profile__drop-item--danger"
                  onClick={() => { logout(); }}
                >
                  ? Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* -- Main Content ---------------------------------------------------- */}
      <main className="mb-main">
        {/* Page title */}
        <div className="mb-page-header">
          <div>
            <h1 className="mb-page-title">My Bookings</h1>
            <p className="mb-page-sub">Track and manage all your event reservations at Raj Mahal</p>
          </div>
          <Link to="/booking" className="mb-cta-btn" id="new-booking-cta">
            + New Booking
          </Link>
        </div>

        {/* Error banner */}
        {error && (
          <div style={{ background: '#fee2e2', color: '#991b1b', padding: '1rem 1.5rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span>?</span> {error}
            <button onClick={fetchBookings} style={{ marginLeft: 'auto', background: 'none', border: '1px solid #991b1b', color: '#991b1b', borderRadius: '6px', padding: '0.25rem 0.75rem', cursor: 'pointer' }}>Retry</button>
          </div>
        )}

        {/* -- Summary Cards ----------------------------------------------- */}
        <div className="mb-stats-grid">
          {[
            { label: 'Total Bookings', value: stats.total,     icon: '??', color: '#6B1F2A', bg: 'rgba(107,31,42,0.08)',  id: 'stat-total'     },
            { label: 'Upcoming',       value: stats.upcoming,  icon: '??', color: '#166534', bg: 'rgba(22,101,52,0.08)',  id: 'stat-upcoming'  },
            { label: 'Pending Review', value: stats.pending,   icon: '?', color: '#92400E', bg: 'rgba(146,64,14,0.08)', id: 'stat-pending'   },
            { label: 'Completed',      value: stats.completed, icon: '?',  color: '#1E40AF', bg: 'rgba(30,64,175,0.08)', id: 'stat-completed' },
          ].map(s => (
            <div key={s.label} className="mb-stat-card" id={s.id}>
              <div className="mb-stat-card__icon" style={{ background: s.bg, color: s.color }}>
                {s.icon}
              </div>
              <div className="mb-stat-card__body">
                <div className="mb-stat-card__value" style={{ color: s.color }}>{loading ? '…' : s.value}</div>
                <div className="mb-stat-card__label">{s.label}</div>
              </div>
              <div className="mb-stat-card__bar" style={{ background: s.color }} />
            </div>
          ))}
        </div>

        {/* -- Filter Tabs ------------------------------------------------- */}
        <div className="mb-filters">
          {[
            { key: 'all',       label: 'All Bookings',   count: bookings.length },
            { key: 'approved',  label: 'Approved',       count: bookings.filter(b => b.status === 'approved').length  },
            { key: 'confirmed', label: 'Confirmed',      count: bookings.filter(b => b.status === 'confirmed').length },
            { key: 'pending',   label: 'Pending',        count: bookings.filter(b => b.status === 'pending').length   },
            { key: 'completed', label: 'Completed',      count: bookings.filter(b => b.status === 'completed').length },
            { key: 'rejected',  label: 'Rejected',       count: bookings.filter(b => b.status === 'rejected').length  },
          ].map(f => (
            <button
              key={f.key}
              id={`filter-${f.key}`}
              className={`mb-filter-btn ${filterStatus === f.key ? 'mb-filter-btn--active' : ''}`}
              onClick={() => setFilterStatus(f.key)}
            >
              {f.label}
              <span className="mb-filter-count">{f.count}</span>
            </button>
          ))}
        </div>

        {/* -- Booking List ------------------------------------------------ */}
        <div className="mb-list">
          {loading ? (
            <div className="mb-empty">
              <div className="mb-empty__icon">?</div>
              <p className="mb-empty__title">Loading your bookings…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="mb-empty">
              <div className="mb-empty__icon">??</div>
              <p className="mb-empty__title">No bookings found</p>
              <p className="mb-empty__sub">
                {bookings.length === 0
                  ? <>You haven't made any bookings yet. <Link to="/booking" style={{ color: 'var(--clr-maroon)' }}>Book an event ?</Link></>
                  : <>No bookings match the selected filter. <Link to="/track" style={{ color: 'var(--clr-maroon)' }}>Track a booking by ID ?</Link></>
                }
              </p>
            </div>
          ) : (
            filtered.map((booking, idx) => {
              const bId = booking.bookingId || booking._id || booking.id;
              const isExpanded = expandedId === bId;
              const meta = STATUS_META[booking.status] || STATUS_META.pending;
              return (
                <div
                  key={bId}
                  className={`mb-card ${isExpanded ? 'mb-card--expanded' : ''}`}
                  style={{ animationDelay: `${idx * 0.07}s` }}
                  id={`booking-${bId}`}
                >
                  {/* Status indicator strip */}
                  <div className="mb-card__strip" style={{ background: meta.dot }} />

                  {/* Main row */}
                  <div
                    className="mb-card__main"
                    onClick={() => setExpandedId(isExpanded ? null : bId)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    onKeyDown={e => e.key === 'Enter' && setExpandedId(isExpanded ? null : bId)}
                  >
                    {/* Left: ID + event */}
                    <div className="mb-card__identity">
                      <div className="mb-card__id">{bId}</div>
                      <div className="mb-card__event">{booking.eventType}</div>
                    </div>

                    {/* Meta fields */}
                    <div className="mb-card__fields">
                      <div className="mb-card__field">
                        <span className="mb-card__field-lbl">Date</span>
                        <span className="mb-card__field-val">{formatDate(booking.date)}</span>
                      </div>
                      <div className="mb-card__field">
                        <span className="mb-card__field-lbl">Venue</span>
                        <span className="mb-card__field-val">{booking.venue || 'TBD'}</span>
                      </div>
                      <div className="mb-card__field">
                        <span className="mb-card__field-lbl">Package</span>
                        <span className="mb-card__field-val">{booking.package || 'TBD'}</span>
                      </div>
                      <div className="mb-card__field">
                        <span className="mb-card__field-lbl">Guests</span>
                        <span className="mb-card__field-val">{booking.guestRange || '—'}</span>
                      </div>
                    </div>

                    {/* Right: badge + actions */}
                    <div className="mb-card__right">
                      <StatusBadge status={booking.status} />
                      <div className="mb-card__actions">
                        <button
                          id={`download-${bId}`}
                          className="mb-download-btn"
                          onClick={(e) => handleDownload(booking, e)}
                          title="Download Confirmation"
                          aria-label="Download confirmation"
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                          </svg>
                          Download
                        </button>
                        <button
                          className={`mb-expand-btn ${isExpanded ? 'mb-expand-btn--open' : ''}`}
                          aria-label={isExpanded ? 'Collapse' : 'Expand'}
                          onClick={(e) => { e.stopPropagation(); setExpandedId(isExpanded ? null : bId); }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded notes panel */}
                  {isExpanded && (
                    <div className="mb-card__detail">
                      <div className="mb-card__detail-inner">
                        <div className="mb-card__detail-section">
                          <h4 className="mb-card__detail-title">Notes & Updates</h4>
                          <p className="mb-card__detail-text">{booking.notes || 'No customer notes.'}</p>
                          {booking.adminNotes && (
                            <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: 'rgba(107,31,42,0.05)', borderRadius: '8px', borderLeft: '3px solid var(--clr-maroon)' }}>
                              <div style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--clr-maroon)', marginBottom: '0.35rem' }}>Update from Events Team</div>
                              <p style={{ margin: 0, fontSize: '0.875rem' }}>{booking.adminNotes}</p>
                            </div>
                          )}
                        </div>
                        <div className="mb-card__detail-section">
                          <h4 className="mb-card__detail-title">Booking Timeline</h4>
                          <div className="mb-timeline">
                            <div className="mb-timeline__item mb-timeline__item--done">
                              <div className="mb-timeline__dot" />
                              <div>
                                <div className="mb-timeline__label">Inquiry Submitted</div>
                                <div className="mb-timeline__date">{formatDate(booking.createdAt)}</div>
                              </div>
                            </div>
                            <div className={`mb-timeline__item ${booking.status !== 'pending' ? 'mb-timeline__item--done' : ''}`}>
                              <div className="mb-timeline__dot" />
                              <div>
                                <div className="mb-timeline__label">Review by Events Team</div>
                                <div className="mb-timeline__date">{booking.status === 'pending' ? 'In Progress' : 'Completed'}</div>
                              </div>
                            </div>
                            {(booking.status === 'approved' || booking.status === 'confirmed') && (
                              <div className="mb-timeline__item mb-timeline__item--active">
                                <div className="mb-timeline__dot mb-timeline__dot--active" />
                                <div>
                                  <div className="mb-timeline__label">Event Confirmation</div>
                                  <div className="mb-timeline__date">Approved ?</div>
                                </div>
                              </div>
                            )}
                            {booking.status === 'completed' && (
                              <div className="mb-timeline__item mb-timeline__item--done">
                                <div className="mb-timeline__dot" />
                                <div>
                                  <div className="mb-timeline__label">Event Completed</div>
                                  <div className="mb-timeline__date">{formatDate(booking.date)}</div>
                                </div>
                              </div>
                            )}
                            {booking.status === 'rejected' && (
                              <div className="mb-timeline__item mb-timeline__item--rejected">
                                <div className="mb-timeline__dot mb-timeline__dot--rejected" />
                                <div>
                                  <div className="mb-timeline__label">Booking Declined</div>
                                  <div className="mb-timeline__date">Please contact us to reschedule</div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="mb-card__detail-actions">
                          <button
                            className="mb-detail-btn mb-detail-btn--secondary"
                            onClick={(e) => handleDownload(booking, e)}
                            id={`download-detail-${bId}`}
                          >
                            ? Download Confirmation
                          </button>
                          <Link to="/contact" className="mb-detail-btn mb-detail-btn--primary">
                            ? Contact Event Manager
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Help callout */}
        <div className="mb-help-banner">
          <div className="mb-help-banner__icon">??</div>
          <div>
            <div className="mb-help-banner__title">Need assistance with your booking?</div>
            <div className="mb-help-banner__sub">Our dedicated events team is available Mon–Sat, 9 AM – 7 PM IST</div>
          </div>
          <div className="mb-help-banner__actions">
            <a href="tel:+911414001947" className="mb-help-btn mb-help-btn--outline">?? Call Us</a>
            <Link to="/contact" className="mb-help-btn mb-help-btn--primary">Send a Message</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
