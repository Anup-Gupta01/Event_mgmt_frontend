import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../About/About.css';
import './Packages.css';

const API = 'http://localhost:5000';

const fallbackPackages = [
  {
    id: '1',
    name: 'Gold',
    subtitle: 'The Classic Celebration',
    price: 250000,
    priceUnit: 'per event',
    capacity: 'Up to 300 guests',
    duration: 'Up to 8 hours',
    color: 'gold',
    features: [
      'Venue rental (up to 8 hours)',
      'Basic floral décor',
      'Standard AV setup',
      'Parking for 50 cars',
      '1 Dedicated coordinator',
      'Standard catering menu',
      'Basic lighting setup',
    ],
    notIncluded: ['Custom décor', 'Photography', 'Luxury suite access'],
    popular: false,
  },
  {
    id: '2',
    name: 'Platinum',
    subtitle: 'The Grand Affair',
    price: 500000,
    priceUnit: 'per event',
    capacity: 'Up to 600 guests',
    duration: 'Up to 12 hours',
    color: 'maroon',
    features: [
      'Venue rental (up to 12 hours)',
      'Custom floral décor & mandap',
      'Premium AV + LED backdrop',
      'Parking for 120 cars',
      '2 Dedicated coordinators',
      'Multi-cuisine live counters',
      'Ambient + stage lighting',
      'Bridal suite access',
      'Welcome drink setup',
    ],
    notIncluded: ['Photography package'],
    popular: true,
  },
  {
    id: '3',
    name: 'Royal',
    subtitle: 'The Raj Mahal Experience',
    price: 950000,
    priceUnit: 'per event',
    capacity: 'Up to 1,000 guests',
    duration: '24 hours',
    color: 'dark',
    features: [
      'Full palace access (24 hours)',
      'Master floral design by creative director',
      'Full AV production with operator',
      'Unlimited valet parking',
      'Dedicated event management team',
      'Royal thali + international buffet',
      'Cinematic lighting design',
      'Presidential suite for 2 nights',
      'Professional photography (8 hrs)',
      'Fireworks clearance & setup',
      'Custom monogram & stationery',
    ],
    notIncluded: [],
    popular: false,
  },
  {
    id: '4',
    name: 'Diamond',
    subtitle: 'The Maharaja Collection',
    price: 2000000,
    priceUnit: 'per event',
    capacity: 'Unlimited guests',
    duration: '3 Days',
    color: 'diamond',
    features: [
      'Exclusive 3-day palace booking',
      'Bespoke floral design — all spaces',
      'Broadcast-grade AV production',
      'Private helicopter arrival experience',
      'Full event management concierge',
      'Michelin-inspired dining experience',
      'Theatrical & drone light show',
      'Entire palace accommodation (15 suites)',
      'Full photography + videography team',
      'Celebrity entertainment arrangement',
      'Custom brand identity & stationery',
      'Post-event highlight film',
      'Social media content production',
    ],
    notIncluded: [],
    popular: false,
  },
];

