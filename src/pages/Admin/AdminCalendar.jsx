import { useState } from 'react';
import './Admin.css';

/* ── Helpers ─────────────────────────────────────────────────────────────── */
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDay(year, month) {
  return new Date(year, month, 1).getDay();
}

/* Seed data: events keyed by "YYYY-MM-DD" */
const SEED_EVENTS = {
  '2024-02-14': [{ label: 'Sharma Wedding', type: 'booked' }],
  '2024-02-15': [{ label: 'Sharma Wedding', type: 'booked' }],
  '2024-02-20': [{ label: 'Mehta Corp Gala', type: 'booked' }],
  '2024-02-22': [{ label: 'Held slot', type: 'pending' }],
  '2024-02-25': [{ label: 'Maintenance', type: 'blocked' }],
  '2024-02-28': [{ label: 'Kapoor enquiry', type: 'pending' }],
  '2024-03-05': [{ label: 'Kapoor Sangeet', type: 'booked' }],
  '2024-03-06': [{ label: 'Kapoor Sangeet', type: 'booked' }],
  '2024-03-12': [{ label: 'Rathore Launch', type: 'booked' }],
  '2024-03-15': [{ label: 'Blocked', type: 'blocked' }],
  '2024-03-18': [{ label: 'Nair Anniversary', type: 'booked' }],
};

const UPCOMING = [
  { day: '14', mon: 'Feb', name: 'Sharma Wedding', meta: 'Grand Durbar · 350 pax' },
  { day: '20', mon: 'Feb', name: 'Mehta Corp Gala', meta: 'Maharani Pavilion · 120 pax' },
  { day: '05', mon: 'Mar', name: 'Kapoor Sangeet', meta: 'Jasmine Terrace · 200 pax' },
  { day: '12', mon: 'Mar', name: 'Rathore Launch', meta: 'Lotus Boardroom · 80 pax' },
];

