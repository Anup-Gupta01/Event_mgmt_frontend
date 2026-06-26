import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const MOCK_BOOKINGS = [
  { id: 'RM-2401', client: 'Priya Sharma', org: 'Sharma & Co.', event: 'Wedding Reception', date: '2024-02-14', guests: 350, venue: 'Grand Durbar Hall', amount: 4850000, status: 'Pending' },
  { id: 'RM-2402', client: 'Arjun Mehta', org: 'Mehta Industries', event: 'Corporate Gala', date: '2024-02-20', guests: 120, venue: 'Maharani Pavilion', amount: 1250000, status: 'Approved' },
  { id: 'RM-2403', client: 'Sunita Kapoor', org: '', event: 'Sangeet Ceremony', date: '2024-03-05', guests: 200, venue: 'Jasmine Terrace', amount: 980000, status: 'Pending' },
  { id: 'RM-2404', client: 'Vikram Rathore', org: 'Rathore Enterprises', event: 'Product Launch', date: '2024-03-12', guests: 80, venue: 'Lotus Boardroom', amount: 620000, status: 'Approved' },
  { id: 'RM-2405', client: 'Deepa Nair', org: '', event: 'Anniversary Banquet', date: '2024-03-18', guests: 60, venue: 'Royal Garden', amount: 450000, status: 'Completed' },
  { id: 'RM-2406', client: 'Rajesh Gupta', org: 'Gupta Trading Co.', event: 'Wedding', date: '2024-04-02', guests: 500, venue: 'Grand Durbar Hall', amount: 6200000, status: 'Pending' },
  { id: 'RM-2407', client: 'Kavya Iyer', org: '', event: 'Mehendi & Haldi', date: '2024-04-10', guests: 150, venue: 'Jasmine Terrace', amount: 780000, status: 'Rejected' },
];

function formatINR(n) {
  return '₹' + n.toLocaleString('en-IN');
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function StatusBadge({ status }) {
  const map = { Pending: 'pending', Approved: 'approved', Rejected: 'rejected', Completed: 'done' };
  return <span className={`adm-badge adm-badge--${map[status] || 'pending'}`}>{status}</span>;
}

const FILTERS = ['All', 'Pending', 'Approved', 'Rejected', 'Completed'];

export default function AdminBookings() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);

  const filtered = bookings.filter(b => {
    const q = search.toLowerCase();
    const matchQ = !q || [b.client, b.org, b.event, b.venue, b.id].join(' ').toLowerCase().includes(q);
    const matchF = filter === 'All' || b.status === filter;
    return matchQ && matchF;
  });

  const updateStatus = (id, status) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

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
        <button className="btn btn--primary" style={{ fontSize: 'var(--fs-sm)' }}>
          + New Booking
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
            placeholder="Search by client, event, venue…"
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
                <th>Amount</th>
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
              ) : filtered.map(b => (
                <tr key={b.id}>
                  <td><span className="adm-table__id">{b.id}</span></td>
                  <td>
                    <div className="adm-table__primary">{b.client}</div>
                    {b.org && <div className="adm-table__secondary">{b.org}</div>}
                  </td>
                  <td>{b.event}</td>
                  <td>{formatDate(b.date)}</td>
                  <td>{b.guests.toLocaleString()}</td>
                  <td>{b.venue}</td>
                  <td><span className="adm-table__amount">{formatINR(b.amount)}</span></td>
                  <td><StatusBadge status={b.status} /></td>
                  <td>
                    <div className="adm-actions-row">
                      <button
                        className="adm-action-btn"
                        title="View details"
                        aria-label={`View ${b.id}`}
                        style={{ fontSize: '0.75rem' }}
                      >
                        👁
                      </button>
                      {b.status === 'Pending' && (
                        <>
                          <button
                            className="adm-action-btn adm-action-btn--approve"
                            title="Approve"
                            onClick={() => updateStatus(b.id, 'Approved')}
                            aria-label={`Approve ${b.id}`}
                          >
                            ✓
                          </button>
                          <button
                            className="adm-action-btn adm-action-btn--reject"
                            title="Reject"
                            onClick={() => updateStatus(b.id, 'Rejected')}
                            aria-label={`Reject ${b.id}`}
                          >
                            ✕
                          </button>
                        </>
                      )}
                      {b.status === 'Approved' && (
                        <button
                          className="adm-action-btn adm-action-btn--done"
                          title="Mark as Completed"
                          onClick={() => updateStatus(b.id, 'Completed')}
                          aria-label={`Complete ${b.id}`}
                          style={{ fontSize: '0.75rem' }}
                        >
                          ✔✔
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer count */}
        <div style={{ padding: '0.75rem 1.5rem', borderTop: '1px solid var(--clr-border-lt)', fontSize: 'var(--fs-xs)', color: 'var(--clr-muted)', display: 'flex', justifyContent: 'space-between' }}>
          <span>Showing {filtered.length} of {bookings.length} requests</span>
          <span>Last updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </div>
  );
}
