import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../About/About.css';
import './Booking.css';

const API = 'http://localhost:5000';

/* ── Static data ─────────────────────────────────────────────────────────── */
const eventTypes = [
  { id: 'wedding',     icon: '💍', label: 'Wedding' },
  { id: 'corporate',  icon: '🏢', label: 'Corporate' },
  { id: 'birthday',   icon: '🎂', label: 'Birthday' },
  { id: 'social',     icon: '🎉', label: 'Social' },
  { id: 'reception',  icon: '🥂', label: 'Reception' },
  { id: 'exhibition', icon: '🖼️', label: 'Exhibition' },
  { id: 'anniversary',icon: '💐', label: 'Anniversary' },
  { id: 'other',      icon: '✨', label: 'Other' },
];

const guestRanges = ['< 50', '50 – 150', '150 – 300', '300 – 500', '500 – 800', '800+'];

const venues = [
  { id: 'darbar',    icon: '🏛️', name: 'Darbar Hall',       cap: 'Up to 800' },
  { id: 'jasmine',   icon: '🌸', name: 'Jasmine Pavilion',  cap: 'Up to 350' },
  { id: 'rooftop',   icon: '🌙', name: 'Rooftop Terrace',   cap: 'Up to 200' },
  { id: 'maharani',  icon: '👑', name: 'Maharani Suite',    cap: 'Up to 80'  },
  { id: 'garden',    icon: '🌿', name: 'Palace Gardens',    cap: 'Up to 500' },
  { id: 'notsure',   icon: '💬', name: 'Help Me Choose',    cap: 'Advisor'   },
];

const packages = [
  {
    id: 'gold',
    name: 'Gold',
    price: '₹1.5L onwards',
    features: 'Venue · Basic décor · Catering (veg)',
    variant: '',
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: '₹3.5L onwards',
    features: 'Venue · Premium décor · Full catering · Photography',
    variant: 'popular',
    badge: 'Most Popular',
  },
  {
    id: 'royal',
    name: 'Royal',
    price: '₹6L onwards',
    features: 'All-in · Live music · Coordination · Lighting',
    variant: 'dark',
  },
  {
    id: 'diamond',
    name: 'Diamond',
    price: 'Custom quote',
    features: 'Fully bespoke · Dedicated manager · VIP transport',
    variant: 'dark',
  },
];

const addons = [
  { id: 'floral',       icon: '🌸', name: 'Floral Décor',         price: 'from ₹30,000' },
  { id: 'photography',  icon: '📸', name: 'Photography & Video',   price: 'from ₹45,000' },
  { id: 'dj',           icon: '🎵', name: 'DJ & Live Music',       price: 'from ₹25,000' },
  { id: 'lighting',     icon: '💡', name: 'Lighting Setup',        price: 'from ₹20,000' },
  { id: 'catering',     icon: '🍽️', name: 'Royal Catering',        price: '₹1,200/person' },
  { id: 'stage',        icon: '🎪', name: 'Stage & Mandap',        price: 'from ₹18,000' },
  { id: 'sound',        icon: '🔊', name: 'Sound System',          price: 'from ₹12,000' },
  { id: 'invitations',  icon: '✉️', name: 'Invitation Design',     price: 'from ₹8,000'  },
  { id: 'transport',    icon: '🚐', name: 'Guest Transport',       price: 'from ₹5,000'  },
  { id: 'coordination', icon: '🎯', name: 'Event Coordination',    price: 'from ₹20,000' },
  { id: 'seating',      icon: '🪑', name: 'Seating Arrangement',   price: 'from ₹15,000' },
  { id: 'cake',         icon: '🎂', name: 'Wedding Cake',          price: 'from ₹8,000'  },
];

/* ── Helpers ─────────────────────────────────────────────────────────────── */
function generateRef() {
  return 'RM-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 5).toUpperCase();
}

const today = new Date().toISOString().split('T')[0];

