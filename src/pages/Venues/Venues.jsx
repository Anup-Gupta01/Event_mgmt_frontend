import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import './Venues.css';
import '../About/About.css';


const fallback = [
  {
    id: '1',
    name: 'Darbar Hall',
    slug: 'darbar-hall',
    capacity: 800,
    area: '12,000 sq ft',
    category: 'Grand Ballroom',
    tagline: "Jaipur's Most Iconic Grand Hall",
    description: 'The grandest hall of Raj Mahal — adorned with hand-carved marble pillars, Rajputana frescoes, and a 40-foot gold-leaf ceiling. Perfect for grand royal weddings and state banquets. The hall features an in-built raised stage and two private green rooms for performers.',
    features: ['Marble flooring', 'Gold-leaf ceiling', '5-ton chandelier', 'In-built stage', 'Green room', 'Pre-function lawn'],
    facilities: ['Wi-Fi', 'Air-conditioning', 'Valet parking', 'In-house catering', 'AV system', 'Bridal suite'],
    pricePerDay: 250000,
    image: '/darbar_hall.png',
    highlight: '40-ft Gold-Leaf Ceiling',
    type: 'Indoor',
  },
  {
    id: '2',
    name: 'Jasmine Pavilion',
    slug: 'jasmine-pavilion',
    capacity: 350,
    area: '6,500 sq ft',
    category: 'Garden Venue',
    tagline: 'Intimate Elegance Amid Blooming Gardens',
    description: 'An elegant indoor-outdoor pavilion surrounded by manicured jasmine gardens. The most sought-after venue for intimate weddings and reception ceremonies. Floor-to-ceiling glass walls ensure natural light floods the space during the day and the garden glows under string lights at night.',
    features: ['Garden-view glass walls', 'Outdoor terrace', 'Bridal suite', 'Floral décor included', 'Private garden access', 'Fountain courtyard'],
    facilities: ['Wi-Fi', 'Climate control', 'Valet parking', 'In-house catering', 'Sound system', 'Changing rooms'],
    pricePerDay: 150000,
    image: '/jasmine_pavilion.png',
    highlight: 'Manicured Jasmine Gardens',
    type: 'Indoor / Outdoor',
  },
  {
    id: '3',
    name: 'Rooftop Terrace',
    slug: 'rooftop-terrace',
    capacity: 200,
    area: '4,000 sq ft',
    category: 'Open Air',
    tagline: 'Starlit Celebrations Above the City',
    description: 'An open-air terrace with panoramic views of the Jaipur skyline and the Aravalli hills at sunset. Perfect for cocktail evenings, Sangeet celebrations, and intimate soirées. Features a retractable shade canopy for daytime events and a permanent outdoor bar.',
    features: ['360° skyline view', 'Retractable shade canopy', 'Outdoor bar counter', 'Custom lighting rig', 'Lounge seating area', 'Backdrop for photos'],
    facilities: ['Wi-Fi', 'Outdoor sound system', 'Valet parking', 'Bar setup', 'Event lighting', 'Weather backup plan'],
    pricePerDay: 90000,
    image: '/rooftop_terrace.png',
    highlight: '360° Skyline Panorama',
    type: 'Outdoor',
  },
  {
    id: '4',
    name: 'Maharani Suite',
    slug: 'maharani-suite',
    capacity: 80,
    area: '2,200 sq ft',
    category: 'Private Suite',
    tagline: 'Exclusive Luxury for Intimate Occasions',
    description: 'An exclusive boardroom-style venue styled in deep teal and antique gold — ideal for high-level corporate meetings, private dinners, and milestone celebrations. Includes a private anteroom, dedicated butler service, and world-class AV.',
    features: ['Boardroom layout', 'Private lounge', 'Dedicated butler', 'Projector & screen', 'Private bar', 'Adjoining garden access'],
    facilities: ['Wi-Fi', 'Video conferencing', 'Valet parking', 'Butler service', 'Projector', 'Private dining'],
    pricePerDay: 55000,
    image: '/maharani_suite.png',
    highlight: 'Private Butler Service',
    type: 'Indoor',
  },
];

