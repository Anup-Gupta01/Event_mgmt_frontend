import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../../utils/api';
import '../About/About.css';
import './Contact.css';


const eventTypes = ['Wedding', 'Corporate', 'Social Event', 'Exhibition', 'Birthday', 'Anniversary', 'Other'];
const venueOptions = ['Darbar Hall', 'Jasmine Pavilion', 'Rooftop Terrace', 'Maharani Suite', 'Not sure yet'];

const contactInfo = [
  {
    icon: '📍',
    label: 'Our Address',
    lines: ['Raj Mahal Palace & Events', 'Palace Road, Near City Palace', 'Jaipur, Rajasthan — 302 001'],
  },
  {
    icon: '📞',
    label: 'Phone',
    lines: ['+91 141 234 5678', '+91 98765 43210 (Events)'],
    href: 'tel:+911412345678',
  },
  {
    icon: '💬',
    label: 'WhatsApp',
    lines: ['+91 98765 43210'],
    href: 'https://wa.me/919876543210',
    whatsapp: true,
  },
  {
    icon: '✉️',
    label: 'Email',
    lines: ['events@rajmahal.in'],
    href: 'mailto:events@rajmahal.in',
  },
  {
    icon: '🕐',
    label: 'Office Hours',
    lines: ['Mon – Sat: 9:00 AM – 7:00 PM', 'Sunday: 10:00 AM – 4:00 PM', 'Public Holidays: By appointment'],
  },
];

