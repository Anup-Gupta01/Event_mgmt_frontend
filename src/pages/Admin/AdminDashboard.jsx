import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

const API = 'http://localhost:5000';

const STATUS_MAP = {
  Pending:   'adm-badge--pending',
  Approved:  'adm-badge--approved',
  Confirmed: 'adm-badge--approved',
  Completed: 'adm-badge--done',
  Rejected:  'adm-badge--rejected',
};

function StatusBadge({ status }) {
  return <span className={`adm-badge ${STATUS_MAP[status] || 'adm-badge--pending'}`}>{status}</span>;
}

function formatINR(n) {
  return '₹' + Number(n || 0).toLocaleString('en-IN');
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading]   = useState(true);

  const fetchBookings = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/api/bookings`);
      setBookings(res.data);
    } catch {
      console.warn('Failed to fetch bookings from backend.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`${API}/api/bookings/${id}`, { status });
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    } catch {
      alert('Failed to update status.');
    }
  };

  const stats = {
    pending:   bookings.filter(b => b.status === 'Pending').length,
    approved:  bookings.filter(b => ['Approved', 'Confirmed'].includes(b.status)).length,
    completed: bookings.filter(b => b.status === 'Completed').length,
    total:     bookings.length,
  };

  const recent = [...bookings].slice(0, 5);

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
            <div className="adm-stat-card__icon" style={{ background: 'rgba(133,100,4,0.1)' }}>⏳</div>
            <span className="adm-stat-card__trend adm-stat-card__trend--down">Awaiting review</span>
          </div>
          <div className="adm-stat-card__val">{loading ? '…' : stats.pending}</div>
          <div className="adm-stat-card__lbl">Pending Requests</div>
        </div>

        {/* Approved */}
        <div className="adm-stat-card">
          <div className="adm-stat-card__top">
            <div className="adm-stat-card__icon" style={{ background: 'rgba(22,101,52,0.1)' }}>✅</div>
            <span className="adm-stat-card__trend">Active</span>
          </div>
          <div className="adm-stat-card__val">{loading ? '…' : stats.approved}</div>
          <div className="adm-stat-card__lbl">Approved Bookings</div>
        </div>

        {/* Completed */}
        <div className="adm-stat-card">
          <div className="adm-stat-card__top">
            <div className="adm-stat-card__icon" style={{ background: 'rgba(91,45,142,0.1)' }}>🏆</div>
            <span className="adm-stat-card__trend">All time</span>
          </div>
          <div className="adm-stat-card__val">{loading ? '…' : stats.completed}</div>
          <div className="adm-stat-card__lbl">Completed Events</div>
        </div>

        {/* Total */}
        <div className="adm-stat-card" style={{ borderLeft: '3px solid var(--clr-gold)' }}>
          <div className="adm-stat-card__top">
            <div className="adm-stat-card__icon" style={{ background: 'rgba(184,151,42,0.12)' }}>📋</div>
            <span className="adm-stat-card__trend">All bookings</span>
          </div>
          <div className="adm-stat-card__val" style={{ fontSize: 'var(--fs-2xl)' }}>
            {loading ? '…' : stats.total}
          </div>
          <div className="adm-stat-card__lbl">Total Booking Requests</div>
        </div>
      </div>

      {/* ── Main grid ────────────────────────────────────────────── */}
      <div className="adm-dash-grid">
        {/* Left: Recent bookings */}
        <div>
          <div className="adm-section-title">
            Recent Booking Requests
            <button className="adm-section-link" onClick={() => navigate('/admin/bookings')}>
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
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--clr-muted)' }}>Loading…</td></tr>
                  ) : recent.length === 0 ? (
                    <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--clr-muted)' }}>No bookings yet</td></tr>
                  ) : recent.map(b => (
                    <tr key={b.id}>
                      <td><span className="adm-table__id">{b.id}</span></td>
                      <td>
                        <div className="adm-table__primary">{b.name}</div>
                        <div className="adm-table__secondary">{b.venue}</div>
                      </td>
                      <td>{b.eventType}</td>
                      <td style={{ whiteSpace: 'nowrap' }}>
                        {b.date ? new Date(b.date + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                      </td>
                      <td><StatusBadge status={b.status} /></td>
                      <td>
                        <div className="adm-actions-row">
                          <button
                            className="adm-action-btn"
                            title="View"
                            style={{ fontSize: '0.75rem' }}
                            onClick={() => navigate('/admin/bookings')}
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

        {/* Right: Quick stats + actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
          {/* Booking status highlight */}
          <div className="adm-revenue-card">
            <div className="adm-revenue-card__label">Booking Overview</div>
            <div className="adm-revenue-card__amount">{loading ? '…' : stats.total}</div>
            <div className="adm-revenue-card__sub">
              {stats.approved} approved · {stats.pending} pending review
            </div>
            <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'rgba(255,255,255,0.55)', marginBottom: '0.4rem' }}>
                <span>Completion Rate</span>
                <span>{stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.12)', borderRadius: '100px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%`, background: 'var(--clr-gold-lt)', borderRadius: '100px' }} />
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

          {/* Recent pending */}
          {stats.pending > 0 && (
            <div className="adm-quick-actions">
              <div className="adm-section-title" style={{ fontSize: 'var(--fs-base)', marginBottom: 'var(--sp-4)' }}>
                Needs Attention
              </div>
              {bookings.filter(b => b.status === 'Pending').slice(0, 3).map(b => (
                <div key={b.id} className="adm-upcoming-item">
                  <div className="adm-upcoming-date">
                    <span className="adm-upcoming-date__day">
                      {b.date ? new Date(b.date + 'T00:00:00').getDate() : '—'}
                    </span>
                    <span className="adm-upcoming-date__mon">
                      {b.date ? new Date(b.date + 'T00:00:00').toLocaleString('en-IN', { month: 'short' }) : ''}
                    </span>
                  </div>
                  <div className="adm-upcoming-info">
                    <div className="adm-upcoming-name">{b.name}</div>
                    <div className="adm-upcoming-meta">{b.eventType} · {b.venue || 'Venue TBD'}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