const categories = ['All', 'Grand Ballroom', 'Garden Venue', 'Open Air', 'Private Suite'];

const venueImages = {
  'darbar-hall': '/darbar_hall.png',
  'jasmine-pavilion': '/jasmine_pavilion.png',
  'rooftop-terrace': '/rooftop_terrace.png',
  'maharani-suite': '/maharani_suite.png',
};

function fmt(n) {
  return `₹${(n / 1000).toFixed(0)}K`;
}

export default function Venues() {
  const [venues, setVenues] = useState(fallback);
  const [activeTab, setActiveTab] = useState('darbar-hall');

  useEffect(() => {
    api.get('/api/venues')
      .then(r => {
        const list = r.data?.venues || r.data;
        if (Array.isArray(list) && list.length > 0) setVenues(list);
        // else: keep fallback static data
      })
      .catch(() => {}); // keep fallback on error
  }, []);

  const active = venues.find(v => v.slug === activeTab) || venues[0];

  return (
    <div>
      <title>Venues — Raj Mahal</title>

      {/* Page hero */}
      <div className="page-hero">
        <div className="page-hero__bg">
          <img src="/hero_palace.png" alt="Raj Mahal palace" />
          <div className="page-hero__overlay" />
        </div>
        <div className="page-hero__content container">
          <p className="page-hero__eyebrow">Our Spaces</p>
          <h1 className="page-hero__title">Discover Our <em>Royal Venues</em></h1>
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Venues</span>
          </nav>
        </div>
      </div>

      {/* Intro */}
      <section className="section section--sm">
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="section-tag">Palace Spaces</p>
          <h2 className="section-title">Four Extraordinary <em>Venues</em></h2>
          <div className="divider" />
          <p className="section-subtitle">
            Each space in Raj Mahal carries centuries of heritage — from a 12,000 sq ft palatial ballroom to an intimate suite with private garden access.
          </p>
        </div>
      </section>

      {/* Tab navigation */}
      <div className="venue-tabs">
        <div className="container">
          <div className="venue-tabs__inner" role="tablist" aria-label="Venue selection">
            {venues.map((v) => (
              <button
                key={v.slug}
                id={`tab-${v.slug}`}
                role="tab"
                aria-selected={activeTab === v.slug}
                className={`venue-tab ${activeTab === v.slug ? 'venue-tab--active' : ''}`}
                onClick={() => setActiveTab(v.slug)}
              >
                <span className="venue-tab__name">{v.name}</span>
                <span className="venue-tab__cap">{v.capacity.toLocaleString()} guests</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Venue Detail */}
      {active && (
        <section className="venue-showcase section" key={active.slug}>
          <div className="container">
            <div className="venue-showcase__grid">
              {/* Image */}
              <div className="venue-showcase__media">
                <div className="venue-showcase__img-wrap">
                  <img src={venueImages[active.slug]} alt={active.name} className="venue-showcase__img" />
                  <div className="venue-showcase__img-overlay">
                    <div className="venue-showcase__highlight">
                      <span>✦</span> {active.highlight}
                    </div>
                  </div>
                  <span className="venue-showcase__type badge badge--gold">{active.type}</span>
                </div>
                <div className="venue-showcase__quick-stats">
                  <div className="venue-showcase__stat">
                    <span className="venue-showcase__stat-num">{active.capacity.toLocaleString()}</span>
                    <span className="venue-showcase__stat-label">Max Guests</span>
                  </div>
                  <div className="venue-showcase__stat">
                    <span className="venue-showcase__stat-num">{active.area}</span>
                    <span className="venue-showcase__stat-label">Total Area</span>
                  </div>
                  <div className="venue-showcase__stat">
                    <span className="venue-showcase__stat-num">{fmt(active.pricePerDay)}</span>
                    <span className="venue-showcase__stat-label">From / Day</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="venue-showcase__body">
                <p className="venue-showcase__category">{active.category}</p>
                <h2 className="venue-showcase__name">{active.name}</h2>
                <p className="venue-showcase__tagline">{active.tagline}</p>
                <p className="venue-showcase__desc">{active.description}</p>

                <div className="venue-showcase__section">
                  <h3 className="venue-showcase__section-title">Venue Features</h3>
                  <ul className="venue-showcase__features">
                    {active.features.map((f) => (
                      <li key={f}><span className="venue-dot">✦</span> {f}</li>
                    ))}
                  </ul>
                </div>

                <div className="venue-showcase__section">
                  <h3 className="venue-showcase__section-title">Facilities Included</h3>
                  <div className="venue-showcase__facilities">
                    {active.facilities.map((f) => (
                      <span key={f} className="venue-facility">{f}</span>
                    ))}
                  </div>
                </div>

                <div className="venue-showcase__location">
                  <span>📍</span>
                  <span>Palace Road, Near City Palace, Jaipur, Rajasthan — 302 001</span>
                </div>

                <div className="venue-showcase__actions">
                  <Link
                    to={`/contact?venue=${encodeURIComponent(active.name)}`}
                    id={`venue-book-${active.slug}`}
                    className="btn btn--primary btn--lg"
                  >
                    Book This Venue →
                  </Link>
                  <Link to={`/venues/${active.slug}`} className="btn btn--secondary btn--lg">
                    Full Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Venues Grid */}
      <section className="section" style={{ background: 'var(--clr-surface-alt)', paddingTop: 'var(--sp-12)' }}>
        <div className="container">
          <div className="section-header">
            <p className="section-tag">All Venues</p>
            <h2 className="section-title">Browse Our <em>Spaces</em></h2>
            <div className="divider" />
          </div>
          <div className="venues-overview-grid">
            {venues.map((v) => (
              <div key={v._id || v.id} className="venue-overview-card" onClick={() => setActiveTab(v.slug)} style={{ cursor: 'pointer' }}>
                <div className="venue-overview-card__img-wrap">
                  <img src={venueImages[v.slug]} alt={v.name} />
                  <div className="venue-overview-card__overlay" />
                </div>
                <div className="venue-overview-card__body">
                  <span className="venue-overview-card__cat">{v.category}</span>
                  <h3 className="venue-overview-card__name">{v.name}</h3>
                  <div className="venue-overview-card__meta">
                    <span>👥 {v.capacity.toLocaleString()} guests</span>
                    <span>📐 {v.area}</span>
                  </div>
                  <div className="venue-overview-card__actions">
                    <Link
                      to={`/contact?venue=${encodeURIComponent(v.name)}`}
                      onClick={(e) => e.stopPropagation()}
                      className="btn btn--primary"
                      id={`venue-req-${v.slug}`}
                    >
                      Request Booking
                    </Link>
                    <Link
                      to={`/venues/${v.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="btn btn--secondary"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section section--sm" style={{ background: 'var(--clr-maroon-dk)', textAlign: 'center' }}>
        <div className="container">
          <p className="section-tag" style={{ color: 'var(--clr-gold-lt)' }}>Free Venue Tour</p>
          <h2 className="section-title" style={{ color: '#fff', marginBottom: 'var(--sp-4)' }}>
            See the Palace <em style={{ color: 'var(--clr-gold-xlt)' }}>In Person</em>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: '50ch', margin: '0 auto var(--sp-8)' }}>
            Schedule a complimentary guided tour with our events team. Mon–Sat by appointment. No commitment required.
          </p>
          <Link to="/contact" className="btn btn--gold btn--lg" id="venue-tour-cta">
            Schedule a Free Tour →
          </Link>
        </div>
      </section>
    </div>
  );
}