export default function AdminCalendar() {
  const today = new Date();
  const [year,  setYear]  = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [events, setEvents] = useState(SEED_EVENTS);

  /* Block date form */
  const [blockDate,   setBlockDate]   = useState('');
  const [blockReason, setBlockReason] = useState('');
  const [blockMsg,    setBlockMsg]    = useState('');

  /* Navigation */
  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else              setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else               setMonth(m => m + 1);
  };

  /* Build calendar grid */
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay    = getFirstDay(year, month);
  const prevDays    = getDaysInMonth(year, month - 1 < 0 ? 11 : month - 1);

  const cells = [];
  // Leading cells from prev month
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: prevDays - i, current: false });
  }
  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, current: true });
  }
  // Trailing cells
  const trailing = 42 - cells.length;
  for (let d = 1; d <= trailing; d++) {
    cells.push({ day: d, current: false });
  }

  /* Key for event lookup */
  const dayKey = (d) => {
    const m = String(month + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${year}-${m}-${dd}`;
  };

  const todayKey = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;

  /* Determine day class */
  const dayClass = (cell) => {
    if (!cell.current) return 'adm-cal-day adm-cal-day--other-month';
    const k = dayKey(cell.day);
    const evs = events[k] || [];
    let cls = 'adm-cal-day';
    if (k === todayKey) cls += ' adm-cal-day--today';
    if (evs.some(e => e.type === 'booked'))  cls += ' adm-cal-day--booked';
    if (evs.some(e => e.type === 'pending')) cls += ' adm-cal-day--pending';
    if (evs.some(e => e.type === 'blocked')) cls += ' adm-cal-day--blocked';
    return cls;
  };

  /* Block a date */
  const handleBlock = (e) => {
    e.preventDefault();
    if (!blockDate) return;
    setEvents(prev => ({
      ...prev,
      [blockDate]: [
        ...(prev[blockDate] || []),
        { label: blockReason || 'Blocked', type: 'blocked' },
      ],
    }));
    setBlockMsg(`✓ ${blockDate} has been blocked.`);
    setBlockDate('');
    setBlockReason('');
    setTimeout(() => setBlockMsg(''), 3000);
  };

  /* Remove a block */
  const removeBlock = (key) => {
    setEvents(prev => {
      const updated = (prev[key] || []).filter(e => e.type !== 'blocked');
      if (updated.length === 0) {
        const { [key]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: updated };
    });
  };

  /* Count summary */
  const allKeys = Object.keys(events);
  const bookedCount  = allKeys.filter(k => events[k].some(e => e.type === 'booked')).length;
  const pendingCount = allKeys.filter(k => events[k].some(e => e.type === 'pending')).length;
  const blockedCount = allKeys.filter(k => events[k].some(e => e.type === 'blocked')).length;

  return (
    <div>
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Availability Calendar</h1>
          <p className="adm-page-sub">
            {bookedCount} booked · {pendingCount} pending · {blockedCount} blocked
          </p>
        </div>
      </div>

      <div className="adm-cal-layout">
        {/* ── Main calendar ──────────────────────────────────────── */}
        <div className="adm-cal-card">
          {/* Calendar header */}
          <div className="adm-cal-header">
            <div className="adm-cal-month">
              {MONTHS[month]} {year}
            </div>
            <div style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'center' }}>
              <button
                className="btn btn--secondary"
                style={{ fontSize: 'var(--fs-xs)', padding: '0.3rem 0.8rem' }}
                onClick={() => { setYear(today.getFullYear()); setMonth(today.getMonth()); }}
              >
                Today
              </button>
              <div className="adm-cal-nav">
                <button className="adm-cal-nav-btn" onClick={prevMonth} aria-label="Previous month">‹</button>
                <button className="adm-cal-nav-btn" onClick={nextMonth} aria-label="Next month">›</button>
              </div>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="adm-cal-weekdays">
            {DAYS.map(d => (
              <div key={d} className="adm-cal-weekday">{d}</div>
            ))}
          </div>

          {/* Day grid */}
          <div className="adm-cal-grid">
            {cells.map((cell, idx) => {
              const k = cell.current ? dayKey(cell.day) : null;
              const evs = k ? (events[k] || []) : [];
              return (
                <div key={idx} className={dayClass(cell)}>
                  <div className="adm-cal-day__num">{cell.day}</div>
                  <div className="adm-cal-day__events">
                    {evs.slice(0, 2).map((ev, i) => (
                      <div
                        key={i}
                        className={`adm-cal-event adm-cal-event--${ev.type}`}
                        title={ev.label}
                        style={{ cursor: ev.type === 'blocked' ? 'pointer' : 'default' }}
                        onClick={() => ev.type === 'blocked' && k && removeBlock(k)}
                      >
                        {ev.label}
                        {ev.type === 'blocked' && <span style={{ marginLeft: '2px', opacity: 0.6 }}>×</span>}
                      </div>
                    ))}
                    {evs.length > 2 && (
                      <div style={{ fontSize: '0.58rem', color: 'var(--clr-muted)', paddingLeft: '4px' }}>
                        +{evs.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="adm-cal-legend">
            {[
              { cls: 'available', label: 'Available' },
              { cls: 'booked',    label: 'Booked' },
              { cls: 'pending',   label: 'Pending' },
              { cls: 'blocked',   label: 'Blocked / Closed' },
            ].map(l => (
              <div key={l.cls} className="adm-cal-legend-item">
                <div className={`adm-cal-legend-dot adm-cal-legend-dot--${l.cls}`} />
                {l.label}
              </div>
            ))}
            <div className="adm-cal-legend-item" style={{ marginLeft: 'auto', color: 'var(--clr-muted)', fontSize: '0.65rem' }}>
              Click a <strong>Blocked</strong> label to remove it
            </div>
          </div>
        </div>

        {/* ── Right panel ─────────────────────────────────────────── */}
        <div className="adm-cal-panel">
          {/* Block date form */}
          <div className="adm-cal-block-card">
            <div className="adm-cal-block-title">Block a Date</div>
            <form className="adm-cal-block-form" onSubmit={handleBlock}>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: 'var(--fs-xs)' }}>Date *</label>
                <input
                  id="block-date-input"
                  type="date"
                  className="adm-cal-block-input"
                  value={blockDate}
                  onChange={e => setBlockDate(e.target.value)}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: 'var(--fs-xs)' }}>Reason (optional)</label>
                <input
                  id="block-reason-input"
                  type="text"
                  className="adm-cal-block-input"
                  value={blockReason}
                  onChange={e => setBlockReason(e.target.value)}
                  placeholder="e.g. Venue maintenance"
                />
              </div>
              <button
                id="block-date-btn"
                type="submit"
                className="btn btn--primary"
                style={{ width: '100%', fontSize: 'var(--fs-sm)' }}
              >
                🚫 Block Date
              </button>
              {blockMsg && (
                <div style={{
                  padding: 'var(--sp-2) var(--sp-3)',
                  background: '#D1F7E3',
                  color: '#166534',
                  borderRadius: 'var(--r-sm)',
                  fontSize: 'var(--fs-xs)',
                  fontWeight: 500,
                }}>
                  {blockMsg}
                </div>
              )}
            </form>
          </div>

          {/* Summary mini-stats */}
          <div className="adm-cal-block-card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-3)' }}>
            {[
              { label: 'Booked Days', val: bookedCount,  bg: '#D1F7E3', color: '#166534' },
              { label: 'Pending',     val: pendingCount, bg: '#FFF3CD', color: '#856404' },
              { label: 'Blocked',     val: blockedCount, bg: '#F0F0F0', color: '#555' },
              { label: 'Available',   val: daysInMonth - bookedCount - pendingCount - blockedCount,  bg: 'var(--clr-surface-alt)', color: 'var(--clr-muted)' },
            ].map(s => (
              <div key={s.label} style={{
                background: s.bg, borderRadius: 'var(--r-md)',
                padding: 'var(--sp-3)', textAlign: 'center',
              }}>
                <div style={{ fontFamily: 'var(--ff-serif)', fontSize: 'var(--fs-2xl)', color: s.color, lineHeight: 1 }}>
                  {s.val}
                </div>
                <div style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: s.color, opacity: 0.75, marginTop: '4px' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming events */}
          <div className="adm-upcoming-card">
            <div className="adm-cal-block-title" style={{ marginBottom: 'var(--sp-3)' }}>
              Upcoming Events
            </div>
            {UPCOMING.map(ev => (
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
