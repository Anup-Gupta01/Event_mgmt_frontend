import { Link } from 'react-router-dom';
import './ContactSection.css';

const info = [
  { icon: '📍', label: 'Address', value: 'Palace Road, Near City Palace, Jaipur, Rajasthan — 302 001' },
  { icon: '📞', label: 'Phone', value: '+91 141 234 5678', href: 'tel:+911412345678' },
  { icon: '💬', label: 'WhatsApp', value: '+91 98765 43210', href: 'https://wa.me/919876543210' },
  { icon: '✉️', label: 'Email', value: 'events@rajmahal.in', href: 'mailto:events@rajmahal.in' },
  { icon: '🕐', label: 'Hours', value: 'Mon–Sat: 9AM–7PM · Sun: 10AM–4PM' },
];

export default function ContactSection() {
  return (
    <section className="contact-strip section" id="contact-strip">
      <div className="container">
        <div className="contact-strip__inner">
          <div className="contact-strip__left">
            <p className="section-tag">Get in Touch</p>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 'var(--sp-4)' }}>
              Begin Your <em>Royal Journey</em>
            </h2>
            <p style={{ color: 'var(--clr-muted)', fontSize: 'var(--fs-md)', lineHeight: 1.7, maxWidth: '44ch' }}>
              Speak to our events team today. We offer complimentary venue tours, bespoke planning consultations, and guaranteed best-rate pricing.
            </p>
            <div className="contact-strip__actions">
              <Link to="/contact" id="home-contact-enquire-btn" className="btn btn--primary btn--lg">
                Send Enquiry →
              </Link>
              <a href="tel:+911412345678" className="btn btn--secondary btn--lg">
                📞 Call Us Now
              </a>
            </div>
          </div>

          <div className="contact-strip__right">
            {info.map((item, i) => (
              <div key={i} className="contact-strip__item">
                <span className="contact-strip__icon">{item.icon}</span>
                <div>
                  <p className="contact-strip__label">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="contact-strip__value contact-strip__value--link">
                      {item.value}
                    </a>
                  ) : (
                    <p className="contact-strip__value">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
