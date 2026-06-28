import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Admin.css';

const API = 'http://localhost:5000';

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function StatusBadge({ status }) {
  const map = { Pending: 'pending', Approved: 'approved', Confirmed: 'approved', Rejected: 'rejected', Completed: 'done' };
  return <span className={`adm-badge adm-badge--${map[status] || 'pending'}`}>{status}</span>;
}

const FILTERS = ['All', 'Pending', 'Approved', 'Rejected', 'Completed'];

/* ── Inline Notes Editor ─────────────────────────────────────────────────── */
function NotesEditor({ booking, onSave }) {
  const [notes, setNotes] = useState(booking.adminNotes || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Use bookingId (BK-2026-001) for API route; fallback to id for old data
      const routeId = booking.bookingId || booking.id;
      await axios.patch(`${API}/api/bookings/${routeId}`, { adminNotes: notes });
      onSave(routeId, notes);
    } catch {
      alert('Failed to save notes. Please try again.');
    }
    setSaving(false);
  };

  return (
    <div className="adm-notes-editor">
      <textarea
        className="adm-notes-editor__textarea"
        placeholder="Add admin notes (visible to customer on Track Booking page)…"
        value={notes}
        onChange={e => setNotes(e.target.value)}
        rows={3}
      />
      <button
        className="btn btn--primary"
        style={{ fontSize: 'var(--fs-xs)', padding: '0.3rem 0.75rem', marginTop: '0.5rem' }}
        onClick={handleSave}
        disabled={saving || notes === (booking.adminNotes || '')}
      >
        {saving ? 'Saving…' : 'Save Notes'}
      </button>
    </div>
  );
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [filter, setFilter]     = useState('All');
  const [expanded, setExpanded] = useState(null);

  const fetchBookings = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/api/bookings`);
      // New backend wraps as { success, bookings } — support both shapes
      setBookings(res.data?.bookings || res.data || []);
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
      setBookings(prev => prev.map(b => (b.bookingId || b.id) === id ? { ...b, status } : b));
    } catch {
      alert('Failed to update status. Please try again.');
    }
  };

  const saveNotes = (id, adminNotes) => {
    setBookings(prev => prev.map(b => (b.bookingId || b.id) === id ? { ...b, adminNotes } : b));
  };

  const deleteBooking = async (id) => {
    if (!window.confirm('Delete this booking? This cannot be undone.')) return;
    try {
      await axios.delete(`${API}/api/bookings/${id}`);
      setBookings(prev => prev.filter(b => (b.bookingId || b.id) !== id));
    } catch {
      alert('Failed to delete booking.');
    }
  };

  const filtered = bookings.filter(b => {
    const q = search.toLowerCase();
    const matchQ = !q || [b.id, b.name, b.email, b.eventType, b.venue, b.package].join(' ').toLowerCase().includes(q);
    const matchF = filter === 'All' || b.status === filter;
    return matchQ && matchF;
  });

  const counts = FILTERS.reduce((acc, f) => {
    acc[f] = f === 'All' ? bookings.length : bookings.filter(b => b.status === f).length;
    return acc;
  }, {});

  return (
    <div>
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Booking Requests</h1>
          <p className="adm-page-sub">Review, approve, or manage all event bookings</p>
        </div>
        <button className="btn btn--secondary" style={{ fontSize: 'var(--fs-sm)' }} onClick={fetchBookings}>
          ↻ Refresh
        </button>
      </div>

      {/* Filter bar */}
      <div className="adm-filter-bar">
        <div className="adm-search-wrap">
          <span className="adm-search-icon">🔍</span>
          <input
            id="bookings-search"
            type="search"
            className="adm-search"
            placeholder="Search by name, event, venue, booking ID…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="adm-filter-tabs">
          {FILTERS.map(f => (
            <button
              key={f}
              id={`filter-${f.toLowerCase()}`}
              className={`adm-filter-tab${filter === f ? ' adm-filter-tab--active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f} {counts[f] > 0 && <span style={{ opacity: 0.65 }}>({counts[f]})</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="adm-table-card">
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--clr-muted)' }}>
            Loading bookings…
          </div>
        ) : (
          <div className="adm-table-scroll">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Client</th>
                  <th>Event Type</th>
                  <th>Date</th>
                  <th>Guests</th>
                  <th>Venue</th>
                  <th>Package</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} style={{ textAlign: 'center', padding: '3rem', color: 'var(--clr-muted)', fontFamily: 'var(--ff-serif)', fontSize: 'var(--fs-lg)' }}>
                      No bookings found
                    </td>
                  </tr>
                ) : filtered.map(b => {
                  const bId = b.bookingId || b.id;
                  return (
                  <>
                    <tr key={bId}>
                      <td><span className="adm-table__id">{bId}</span></td>
                      <td>
                        <div className="adm-table__primary">{b.name}</div>
                        <div className="adm-table__secondary">{b.email}</div>
                      </td>
                      <td>{b.eventType}</td>
                      <td style={{ whiteSpace: 'nowrap' }}>{formatDate(b.date)}</td>
                      <td>{b.guestRange || '—'}</td>
                      <td>{b.venue || '—'}</td>
                      <td>{b.package || '—'}</td>
                      <td><StatusBadge status={b.status} /></td>
                      <td>
                        <div className="adm-actions-row">
                          <button
                            className="adm-action-btn"
                            title="View / Edit Notes"
                            aria-label={`Expand ${bId}`}
                            style={{ fontSize: '0.75rem' }}
                            onClick={() => setExpanded(expanded === bId ? null : bId)}
                          >
                            {expanded === bId ? '▲' : '👁'}
                          </button>
                          {b.status === 'Pending' && (
                            <>
                              <button
                                className="adm-action-btn adm-action-btn--approve"
                                title="Approve"
                                onClick={() => updateStatus(bId, 'Approved')}
                                aria-label={`Approve ${bId}`}
                              >✓</button>
                              <button
                                className="adm-action-btn adm-action-btn--reject"
                                title="Reject"
                                onClick={() => updateStatus(bId, 'Rejected')}
                                aria-label={`Reject ${bId}`}
                              >✕</button>
                            </>
                          )}
                          {b.status === 'Approved' && (
                            <button
                              className="adm-action-btn adm-action-btn--done"
                              title="Mark as Completed"
                              onClick={() => updateStatus(bId, 'Completed')}
                              aria-label={`Complete ${bId}`}
                              style={{ fontSize: '0.75rem' }}
                            >✔✔</button>
                          )}
                          <button
                            className="adm-action-btn adm-action-btn--reject"
                            title="Delete"
                            onClick={() => deleteBooking(bId)}
                            aria-label={`Delete ${bId}`}
                            style={{ fontSize: '0.65rem' }}
                          >🗑</button>
                        </div>
                      </td>
                    </tr>
                    {expanded === bId && (
                      <tr key={`${bId}-detail`} className="adm-expanded-row">
                        <td colSpan={9}>
                          <div className="adm-expanded">
                            <div className="adm-expanded__cols">
                              <div>
                                <strong style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--clr-muted)' }}>Booking Details</strong>
                                <div style={{ marginTop: 'var(--sp-3)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-2) var(--sp-6)', fontSize: 'var(--fs-sm)' }}>
                                  {[
                                    ['Phone', b.phone],
                                    ['Email', b.email],
                                    ['Guest Range', b.guestRange],
                                    ['Submitted', formatDate(b.createdAt)],
                                  ].map(([k, v]) => (
                                    <div key={k}>
                                      <span style={{ color: 'var(--clr-muted)' }}>{k}: </span>
                                      <span style={{ fontWeight: 500 }}>{v || '—'}</span>
                                    </div>
                                  ))}
                                </div>
                                {b.addons && b.addons.length > 0 && (
                                  <div style={{ marginTop: 'var(--sp-3)', fontSize: 'var(--fs-sm)' }}>
                                    <span style={{ color: 'var(--clr-muted)' }}>Add-ons: </span>
                                    <span style={{ fontWeight: 500 }}>{b.addons.join(', ')}</span>
                                  </div>
                                )}
                                {b.notes && (
                                  <div style={{ marginTop: 'var(--sp-3)', fontSize: 'var(--fs-sm)' }}>
                                    <span style={{ color: 'var(--clr-muted)' }}>Customer Notes: </span>
                                    <em style={{ color: 'var(--clr-body)' }}>{b.notes}</em>
                                  </div>
                                )}
                              </div>
                              <div>
                                <strong style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--clr-muted)' }}>Admin Notes <span style={{ textTransform: 'none', letterSpacing: 0, color: 'var(--clr-gold-dim)' }}>(shown to customer)</span></strong>
                                <div style={{ marginTop: 'var(--sp-3)' }}>
                                  <NotesEditor booking={b} onSave={saveNotes} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                   </>
                   );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer count */}
        <div style={{ padding: '0.75rem 1.5rem', borderTop: '1px solid var(--clr-border-lt)', fontSize: 'var(--fs-xs)', color: 'var(--clr-muted)', display: 'flex', justifyContent: 'space-between' }}>
          <span>Showing {filtered.length} of {bookings.length} bookings</span>
          <span>Last updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </div>
  );
}