function fmt(n) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(n % 10000000 === 0 ? 0 : 1)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)} Lakh`;
  return `₹${n.toLocaleString('en-IN')}`;
}

export default function Packages() {
  const [packages, setPackages] = useState(fallbackPackages);

  useEffect(() => {
    axios.get(`${API}/api/packages`)
      .then(r => {
        const list = r.data?.packages || r.data;
        if (Array.isArray(list) && list.length > 0) setPackages(list);
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <title>Event Packages — Raj Mahal</title>

      {/* Hero */}
      <div className="page-hero">
        <div className="page-hero__bg">
          <img src="/darbar_hall.png" alt="Grand Darbar Hall" />
          <div className="page-hero__overlay" />
        </div>
        <div className="page-hero__content container">
          <p className="page-hero__eyebrow">Transparent Pricing</p>
          <h1 className="page-hero__title">Our Event <em>Packages</em></h1>
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Packages</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="section section--sm">
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="section-tag">Choose Your Package</p>
          <h2 className="section-title">Choose Your <em>Royal Experience</em></h2>
          <div className="divider" />
          <p className="section-subtitle">
            Our packages serve as starting points. Every event is unique — we will craft a bespoke quote that fits your vision and guest list perfectly.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="packages-grid">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                id={`pkg-${pkg.name.toLowerCase()}`}
                className={`pkg-card pkg-card--${pkg.color} ${pkg.popular ? 'pkg-card--popular' : ''}`}
              >
                {pkg.popular && <div className="pkg-card__ribbon">Most Popular</div>}
                {pkg.name === 'Diamond' && <div className="pkg-card__ribbon pkg-card__ribbon--diamond">✦ Ultimate Luxury</div>}

                <div className="pkg-card__header">
                  <p className="pkg-card__name">{pkg.name}</p>
                  <p className="pkg-card__subtitle">{pkg.subtitle}</p>
                  <div className="pkg-card__price">
                    <span className="pkg-card__price-amt">{fmt(pkg.price)}</span>
                    <span className="pkg-card__price-unit">{pkg.priceUnit}</span>
                  </div>
                  <div className="pkg-card__specs">
                    <span>👥 {pkg.capacity}</span>
                    <span>⏱ {pkg.duration}</span>
                  </div>
                </div>

                <div className="pkg-card__divider" />

                <ul className="pkg-card__features">
                  {pkg.features.map((f) => (
                    <li key={f} className="pkg-card__feature pkg-card__feature--included">
                      <span>✓</span> {f}
                    </li>
                  ))}
                  {pkg.notIncluded.map((f) => (
                    <li key={f} className="pkg-card__feature pkg-card__feature--excluded">
                      <span>✕</span> {f}
                    </li>
                  ))}
                </ul>

                <div className="pkg-card__footer">
                  <Link
                    to={`/contact?package=${encodeURIComponent(pkg.name)}`}
                    id={`pkg-cta-${pkg.name.toLowerCase()}`}
                    className={`btn btn--lg pkg-card__cta`}
                  >
                    Check Availability →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="packages-note">
            <p>✦ All packages are fully customisable. Prices are indicative and may vary based on date, guest count, and venue selection.</p>
            <p>Contact our events team for a detailed custom quotation tailored to your specific requirements.</p>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="section" style={{ background: 'var(--clr-surface-alt)', paddingTop: 'var(--sp-16)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Package <em>Comparison</em></h2>
            <div className="divider" />
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Gold</th>
                  <th className="compare-table__popular">Platinum</th>
                  <th>Royal</th>
                  <th className="compare-table__diamond">Diamond</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Venue Hours', 'Up to 8 hrs', 'Up to 12 hrs', '24 hrs', '3 Days'],
                  ['Guest Capacity', '300', '600', '1,000', 'Unlimited'],
                  ['Floral Décor', 'Basic', 'Custom + mandap', 'Master design', 'All spaces — bespoke'],
                  ['AV Setup', 'Standard', 'Premium + LED', 'Full production', 'Broadcast-grade'],
                  ['Coordinator', '1 person', '2 persons', 'Full team', 'Concierge team'],
                  ['Catering', 'Standard menu', 'Live counters', 'Royal + international', 'Michelin-inspired'],
                  ['Suite Access', '—', 'Bridal suite', 'Presidential (2 nights)', '15 suites included'],
                  ['Photography', '—', '—', '8 hrs professional', 'Full team + film'],
                  ['Valet Parking', '50 cars', '120 cars', 'Unlimited', 'Helicopter + fleet'],
                  ['Fireworks', '—', '—', '✓ Included', 'Drone light show'],
                  ['Entertainment', '—', '—', '—', 'Celebrity arrangement'],
                ].map(([feat, ...vals]) => (
                  <tr key={feat}>
                    <td>{feat}</td>
                    {vals.map((v, i) => (
                      <td key={i} className={i === 1 ? 'compare-table__popular' : i === 3 ? 'compare-table__diamond' : ''}>
                        {v === '—' ? <span style={{ color: 'var(--clr-muted)', opacity: 0.4 }}>—</span> : v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
