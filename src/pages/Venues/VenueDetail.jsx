import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../utils/api';
import '../About/About.css';
import './Venues.css';
import './VenueDetail.css';


const venueImages = {
  'darbar-hall': '/darbar_hall.png',
  'jasmine-pavilion': '/jasmine_pavilion.png',
  'rooftop-terrace': '/rooftop_terrace.png',
  'maharani-suite': '/maharani_suite.png',
};

const FALLBACK_VENUES = {
  'darbar-hall': {
    name: 'Darbar Hall', category: 'Grand Ballroom', capacity: 800, area: '12,000 sq ft',
    pricePerDay: 250000,
    description: 'The grandest hall of Raj Mahal — adorned with hand-carved marble pillars, Rajputana frescoes, and a 40-foot gold-leaf ceiling. Perfect for grand royal weddings and state banquets.',
    features: ['Marble flooring', 'Gold-leaf ceiling', '5-ton chandelier', 'In-built stage', 'Green room', 'Pre-function lawn'],
    amenities: ['Wi-Fi', 'Air-conditioning', 'Valet parking', 'In-house catering', 'AV system', 'Bridal suite'],
  },
  'jasmine-pavilion': {
    name: 'Jasmine Pavilion', category: 'Garden Venue', capacity: 350, area: '6,500 sq ft',
    pricePerDay: 150000,
    description: 'An elegant indoor-outdoor pavilion surrounded by manicured jasmine gardens. The most sought-after venue for intimate weddings and reception ceremonies.',
    features: ['Garden-view glass walls', 'Outdoor terrace', 'Bridal suite', 'Floral décor included', 'Private garden access', 'Fountain courtyard'],
    amenities: ['Wi-Fi', 'Climate control', 'Valet parking', 'In-house catering', 'Sound system', 'Changing rooms'],
  },
  'rooftop-terrace': {
    name: 'Rooftop Terrace', category: 'Open Air', capacity: 200, area: '4,000 sq ft',
    pricePerDay: 90000,
    description: 'An open-air terrace with panoramic views of the Jaipur skyline and the Aravalli hills at sunset. Perfect for cocktail evenings and Sangeet celebrations.',
    features: ['360° skyline view', 'Retractable shade canopy', 'Outdoor bar counter', 'Custom lighting rig', 'Lounge seating area', 'Backdrop for photos'],
    amenities: ['Wi-Fi', 'Outdoor sound system', 'Valet parking', 'Bar setup', 'Event lighting', 'Weather backup plan'],
  },
  'maharani-suite': {
    name: 'Maharani Suite', category: 'Private Suite', capacity: 80, area: '2,200 sq ft',
    pricePerDay: 55000,
    description: 'An exclusive boardroom-style venue styled in deep teal and antique gold — ideal for high-level corporate meetings, private dinners, and milestone celebrations.',
    features: ['Boardroom layout', 'Private lounge', 'Dedicated butler', 'Projector & screen', 'Private bar', 'Adjoining garden access'],
    amenities: ['Wi-Fi', 'Video conferencing', 'Valet parking', 'Butler service', 'Projector', 'Private dining'],
  },
};

export default function VenueDetail() {
  const { slug } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoading(true);
    setVenue(null);
    api.get('/api/venues/${slug}')
      .then(r => {
        // Backend wraps as { success, venue } — support both shapes
        const v = r.data?.venue || r.data;
        setVenue(v && v.name ? v : FALLBACK_VENUES[slug] || null);
      })
      .catch(() => {
        // API down or venue not in DB yet — use static fallback
        setVenue(FALLBACK_VENUES[slug] || null);
      })
      .finally(() => setLoading(false));
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
