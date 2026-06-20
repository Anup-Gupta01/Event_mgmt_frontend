import { Link } from 'react-router-dom';
import './CtaBanner.css';

export default function CtaBanner() {
  return (
    <section className="cta-banner" id="cta-banner" aria-label="Call to action">
      <div className="cta-banner__bg">
        <img src="/wedding_gallery.png" alt="" aria-hidden="true" />
        <div className="cta-banner__overlay" />
      </div>
      <div className="cta-banner__content container">
        <p className="cta-banner__eyebrow">Begin Your Journey</p>
        <h2 className="cta-banner__title">
          Your Royal Event<br />
          <em>Awaits at Raj Mahal</em>
        </h2>
        <p className="cta-banner__subtitle">
          Speak with our event specialists today. We respond within 24 hours and offer complimentary venue tours by appointment.
        </p>
        <div className="cta-banner__actions">
          <Link to="/contact" id="cta-plan-btn" className="btn btn--gold btn--lg">
            Plan My Event
          </Link>
          <a href="tel:+911412345678" id="cta-call-btn" className="btn btn--ghost btn--lg">
            Call Us: +91 141 234 5678
          </a>
        </div>
        <p className="cta-banner__note">
          ✦ Complimentary consultation &nbsp;·&nbsp; ✦ No booking fee &nbsp;·&nbsp; ✦ Flexible packages
        </p>
      </div>
    </section>
  );
}
