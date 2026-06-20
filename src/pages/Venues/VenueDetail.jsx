import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../About/About.css';
import './Venues.css';
import './VenueDetail.css';

const API = 'http://localhost:5000';

const venueImages = {
  'darbar-hall': '/darbar_hall.png',
  'jasmine-pavilion': '/jasmine_pavilion.png',
  'rooftop-terrace': '/rooftop_terrace.png',
  'maharani-suite': '/maharani_suite.png',
};

export default function VenueDetail() {
  const { slug } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/api/venues/${slug}`)
      .then(r => { setVenue(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="page-loading">Loading venue details...</div>;
  if (!venue) return (
    <div style={{ padding: '4rem', textAlign: 'center' }}>
      <h2>Venue not found</h2>
      <Link to="/venues" className="btn btn--primary" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>Back to Venues</Link>
    </div>
  );

  return (
    <div>
      {/* Hero */}
      <div className="page-hero" style={{ height: '60vh' }}>
        <div className="page-hero__bg">
          <img src={venueImages[slug] || '/hero_palace.png'} alt={venue.name} />
          <div className="page-hero__overlay" />
        </div>
        <div className="page-hero__content container">
          <p className="page-hero__eyebrow">{venue.category} Venue</p>
          <h1 className="page-hero__title">{venue.name}</h1>
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span>
            <Link to="/venues">Venues</Link> <span>/</span>
            <span>{venue.name}</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <section className="section">
        <div className="container">
          <div className="vd-grid">
            {/* Main */}
            <div className="vd-main">
              <h2 className="vd-section-title">About this Venue</h2>
              <p className="vd-desc">{venue.description}</p>

              {/* Meta strip */}
              <div className="vd-meta-strip">
                <div className="vd-meta-item">
                  <span className="vd-meta-icon">👥</span>
                  <div>
                    <p className="vd-meta-label">Capacity</p>
                    <p className="vd-meta-value">Up to {venue.capacity.toLocaleString()} guests</p>
                  </div>
                </div>
                <div className="vd-meta-item">
                  <span className="vd-meta-icon">📐</span>
                  <div>
                    <p className="vd-meta-label">Area</p>
                    <p className="vd-meta-value">{venue.area}</p>
                  </div>
                </div>
                <div className="vd-meta-item">
                  <span className="vd-meta-icon">💰</span>
                  <div>
                    <p className="vd-meta-label">Starting From</p>
                    <p className="vd-meta-value">₹{venue.pricePerDay.toLocaleString('en-IN')} / day</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <h3 className="vd-section-title">Venue Features</h3>
              <ul className="vd-features">
                {venue.features.map((f) => (
                  <li key={f} className="vd-feature">
                    <span className="vd-feature-icon">✦</span> {f}
                  </li>
                ))}
              </ul>

              {/* Amenities */}
              {venue.amenities && (
                <>
                  <h3 className="vd-section-title">Amenities</h3>
                  <ul className="vd-features">
                    {venue.amenities.map((a) => (
                      <li key={a} className="vd-feature">
                        <span className="vd-feature-icon">✓</span> {a}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {/* Sidebar */}
            <aside className="vd-sidebar">
              <div className="vd-booking-card">
                <h3 className="vd-booking-card__title">Book this Venue</h3>
                <p className="vd-booking-card__price">
                  ₹{venue.pricePerDay.toLocaleString('en-IN')}
                  <span> / day</span>
                </p>
                <p className="vd-booking-card__note">Prices vary by package & date. Contact us for a custom quote.</p>
                <Link to={`/contact?venue=${encodeURIComponent(venue.name)}`} className="btn btn--primary" style={{ width: '100%', justifyContent: 'center', marginBottom: '0.75rem' }}>
                  Request a Quote
                </Link>
                <a href="tel:+911412345678" className="btn btn--secondary" style={{ width: '100%', justifyContent: 'center' }}>
                  Call Us Now
                </a>
                <div className="vd-booking-card__features">
                  <p>✓ Free venue tour</p>
                  <p>✓ Flexible packages</p>
                  <p>✓ 24-hr response</p>
                </div>
              </div>

              <div className="vd-other-venues">
                <h4>Other Venues</h4>
                <Link to="/venues/darbar-hall">Darbar Hall</Link>
                <Link to="/venues/jasmine-pavilion">Jasmine Pavilion</Link>
                <Link to="/venues/rooftop-terrace">Rooftop Terrace</Link>
                <Link to="/venues/maharani-suite">Maharani Suite</Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