export default function Contact() {
  const [params] = useSearchParams();
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    eventType: '', venue: params.get('venue') || '',
    date: '', guestCount: '', message: '',
    package: params.get('package') || '',
    service: params.get('service') || '',
  });
  const [status, setStatus] = useState(null);
  const [error, setError] = useState('');

  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      await api.post('/api/inquiries', form);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err.response?.data?.error || 'Something went wrong. Please call us directly.');
    }
  };

  return (
    <div>
      <title>Contact Us — Raj Mahal</title>

      {/* Hero */}
      <div className="page-hero">
        <div className="page-hero__bg">
          <img src="/hero_palace.png" alt="Raj Mahal" />
          <div className="page-hero__overlay" />
        </div>
        <div className="page-hero__content container">
          <p className="page-hero__eyebrow">Get in Touch</p>
          <h1 className="page-hero__title">Begin Your <em>Royal Journey</em></h1>
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Contact</span>
          </nav>
        </div>
      </div>

      {/* Quick contact bar */}
      <div className="contact-quick-bar">
        <div className="container">
          <div className="contact-quick-bar__inner">
            <a href="tel:+911412345678" className="contact-quick-bar__item">
              <span>📞</span> <span>+91 141 234 5678</span>
            </a>
            <div className="contact-quick-bar__sep" />
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="contact-quick-bar__item contact-quick-bar__item--wa">
              <span>💬</span> <span>WhatsApp Us</span>
            </a>
            <div className="contact-quick-bar__sep" />
            <a href="mailto:events@rajmahal.in" className="contact-quick-bar__item">
              <span>✉️</span> <span>events@rajmahal.in</span>
            </a>
            <div className="contact-quick-bar__sep" />
            <span className="contact-quick-bar__item contact-quick-bar__item--hours">
              <span>🕐</span> <span>Mon–Sat: 9AM–7PM</span>
            </span>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-grid">

            {/* Form */}
            <div className="contact-form-wrap">
              <h2 className="contact-form-title">Event Enquiry Form</h2>
              <p className="contact-form-sub">Our events team responds within 24 hours. Complimentary venue tours available by appointment.</p>

              {status === 'success' ? (
                <div className="contact-success">
                  <span className="contact-success__icon">✓</span>
                  <h3>Your enquiry has been submitted!</h3>
                  <p>Thank you, <strong>{form.name.split(' ')[0]}</strong>. Our events team will be in touch within 24 hours. We look forward to making your occasion truly royal.</p>
                  <button
                    onClick={() => { setStatus(null); setForm(f => ({ ...f, name: '', email: '', phone: '', message: '' })); }}
                    className="btn btn--secondary"
                    style={{ marginTop: '1rem' }}
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={submit} noValidate>
                  <div className="contact-form__row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="cf-name">Full Name *</label>
                      <input id="cf-name" name="name" className="form-input" type="text" placeholder="e.g. Vikram & Anjali Singh" value={form.name} onChange={handle} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="cf-email">Email Address *</label>
                      <input id="cf-email" name="email" className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={handle} required />
                    </div>
                  </div>

                  <div className="contact-form__row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="cf-phone">Phone Number</label>
                      <input id="cf-phone" name="phone" className="form-input" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={handle} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="cf-event-type">Event Type *</label>
                      <select id="cf-event-type" name="eventType" className="form-select" value={form.eventType} onChange={handle} required>
                        <option value="">Select event type…</option>
                        {eventTypes.map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="contact-form__row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="cf-venue">Preferred Venue</label>
                      <select id="cf-venue" name="venue" className="form-select" value={form.venue} onChange={handle}>
                        <option value="">Select a venue…</option>
                        {venueOptions.map(v => <option key={v}>{v}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="cf-package">Interested Package</label>
                      <select id="cf-package" name="package" className="form-select" value={form.package} onChange={handle}>
                        <option value="">Select package…</option>
                        <option>Gold</option>
                        <option>Platinum</option>
                        <option>Royal</option>
                        <option>Diamond</option>
                        <option>Custom / Not sure</option>
                      </select>
                    </div>
                  </div>

                  <div className="contact-form__row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="cf-date">Preferred Date *</label>
                      <input id="cf-date" name="date" className="form-input" type="date" value={form.date} onChange={handle} required min={new Date().toISOString().split('T')[0]} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="cf-guests">Expected Guests</label>
                      <input id="cf-guests" name="guestCount" className="form-input" type="number" placeholder="e.g. 350" value={form.guestCount} onChange={handle} min="1" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="cf-message">Tell us about your event</label>
                    <textarea id="cf-message" name="message" className="form-textarea" placeholder="Share any special requirements, theme preferences, or questions…" value={form.message} onChange={handle} rows={5} />
                  </div>

                  {status === 'error' && (
                    <div className="contact-error">{error}</div>
                  )}

                  <button
                    id="contact-submit-btn"
                    type="submit"
                    className="btn btn--primary btn--lg"
                    disabled={status === 'loading'}
                    style={{ width: '100%', justifyContent: 'center', marginTop: 'var(--sp-2)' }}
                  >
                    {status === 'loading' ? 'Submitting…' : 'Submit Enquiry →'}
                  </button>
                </form>
              )}
            </div>

            {/* Info sidebar */}
            <aside className="contact-info">
              {contactInfo.map((item, i) => (
                <div key={i} className="contact-info__card">
                  <div className="contact-info__icon-wrap">
                    <span className="contact-info__icon">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className="contact-info__title">{item.label}</h3>
                    {item.href ? (
                      <a href={item.href} className="contact-info__link" target={item.whatsapp ? '_blank' : undefined} rel={item.whatsapp ? 'noreferrer' : undefined}>
                        {item.lines[0]}
                        {item.lines.length > 1 && <><br /><span style={{ opacity: 0.7 }}>{item.lines[1]}</span></>}
                      </a>
                    ) : (
                      <address className="contact-info__address">
                        {item.lines.map((l, j) => <span key={j}>{l}<br /></span>)}
                      </address>
                    )}
                  </div>
                </div>
              ))}

              <div className="contact-info__perks">
                <h3 className="contact-info__title" style={{ marginBottom: 'var(--sp-4)' }}>Why Book Directly?</h3>
                {['Best rate guarantee', 'Free venue tour', 'Priority date hold', 'Dedicated event manager', 'Bespoke package quotes'].map((p) => (
                  <div key={p} className="contact-info__perk">
                    <span className="contact-info__perk-icon">✦</span>
                    <span>{p}</span>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="contact-map">
                <div className="contact-map__placeholder">
                  <span>📍</span>
                  <p>Palace Road, Near City Palace, Jaipur</p>
                  <a
                    href="https://maps.google.com/?q=City+Palace+Jaipur"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn--secondary"
                    style={{ marginTop: 'var(--sp-3)', fontSize: 'var(--fs-xs)' }}
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
