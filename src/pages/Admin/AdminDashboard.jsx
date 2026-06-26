import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const RECENT_BOOKINGS = [
  { id: 'RM-2401', client: 'Priya Sharma', event: 'Wedding Reception', date: '14 Feb 2024', guests: 350, venue: 'Grand Durbar Hall', amount: 4850000, status: 'Pending' },
  { id: 'RM-2402', client: 'Arjun Mehta',  event: 'Corporate Gala',    date: '20 Feb 2024', guests: 120, venue: 'Maharani Pavilion', amount: 1250000, status: 'Approved' },
  { id: 'RM-2403', client: 'Sunita Kapoor', event: 'Sangeet Ceremony', date: '05 Mar 2024', guests: 200, venue: 'Jasmine Terrace',   amount: 980000,  status: 'Pending' },
  { id: 'RM-2404', client: 'Vikram Rathore',event: 'Product Launch',   date: '12 Mar 2024', guests: 80,  venue: 'Lotus Boardroom',   amount: 620000,  status: 'Approved' },
  { id: 'RM-2405', client: 'Deepa Nair',    event: 'Anniversary',      date: '18 Mar 2024', guests: 60,  venue: 'Royal Garden',      amount: 450000,  status: 'Completed' },
];

const STATUS_MAP = {
  Pending:   'adm-badge--pending',
  Approved:  'adm-badge--approved',
  Completed: 'adm-badge--done',
  Rejected:  'adm-badge--rejected',
};

function StatusBadge({ status }) {
  return <span className={`adm-badge ${STATUS_MAP[status] || 'adm-badge--pending'}`}>{status}</span>;
}