/* ── Step indicator ──────────────────────────────────────────────────────── */
function Stepper({ step }) {
  const steps = ['Event Details', 'Services', 'Contact Info'];
  return (
    <div className="booking-stepper">
      <div className="booking-stepper__inner container">
        {steps.map((label, i) => {
          const num = i + 1;
          const done   = step > num;
          const active = step === num;
          return (
            <div key={label} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div className={`booking-step ${active ? 'booking-step--active' : ''} ${done ? 'booking-step--done' : ''}`}>
                <div className="booking-step__circle">
                  {done ? '✓' : num}
                </div>
                <span className="booking-step__label">{label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`booking-step__connector ${done ? 'booking-step__connector--done' : ''}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Booking Summary Sidebar ─────────────────────────────────────────────── */
function BookingSummary({ data }) {
  const venue  = venues.find(v => v.id === data.venue);
  const pkg    = packages.find(p => p.id === data.package);
  const evType = eventTypes.find(e => e.id === data.eventType);

  return (
    <aside className="booking-sidebar">
      <div className="booking-summary">
        <div className="booking-summary__head">
          <span className="booking-summary__head-icon">📋</span>
          <span className="booking-summary__head-title">Booking Summary</span>
        </div>
        <div className="booking-summary__body">

          <div className="booking-summary__row">
            <span className="booking-summary__label">Event Type</span>
            <span className={`booking-summary__value ${!evType ? 'booking-summary__value--empty' : ''}`}>
              {evType ? `${evType.icon} ${evType.label}` : 'Not selected'}
            </span>
          </div>

          <div className="booking-summary__divider" />

          <div className="booking-summary__row">
            <span className="booking-summary__label">Preferred Date</span>
            <span className={`booking-summary__value ${!data.date ? 'booking-summary__value--empty' : ''}`}>
              {data.date
                ? new Date(data.date + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
                : 'Not selected'}
            </span>
          </div>

          <div className="booking-summary__divider" />

          <div className="booking-summary__row">
            <span className="booking-summary__label">Guest Count</span>
            <span className={`booking-summary__value ${!data.guestRange ? 'booking-summary__value--empty' : ''}`}>
              {data.guestRange || 'Not selected'}
            </span>
          </div>

          <div className="booking-summary__divider" />

          <div className="booking-summary__row">
            <span className="booking-summary__label">Venue</span>
            <span className={`booking-summary__value ${!venue ? 'booking-summary__value--empty' : ''}`}>
              {venue ? `${venue.icon} ${venue.name}` : 'Not selected'}
            </span>
          </div>

          <div className="booking-summary__divider" />

          <div className="booking-summary__row">
            <span className="booking-summary__label">Package</span>
            <span className={`booking-summary__value ${!pkg ? 'booking-summary__value--empty' : ''}`}>
              {pkg ? `${pkg.name} — ${pkg.price}` : 'Not selected'}
            </span>
          </div>

          {data.addons.length > 0 && (
            <>
              <div className="booking-summary__divider" />
              <div className="booking-summary__row">
                <span className="booking-summary__label">Add-on Services</span>
                <div className="booking-summary__tags">
                  {data.addons.map(id => {
                    const a = addons.find(x => x.id === id);
                    return a ? (
                      <span key={id} className="booking-summary__tag">{a.icon} {a.name}</span>
                    ) : null;
                  })}
                </div>
              </div>
            </>
          )}

        </div>
      </div>

      <div className="booking-trust">
        <p className="booking-trust__title">Why book with us</p>
        {[
          ['✦', 'Free venue tour on request'],
          ['🔒', 'No payment at enquiry stage'],
          ['⚡', 'Response within 24 hours'],
          ['🎯', 'Dedicated event manager'],
          ['💎', 'Best rate guarantee'],
        ].map(([icon, text]) => (
          <div key={text} className="booking-trust__item">
            <span className="booking-trust__item-icon">{icon}</span>
            <span>{text}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   STEP 1 — Event Details
══════════════════════════════════════════════════════════════════════════ */
function Step1({ data, onChange, onNext }) {
  const valid = data.eventType && data.date && data.guestRange && data.venue && data.package;

  return (
    <div className="booking-panel animate-fade-up">
      <div className="booking-panel__head">
        <p className="booking-panel__step-tag">Step 1 of 3</p>
        <h2 className="booking-panel__title">Tell us about your <em>Event</em></h2>
        <p className="booking-panel__subtitle">Help us understand your celebration so we can craft the perfect experience.</p>
      </div>

      <div className="booking-panel__body">

        {/* Event type */}
        <p className="field-section-label">Event Type</p>
        <div className="event-type-grid">
          {eventTypes.map(et => (
            <button
              key={et.id}
              id={`evt-type-${et.id}`}
              className={`event-type-card ${data.eventType === et.id ? 'event-type-card--selected' : ''}`}
              onClick={() => onChange('eventType', et.id)}
              type="button"
              aria-pressed={data.eventType === et.id}
            >
              <span className="event-type-card__icon">{et.icon}</span>
              <span className="event-type-card__label">{et.label}</span>
            </button>
          ))}
        </div>

        {/* Date & Guests */}
        <div className="booking-form__grid" style={{ marginTop: 'var(--sp-6)' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="bk-date">Preferred Date *</label>
            <input
              id="bk-date"
              type="date"
              className="form-input"
              value={data.date}
              min={today}
              onChange={e => onChange('date', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="bk-guests">Approximate Guest Count *</label>
            <select
              id="bk-guests"
              className="form-select"
              value={data.guestRange}
              onChange={e => onChange('guestRange', e.target.value)}
            >
              <option value="">Select guest range…</option>
              {guestRanges.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
        </div>

        {/* Venue preference */}
        <p className="field-section-label" style={{ marginTop: 'var(--sp-6)' }}>Venue Preference</p>
        <div className="venue-cards-grid">
          {venues.map(v => (
            <button
              key={v.id}
              id={`venue-sel-${v.id}`}
              className={`venue-sel-card ${data.venue === v.id ? 'venue-sel-card--selected' : ''}`}
              onClick={() => onChange('venue', v.id)}
              type="button"
              aria-pressed={data.venue === v.id}
            >
              <div className="venue-sel-card__icon">{v.icon}</div>
              <div className="venue-sel-card__name">{v.name}</div>
              <div className="venue-sel-card__cap">{v.cap}</div>
            </button>
          ))}
        </div>

        {/* Package selection */}
        <p className="field-section-label" style={{ marginTop: 'var(--sp-6)' }}>Package Selection</p>
        <div className="pkg-select-grid">
          {packages.map(pkg => (
            <button
              key={pkg.id}
              id={`pkg-sel-${pkg.id}`}
              className={`pkg-select-card ${pkg.variant === 'popular' ? 'pkg-select-card--popular' : ''} ${pkg.variant === 'dark' ? 'pkg-select-card--dark' : ''} ${data.package === pkg.id ? 'pkg-select-card--selected' : ''}`}
              onClick={() => onChange('package', pkg.id)}
              type="button"
              aria-pressed={data.package === pkg.id}
            >
              {pkg.badge && <span className="pkg-select-card__badge">{pkg.badge}</span>}
              <span className="pkg-select-card__check">✓</span>
              <div className="pkg-select-card__name">{pkg.name}</div>
              <div className="pkg-select-card__price">{pkg.price}</div>
              <div className="pkg-select-card__features">{pkg.features}</div>
            </button>
          ))}
        </div>

        <div className="booking-nav booking-nav--end">
          <button
            id="bk-step1-next"
            className="btn btn--primary btn--lg"
            onClick={onNext}
            disabled={!valid}
            title={!valid ? 'Please complete all fields above' : ''}
          >
            Continue to Services →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   STEP 2 — Services
══════════════════════════════════════════════════════════════════════════ */
function Step2({ data, onChange, onBack, onNext }) {
  const toggleAddon = (id) => {
    const current = data.addons;
    if (current.includes(id)) {
      onChange('addons', current.filter(x => x !== id));
    } else {
      onChange('addons', [...current, id]);
    }
  };

  return (
    <div className="booking-panel animate-fade-up">
      <div className="booking-panel__head">
        <p className="booking-panel__step-tag">Step 2 of 3</p>
        <h2 className="booking-panel__title">Personalise your <em>Services</em></h2>
        <p className="booking-panel__subtitle">Select any add-on services to include with your chosen package. These will be quoted separately.</p>
      </div>

      <div className="booking-panel__body">

        <p className="field-section-label">Add-on Services <span style={{ textTransform: 'none', letterSpacing: 0, fontWeight: 400, color: 'var(--clr-muted)', marginLeft: 'var(--sp-2)' }}>— select all that apply</span></p>

        <div className="addon-grid">
          {addons.map(addon => (
            <button
              key={addon.id}
              id={`addon-${addon.id}`}
              className={`addon-card ${data.addons.includes(addon.id) ? 'addon-card--selected' : ''}`}
              onClick={() => toggleAddon(addon.id)}
              type="button"
              aria-pressed={data.addons.includes(addon.id)}
            >
              <span className="addon-card__check">✓</span>
              <span className="addon-card__icon">{addon.icon}</span>
              <div className="addon-card__content">
                <div className="addon-card__name">{addon.name}</div>
                <div className="addon-card__price">{addon.price}</div>
              </div>
            </button>
          ))}
        </div>

        {data.addons.length > 0 && (
          <div style={{ background: 'var(--clr-surface-alt)', border: '1px solid var(--clr-border)', borderLeft: '3px solid var(--clr-gold)', borderRadius: 'var(--r-md)', padding: 'var(--sp-4) var(--sp-5)', marginBottom: 'var(--sp-5)', fontSize: 'var(--fs-sm)', color: 'var(--clr-body)' }}>
            <strong>{data.addons.length} service{data.addons.length > 1 ? 's' : ''} selected</strong> — our team will include detailed pricing in your proposal.
          </div>
        )}

        <div className="form-group">
          <label className="form-label" htmlFor="bk-notes">Special Requests / Notes</label>
          <textarea
            id="bk-notes"
            className="form-textarea"
            rows={5}
            placeholder="Share any theme preferences, dietary requirements, special arrangements, or questions for our team…"
            value={data.notes}
            onChange={e => onChange('notes', e.target.value)}
          />
        </div>

        <div className="booking-nav">
          <button id="bk-step2-back" className="btn btn--secondary" onClick={onBack} type="button">
            ← Back
          </button>
          <button id="bk-step2-next" className="btn btn--primary btn--lg" onClick={onNext} type="button">
            Continue to Contact Info →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   STEP 3 — Contact Info
══════════════════════════════════════════════════════════════════════════ */
function Step3({ data, onChange, onBack, onSubmit, submitting, error }) {
  const valid = data.name.trim() && data.email.trim() && data.phone.trim();

  const venue  = venues.find(v => v.id === data.venue);
  const pkg    = packages.find(p => p.id === data.package);
  const evType = eventTypes.find(e => e.id === data.eventType);

  return (
    <div className="booking-panel animate-fade-up">
      <div className="booking-panel__head">
        <p className="booking-panel__step-tag">Step 3 of 3</p>
        <h2 className="booking-panel__title">Your <em>Contact Details</em></h2>
        <p className="booking-panel__subtitle">Almost there! We'll use these details to confirm your booking and send a tailored proposal.</p>
      </div>

      <div className="booking-panel__body">

        <div className="booking-form__grid">
          <div className="form-group booking-form__full">
            <label className="form-label" htmlFor="bk-name">Full Name *</label>
            <input
              id="bk-name"
              type="text"
              className="form-input"
              placeholder="e.g. Vikram & Anjali Singh"
              value={data.name}
              onChange={e => onChange('name', e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="bk-phone">Phone Number *</label>
            <input
              id="bk-phone"
              type="tel"
              className="form-input"
              placeholder="+91 98765 43210"
              value={data.phone}
              onChange={e => onChange('phone', e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="bk-email">Email Address *</label>
            <input
              id="bk-email"
              type="email"
              className="form-input"
              placeholder="you@example.com"
              value={data.email}
              onChange={e => onChange('email', e.target.value)}
              required
            />
          </div>
        </div>

        {/* Booking summary box */}
        <div style={{ marginTop: 'var(--sp-6)' }}>
          <p className="field-section-label">Booking Summary</p>
          <div style={{
            background: 'var(--clr-surface-alt)',
            border: '1px solid var(--clr-border)',
            borderRadius: 'var(--r-lg)',
            overflow: 'hidden',
          }}>
            {/* Header */}
            <div style={{ background: 'var(--clr-maroon)', padding: 'var(--sp-3) var(--sp-5)', display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
              <span style={{ color: 'var(--clr-gold-lt)', fontSize: 'var(--fs-sm)' }}>✦</span>
              <span style={{ color: '#fff', fontSize: 'var(--fs-sm)', fontWeight: 600, letterSpacing: '0.04em' }}>Your Event Request</span>
            </div>
            {/* Rows */}
            {[
              ['Event Type',    evType  ? `${evType.icon} ${evType.label}`    : '—'],
              ['Date',          data.date ? new Date(data.date + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'],
              ['Guests',        data.guestRange || '—'],
              ['Venue',         venue   ? `${venue.icon} ${venue.name}`       : '—'],
              ['Package',       pkg     ? `${pkg.name} (${pkg.price})`        : '—'],
              ['Add-on Services', data.addons.length > 0
                ? addons.filter(a => data.addons.includes(a.id)).map(a => a.name).join(', ')
                : 'None selected'],
            ].map(([k, v]) => (
              <div key={k} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                gap: 'var(--sp-4)',
                padding: 'var(--sp-3) var(--sp-5)',
                borderBottom: '1px solid var(--clr-border-lt)',
                fontSize: 'var(--fs-sm)',
              }}>
                <span style={{ color: 'var(--clr-muted)', flexShrink: 0 }}>{k}</span>
                <span style={{ color: 'var(--clr-text)', fontWeight: 500, textAlign: 'right', lineHeight: 1.4 }}>{v}</span>
              </div>
            ))}
            <div style={{ padding: 'var(--sp-3) var(--sp-5)', fontSize: 'var(--fs-xs)', color: 'var(--clr-muted)', fontStyle: 'italic' }}>
              * Pricing will be confirmed in your tailored proposal within 24 hours.
            </div>
          </div>
        </div>

        {error && (
          <div style={{ marginTop: 'var(--sp-4)', background: '#FDDEDE', border: '1px solid #F87171', borderRadius: 'var(--r-md)', padding: 'var(--sp-3) var(--sp-5)', fontSize: 'var(--fs-sm)', color: '#991B1B' }}>
            {error}
          </div>
        )}

        <div className="booking-nav">
          <button id="bk-step3-back" className="btn btn--secondary" onClick={onBack} type="button">
            ← Back
          </button>
          <button
            id="bk-submit-btn"
            className="btn btn--gold btn--lg"
            onClick={onSubmit}
            disabled={!valid || submitting}
            type="button"
          >
            {submitting ? 'Submitting…' : '✦ Submit Booking Request'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SUCCESS SCREEN
══════════════════════════════════════════════════════════════════════════ */
function SuccessScreen({ data, refCode }) {
  const venue  = venues.find(v => v.id === data.venue);
  const pkg    = packages.find(p => p.id === data.package);
  const evType = eventTypes.find(e => e.id === data.eventType);

  return (
    <div className="booking-panel" style={{ maxWidth: 680, margin: '0 auto' }}>
      <div className="booking-success">

        <div className="booking-success__icon">✓</div>

        <h2 className="booking-success__title">
          Request Received, <em>{data.name.split(' ')[0]}!</em>
        </h2>

        <div className="booking-success__ref">
          📋 Reference: {refCode}
        </div>

        <p className="booking-success__msg">
          Thank you for choosing <strong>Raj Mahal Palace & Events</strong>. Your booking request has been submitted successfully. Our dedicated events team will review your requirements and reach out within <strong>24 hours</strong> with a personalised proposal.
        </p>

        {/* Summary box */}
        <div className="booking-success__summary">
          <h3 className="booking-success__summary-title">📋 Your Booking Summary</h3>
          {[
            ['Event Type',  evType ? `${evType.icon} ${evType.label}` : '—'],
            ['Date',        data.date ? new Date(data.date + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'],
            ['Guest Count', data.guestRange || '—'],
            ['Venue',       venue  ? `${venue.icon} ${venue.name}`   : '—'],
            ['Package',     pkg    ? `${pkg.name} — ${pkg.price}`    : '—'],
            ['Contact',     `${data.name} · ${data.phone}`],
            ['Email',       data.email],
            ...(data.addons.length > 0 ? [['Add-ons', addons.filter(a => data.addons.includes(a.id)).map(a => a.name).join(', ')]] : []),
          ].map(([k, v]) => (
            <div key={k} className="booking-success__summary-row">
              <span className="booking-success__summary-key">{k}</span>
              <span className="booking-success__summary-val">{v}</span>
            </div>
          ))}
        </div>

        {/* What happens next */}
        <div className="booking-success__timeline">
          {[
            ['Within 1 hour',  'Your request is assigned to a senior event consultant.'],
            ['Within 24 hours','You receive a personalised proposal with pricing breakdown.'],
            ['On confirmation', 'A complimentary venue tour is arranged at your convenience.'],
          ].map(([when, what], i) => (
            <div key={i} className="booking-success__step">
              <div className="booking-success__step-num">{i + 1}</div>
              <div className="booking-success__step-text">
                <strong>{when}</strong>
                {what}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 'var(--sp-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn--primary btn--lg" id="bk-success-home">
            Back to Home
          </Link>
          <a href="tel:+911412345678" className="btn btn--secondary btn--lg" id="bk-success-call">
            📞 Call Us Now
          </a>
        </div>

        <p style={{ marginTop: 'var(--sp-6)', fontSize: 'var(--fs-xs)', color: 'var(--clr-muted)' }}>
          Save your reference number: <strong style={{ color: 'var(--clr-maroon)' }}>{refCode}</strong> — quote it when calling.
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════════════════ */
const emptyData = {
  // Step 1
  eventType: '',
  date: '',
  guestRange: '',
  venue: '',
  package: '',
  // Step 2
  addons: [],
  notes: '',
  // Step 3
  name: '',
  phone: '',
  email: '',
};

export default function Booking() {
  const [step, setStep]       = useState(1);
  const [data, setData]       = useState(emptyData);
  const [submitted, setSubmitted] = useState(false);
  const [refCode, setRefCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]     = useState('');

  const change = (key, val) => setData(d => ({ ...d, [key]: val }));

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    const ref = generateRef();
    try {
      await axios.post(`${API}/api/inquiries`, {
        name:       data.name,
        email:      data.email,
        phone:      data.phone,
        eventType:  eventTypes.find(e => e.id === data.eventType)?.label || data.eventType,
        venue:      venues.find(v => v.id === data.venue)?.name  || data.venue,
        package:    packages.find(p => p.id === data.package)?.name || data.package,
        date:       data.date,
        guestCount: data.guestRange,
        message:    [
          data.notes ? `Notes: ${data.notes}` : '',
          data.addons.length > 0
            ? `Add-ons: ${addons.filter(a => data.addons.includes(a.id)).map(a => a.name).join(', ')}`
            : '',
          `Booking Ref: ${ref}`,
        ].filter(Boolean).join('\n\n'),
      });
    } catch {
      // Proceed even if backend unavailable in demo
    }
    setRefCode(ref);
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div>
      <title>Book Your Event — Raj Mahal</title>

      {/* Page hero */}
      <div className="page-hero" style={{ minHeight: '280px', height: '38vh' }}>
        <div className="page-hero__bg">
          <img src="/hero_palace.png" alt="Raj Mahal Palace" />
          <div className="page-hero__overlay" />
        </div>
        <div className="page-hero__content container">
          <p className="page-hero__eyebrow">Reserve Your Date</p>
          <h1 className="page-hero__title">Book Your <em>Royal Event</em></h1>
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Book Now</span>
          </nav>
        </div>
      </div>

      {/* Stepper — hidden on success */}
      {!submitted && <Stepper step={step} />}

      <div className="booking-page">
        <div className="container">
          {submitted ? (
            <div style={{ paddingTop: 'var(--sp-12)' }}>
              <SuccessScreen data={data} refCode={refCode} />
            </div>
          ) : (
            <div className="booking-body">
              {/* Left: step panel */}
              <div>
                {step === 1 && (
                  <Step1
                    data={data}
                    onChange={change}
                    onNext={() => setStep(2)}
                  />
                )}
                {step === 2 && (
                  <Step2
                    data={data}
                    onChange={change}
                    onBack={() => setStep(1)}
                    onNext={() => setStep(3)}
                  />
                )}
                {step === 3 && (
                  <Step3
                    data={data}
                    onChange={change}
                    onBack={() => setStep(2)}
                    onSubmit={handleSubmit}
                    submitting={submitting}
                    error={error}
                  />
                )}
              </div>

              {/* Right: summary sidebar */}
              <BookingSummary data={data} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
