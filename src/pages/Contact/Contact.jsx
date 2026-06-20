import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../About/About.css';
import './Contact.css';

const API = 'http://localhost:5000';

const eventTypes = ['Wedding', 'Corporate', 'Social Event', 'Exhibition', 'Birthday', 'Anniversary', 'Other'];
const venueOptions = ['Darbar Hall', 'Jasmine Pavilion', 'Rooftop Terrace', 'Maharani Suite', 'Not sure yet'];

export default function Contact() {
  const [params] = useSearchParams();
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    eventType: '', venue: params.get('venue') || '',
    date: '', guestCount: '', message: '',
    package: params.get('package') || '',
  });
  const [status, setStatus] = useState(null); // 'loading' | 'success' | 'error'
  const [error, setError] = useState('');

  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      await axios.post(`${API}/api/inquiries`, form);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err.response?.data?.error || 'Something went wrong. Please call us directly.');
    }
  };

  return (
    <div>
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

      <section className="section">
        <div className="container">
          <div className="contact-grid">

            {/* Form */}
            <div className="contact-form-wrap">
              <h2 className="contact-form-title">Event Enquiry Form</h2>
              <p className="contact-form-sub">Our events team will respond within 24 hours. We offer complimentary venue tours by appointment.</p>

              {status === 'success' ? (
                <div className="contact-success">
                  <span className="contact-success__icon">✓</span>
                  <h3>Your enquiry has been submitted!</h3>
                  <p>Thank you, <strong>{form.name.split(' ')[0]}</strong>. Our events team will be in touch within 24 hours. We look forward to making your occasion truly royal.</p>
                  <button onClick={() => { setStatus(null); setForm(f => ({ ...f, name:'', email:'', phone:'', message:'' })); }} className="btn btn--secondary" style={{ marginTop: '1rem' }}>
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
              <div className="contact-info__card">
                <h3 className="contact-info__title">Visit Us</h3>
                <address className="contact-info__address">
                  Raj Mahal Palace & Events<br />
                  Palace Road, Near City Palace<br />
                  Jaipur, Rajasthan — 302 001
                </address>
              </div>

              <div className="contact-info__card">
                <h3 className="contact-info__title">Get in Touch</h3>
                <div className="contact-info__links">
                  <a href="tel:+911412345678">📞 +91 141 234 5678</a>
                  <a href="tel:+919876543210">📞 +91 98765 43210 (Events)</a>
                  <a href="mailto:events@rajmahal.in">✉️ events@rajmahal.in</a>
                </div>
              </div>

              <div className="contact-info__card">
                <h3 className="contact-info__title">Office Hours</h3>
                <div className="contact-info__hours">
                  <div><span>Mon – Sat</span><span>9:00 AM – 7:00 PM</span></div>
                  <div><span>Sunday</span><span>10:00 AM – 4:00 PM</span></div>
                  <div><span>Public Holidays</span><span>By appointment</span></div>
                </div>
              </div>

              <div className="contact-info__card">
                <h3 className="contact-info__title">Why Book Directly?</h3>
                <ul className="contact-info__perks">
                  <li><span>✦</span> Best rate guarantee</li>
                  <li><span>✦</span> Free venue tour</li>
                  <li><span>✦</span> Priority date hold</li>
                  <li><span>✦</span> Dedicated event manager</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