function formatINR(n) {
  return '₹' + n.toLocaleString('en-IN');
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState(RECENT_BOOKINGS);

  const stats = {
    pending:   bookings.filter(b => b.status === 'Pending').length,
    approved:  bookings.filter(b => b.status === 'Approved').length,
    completed: bookings.filter(b => b.status === 'Completed').length,
    revenue:   bookings.filter(b => b.status !== 'Rejected').reduce((s, b) => s + b.amount, 0),
  };

  const updateStatus = (id, status) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  return (
    <div>
      {/* Page header */}
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Dashboard</h1>
          <p className="adm-page-sub">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <button
          className="btn btn--primary"
          style={{ fontSize: 'var(--fs-sm)' }}
          onClick={() => navigate('/admin/bookings')}
        >
          View All Requests
        </button>
      </div>

      {/* ── Summary cards ─────────────────────────────────────────── */}
      <div className="adm-stats-grid">
        {/* Pending */}
        <div className="adm-stat-card">
          <div className="adm-stat-card__top">
            <div className="adm-stat-card__icon" style={{ background: 'rgba(133,100,4,0.1)' }}>
              ⏳
            </div>
            <span className="adm-stat-card__trend adm-stat-card__trend--down">
              +2 today
            </span>
          </div>
          <div className="adm-stat-card__val">{stats.pending}</div>
          <div className="adm-stat-card__lbl">Pending Requests</div>
        </div>

        {/* Approved */}
        <div className="adm-stat-card">
          <div className="adm-stat-card__top">
            <div className="adm-stat-card__icon" style={{ background: 'rgba(22,101,52,0.1)' }}>
              ✅
            </div>
            <span className="adm-stat-card__trend">+1 today</span>
          </div>
          <div className="adm-stat-card__val">{stats.approved}</div>
          <div className="adm-stat-card__lbl">Approved Bookings</div>
        </div>

        {/* Completed */}
        <div className="adm-stat-card">
          <div className="adm-stat-card__top">
            <div className="adm-stat-card__icon" style={{ background: 'rgba(91,45,142,0.1)' }}>
              🏆
            </div>
            <span className="adm-stat-card__trend">+3 this month</span>
          </div>
          <div className="adm-stat-card__val">{stats.completed}</div>
          <div className="adm-stat-card__lbl">Completed Events</div>
        </div>

        {/* Revenue */}
        <div className="adm-stat-card" style={{ borderLeft: '3px solid var(--clr-gold)' }}>
          <div className="adm-stat-card__top">
            <div className="adm-stat-card__icon" style={{ background: 'rgba(184,151,42,0.12)' }}>
              💰
            </div>
            <span className="adm-stat-card__trend">↑ 18% MoM</span>
          </div>
          <div className="adm-stat-card__val" style={{ fontSize: 'var(--fs-2xl)' }}>
            {formatINR(stats.revenue)}
          </div>
          <div className="adm-stat-card__lbl">Total Revenue</div>
        </div>
      </div>

      {/* ── Main grid ────────────────────────────────────────────── */}
      <div className="adm-dash-grid">
        {/* Left: Recent bookings */}
        <div>
          <div className="adm-section-title">
            Recent Booking Requests
            <button
              className="adm-section-link"
              onClick={() => navigate('/admin/bookings')}
            >
              See all →
            </button>
          </div>

          <div className="adm-table-card">
            <div className="adm-table-scroll">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Client</th>
                    <th>Event</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(b => (
                    <tr key={b.id}>
                      <td><span className="adm-table__id">{b.id}</span></td>
                      <td>
                        <div className="adm-table__primary">{b.client}</div>
                        <div className="adm-table__secondary">{b.venue}</div>
                      </td>
                      <td>{b.event}</td>
                      <td style={{ whiteSpace: 'nowrap' }}>{b.date}</td>
                      <td><span className="adm-table__amount">{formatINR(b.amount)}</span></td>
                      <td><StatusBadge status={b.status} /></td>
                      <td>
                        <div className="adm-actions-row">
                          <button
                            className="adm-action-btn"
                            title="View"
                            style={{ fontSize: '0.75rem' }}
                          >👁</button>
                          {b.status === 'Pending' && (
                            <>
                              <button
                                className="adm-action-btn adm-action-btn--approve"
                                title="Approve"
                                onClick={() => updateStatus(b.id, 'Approved')}
                              >✓</button>
                              <button
                                className="adm-action-btn adm-action-btn--reject"
                                title="Reject"
                                onClick={() => updateStatus(b.id, 'Rejected')}
                              >✕</button>
                            </>
                          )}
                          {b.status === 'Approved' && (
                            <button
                              className="adm-action-btn adm-action-btn--done"
                              title="Mark Done"
                              onClick={() => updateStatus(b.id, 'Completed')}
                              style={{ fontSize: '0.65rem' }}
                            >✔✔</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Revenue card + quick actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
          {/* Revenue highlight */}
          <div className="adm-revenue-card">
            <div className="adm-revenue-card__label">Monthly Revenue — June 2024</div>
            <div className="adm-revenue-card__amount">₹82,40,000</div>
            <div className="adm-revenue-card__sub">
              14 bookings confirmed · 3 pending review
            </div>
            <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'rgba(255,255,255,0.55)', marginBottom: '0.4rem' }}>
                <span>Monthly Target ₹1,00,00,000</span>
                <span>82%</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.12)', borderRadius: '100px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '82%', background: 'var(--clr-gold-lt)', borderRadius: '100px' }} />
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="adm-quick-actions">
            <div className="adm-section-title" style={{ fontSize: 'var(--fs-base)', marginBottom: 'var(--sp-4)' }}>
              Quick Actions
            </div>
            <button className="adm-quick-action-btn" onClick={() => navigate('/admin/bookings')}>
              <span>📋</span> View All Booking Requests
            </button>
            <button className="adm-quick-action-btn" onClick={() => navigate('/admin/calendar')}>
              <span>📅</span> Manage Availability Calendar
            </button>
            <button className="adm-quick-action-btn" onClick={() => navigate('/admin/services')}>
              <span>🎪</span> Manage Services
            </button>
            <button className="adm-quick-action-btn" onClick={() => navigate('/admin/packages')}>
              <span>💎</span> Manage Packages
            </button>
            <a className="adm-quick-action-btn" href="/" target="_blank" rel="noreferrer">
              <span>🌐</span> View Public Website
            </a>
          </div>

          {/* Upcoming events */}
          <div className="adm-quick-actions">
            <div className="adm-section-title" style={{ fontSize: 'var(--fs-base)', marginBottom: 'var(--sp-4)' }}>
              Upcoming Events
            </div>
            {[
              { day: '14', mon: 'Feb', name: 'Sharma Wedding', meta: 'Grand Durbar Hall · 350 pax' },
              { day: '20', mon: 'Feb', name: 'Mehta Corp Gala', meta: 'Maharani Pavilion · 120 pax' },
              { day: '05', mon: 'Mar', name: 'Kapoor Sangeet', meta: 'Jasmine Terrace · 200 pax' },
            ].map(ev => (
              <div key={ev.name} className="adm-upcoming-item">
                <div className="adm-upcoming-date">
                  <span className="adm-upcoming-date__day">{ev.day}</span>
                  <span className="adm-upcoming-date__mon">{ev.mon}</span>
                </div>
                <div className="adm-upcoming-info">
                  <div className="adm-upcoming-name">{ev.name}</div>
                  <div className="adm-upcoming-meta">{ev.meta}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
