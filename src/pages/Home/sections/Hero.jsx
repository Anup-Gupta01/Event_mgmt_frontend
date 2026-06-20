import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="hero" aria-label="Hero">
      {/* Background image */}
      <div className="hero__bg">
        <img src="/hero_palace.png" alt="Raj Mahal Palace exterior at golden hour" className="hero__bg-img" />
        <div className="hero__overlay" />
        <div className="hero__gradient" />
      </div>

      {/* Content */}
      <div className="hero__content container">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-line" />
          <span>Jaipur's Premier Palace Venue</span>
          <span className="hero__eyebrow-line" />
        </div>

        <h1 className="hero__title">
          Where Royalty<br />
          <em>Meets Celebration</em>
        </h1>

        <p className="hero__subtitle">
          Seven decades of crafting unforgettable events within the grandeur of Rajasthan's most distinguished palace. Weddings, galas, and gatherings unlike any other.
        </p>

        <div className="hero__actions">
          <Link to="/contact" id="hero-book-btn" className="btn btn--primary btn--lg">
            Plan Your Event
          </Link>
          <Link to="/venues" id="hero-venues-btn" className="btn btn--ghost btn--lg">
            Explore Venues
          </Link>
        </div>

        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-number">77<span className="hero__stat-plus">+</span></span>
            <span className="hero__stat-label">Years of Legacy</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-number">12,000<span className="hero__stat-plus">+</span></span>
            <span className="hero__stat-label">Events Hosted</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-number">4</span>
            <span className="hero__stat-label">Distinct Venues</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-number">98<span className="hero__stat-plus">%</span></span>
            <span className="hero__stat-label">Guest Satisfaction</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll">
        <span className="hero__scroll-text">Scroll</span>
        <span className="hero__scroll-arrow" />
      </div>
    </section>
  );
}
