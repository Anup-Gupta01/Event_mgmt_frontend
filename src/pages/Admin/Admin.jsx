import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Link } from 'react-router-dom';
import './Admin.css';

const STATUSES = ['New', 'Pending', 'Confirmed', 'Declined'];

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function StatusBadge({ status }) {
  const cls = { New: 'status-new', Confirmed: 'status-confirmed', Declined: 'status-declined', Pending: 'status-pending' };
  return <span className={`admin-status-badge ${cls[status] || 'status-pending'}`}>{status}</span>;
}

export default function Admin() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [selected, setSelected]   = useState(null);
  const [search, setSearch]       = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const load = () => {
    api.get('/api/inquiries')
      .then(r => { setInquiries(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await api.patch('/api/inquiries/${id}', { status });
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
    if (selected?.id === id) setSelected(s => ({ ...s, status }));
  };

  const deleteInquiry = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    await api.delete('/api/inquiries/${id}');
    setInquiries(prev => prev.filter(i => i.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const filtered = inquiries.filter(i => {
    const matchSearch = !search || [i.name, i.email, i.eventType, i.venue].join(' ').toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || i.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: inquiries.length,
    new: inquiries.filter(i => i.status === 'New').length,
    confirmed: inquiries.filter(i => i.status === 'Confirmed').length,
    pending: inquiries.filter(i => i.status === 'Pending').length,
  };

  return (
    <div className="admin">
      {/* Admin Navbar */}
      <header className="admin-nav">
        <div className="admin-nav__logo">
          <span className="admin-nav__icon">✦</span>
          <div>
            <p className="admin-nav__title">Raj Mahal</p>
            <p className="admin-nav__sub">Admin Portal</p>
          </div>
        </div>
        <div className="admin-nav__actions">
          <button onClick={load} className="btn btn--secondary admin-nav__refresh" style={{ fontSize: '0.8rem', padding: '0.4rem 1rem' }}>
            ↻ Refresh
          </button>
          <Link to="/" className="btn btn--primary" style={{ fontSize: '0.8rem', padding: '0.4rem 1rem' }}>
            ← Public Site
          </Link>
        </div>
      </header>

      <div className="admin-body">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <nav className="admin-sidebar__nav">
            <button className="admin-sidebar__item admin-sidebar__item--active">📋 Enquiries</button>
            <button className="admin-sidebar__item" onClick={() => window.open('/venues', '_blank')}>🏛 Venues</button>
            <button className="admin-sidebar__item" onClick={() => window.open('/packages', '_blank')}>💎 Packages</button>
            <button className="admin-sidebar__item" onClick={() => window.open('/contact', '_blank')}>📩 Booking Form</button>
          </nav>

          {/* Quick stats */}
          <div className="admin-sidebar__stats">
            <div className="admin-quick-stat">
              <span className="admin-quick-stat__n">{stats.total}</span>
              <span className="admin-quick-stat__l">Total</span>
            </div>
            <div className="admin-quick-stat admin-quick-stat--new">
              <span className="admin-quick-stat__n">{stats.new}</span>
              <span className="admin-quick-stat__l">New</span>
            </div>
            <div className="admin-quick-stat admin-quick-stat--confirmed">
              <span className="admin-quick-stat__n">{stats.confirmed}</span>
              <span className="admin-quick-stat__l">Confirmed</span>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="admin-main">
          {/* Stats row */}
          <div className="admin-stats-row">
            {[
              { label: 'Total Enquiries', value: stats.total, icon: '📋', color: 'var(--clr-maroon)' },
              { label: 'New',             value: stats.new,   icon: '🔔', color: '#B8972A' },
              { label: 'Confirmed',       value: stats.confirmed, icon: '✓', color: '#166534' },
              { label: 'Pending Review',  value: stats.pending,   icon: '⏳', color: '#555' },
            ].map((s) => (
              <div key={s.label} className="admin-stat-card">
                <span className="admin-stat-card__icon" style={{ background: `${s.color}18` }}>{s.icon}</span>
                <div>
                  <p className="admin-stat-card__val">{s.value}</p>
                  <p className="admin-stat-card__lbl">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="admin-filters">
            <input
              type="search"
              className="admin-search form-input"
              placeholder="Search by name, email, event type…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              id="admin-search"
            />
            <div className="admin-filter-tabs">
              {['All', ...STATUSES].map(s => (
                <button
                  key={s}
                  id={`admin-filter-${s.toLowerCase()}`}
                  className={`venues-filter__tab ${filterStatus === s ? 'venues-filter__tab--active' : ''}`}
                  onClick={() => setFilterStatus(s)}
                >
                  {s} {s !== 'All' && `(${inquiries.filter(i => i.status === s).length})`}
                </button>
              ))}
            </div>
          </div>

          <div className="admin-content-layout">
            {/* Table */}
            <div className="admin-table-wrap">
              {loading ? (
                <div className="admin-loading">Loading enquiries…</div>
              ) : filtered.length === 0 ? (
                <div className="admin-empty">No enquiries found.</div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Guest / Organisation</th>
                      <th>Event Type</th>
                      <th>Venue</th>
                      <th>Date</th>
                      <th>Guests</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((inq) => (
                      <tr
                        key={inq.id}
                        className={`admin-table__row ${selected?.id === inq.id ? 'admin-table__row--selected' : ''}`}
                        onClick={() => setSelected(inq)}
                      >
                        <td>
                          <div className="admin-table__name">{inq.name}</div>
                          <div className="admin-table__email">{inq.email}</div>
                        </td>
                        <td>{inq.eventType}</td>
                        <td>{inq.venue || '—'}</td>
                        <td>{formatDate(inq.date)}</td>
                        <td>{inq.guestCount || '—'}</td>
                        <td><StatusBadge status={inq.status} /></td>
                        <td>
                          <div className="admin-table__actions" onClick={e => e.stopPropagation()}>
                            <select
                              className="admin-status-select"
                              value={inq.status}
                              onChange={e => updateStatus(inq.id, e.target.value)}
                              id={`status-select-${inq.id}`}
                            >
                              {STATUSES.map(s => <option key={s}>{s}</option>)}
                            </select>
                            <button
                              className="admin-delete-btn"
                              onClick={() => deleteInquiry(inq.id)}
                              title="Delete"
                              id={`delete-${inq.id}`}
                            >
                              ✕
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Detail panel */}
            {selected && (
              <div className="admin-detail">
                <div className="admin-detail__header">
                  <h3 className="admin-detail__name">{selected.name}</h3>
                  <button className="admin-detail__close" onClick={() => setSelected(null)} aria-label="Close">✕</button>
                </div>
                <StatusBadge status={selected.status} />
                <div className="admin-detail__submitted">Submitted {formatDate(selected.createdAt)}</div>

                <div className="admin-detail__grid">
                  <div><p className="admin-detail__lbl">Email</p><p className="admin-detail__val">{selected.email}</p></div>
                  <div><p className="admin-detail__lbl">Phone</p><p className="admin-detail__val">{selected.phone || '—'}</p></div>
                  <div><p className="admin-detail__lbl">Event Type</p><p className="admin-detail__val">{selected.eventType}</p></div>
                  <div><p className="admin-detail__lbl">Venue</p><p className="admin-detail__val">{selected.venue || '—'}</p></div>
                  <div><p className="admin-detail__lbl">Event Date</p><p className="admin-detail__val">{formatDate(selected.date)}</p></div>
                  <div><p className="admin-detail__lbl">Guests</p><p className="admin-detail__val">{selected.guestCount || '—'}</p></div>
                </div>

                {selected.message && (
                  <div className="admin-detail__message">
                    <p className="admin-detail__lbl">Message</p>
                    <p>{selected.message}</p>
                  </div>
                )}

                <div className="admin-detail__actions">
                  {STATUSES.map(s => (
                    <button
                      key={s}
                      className={`btn ${selected.status === s ? 'btn--primary' : 'btn--secondary'}`}
                      style={{ fontSize: '0.78rem', padding: '0.4rem 0.9rem' }}
                      onClick={() => updateStatus(selected.id, s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                <a href={`mailto:${selected.email}`} className="btn btn--gold" style={{ width: '100%', justifyContent: 'center', marginTop: 'var(--sp-4)', display: 'flex' }}>
                  ✉ Reply to {selected.name.split(' ')[0]}
                </a>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
