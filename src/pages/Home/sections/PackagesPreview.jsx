import { Link } from 'react-router-dom';
import './PackagesPreview.css';

const packages = [
  {
    id: 'gold',
    name: 'Gold',
    subtitle: 'The Classic Celebration',
    price: '₹2.5 Lakh',
    capacity: 'Up to 300 guests',
    duration: 'Up to 8 hours',
    features: ['Venue rental', 'Basic floral décor', 'Standard AV setup', '1 Event coordinator', 'Standard catering'],
    popular: false,
    color: 'gold',
  },
  {
    id: 'platinum',
    name: 'Platinum',
    subtitle: 'The Grand Affair',
    price: '₹5 Lakh',
    capacity: 'Up to 600 guests',
    duration: 'Up to 12 hours',
    features: ['Custom floral décor & mandap', 'Premium AV + LED backdrop', '2 Coordinators', 'Multi-cuisine live counters', 'Bridal suite access', 'Ambient lighting'],
    popular: true,
    color: 'maroon',
  },
  {
    id: 'royal',
    name: 'Royal',
    subtitle: 'The Raj Mahal Experience',
    price: '₹9.5 Lakh',
    capacity: 'Up to 1000 guests',
    duration: '24 hours',
    features: ['Full palace access', 'Master floral design', 'Full AV production', 'Unlimited valet parking', 'Professional photography', 'Royal thali + international buffet', 'Presidential suite (2 nights)'],
    popular: false,
    color: 'dark',
  },
];

export default function PackagesPreview() {
  return (
    <section className="pkg-preview section" style={{ background: 'var(--clr-surface-alt)' }} id="packages-preview">
      <div className="container">
        <div className="section-header">
          <p className="section-tag">Transparent Pricing</p>
          <h2 className="section-title">Choose Your <em>Royal Experience</em></h2>
          <div className="divider" />
          <p className="section-subtitle">
            Thoughtfully curated packages for every scale of celebration — all fully customisable to your vision.
          </p>
        </div>

        <div className="pkg-preview__grid">
          {packages.map((pkg) => (
            <div key={pkg.id} className={`pkg-preview__card pkg-preview__card--${pkg.color}`}>
              {pkg.popular && <div className="pkg-preview__badge">Most Popular</div>}
              <div className="pkg-preview__header">
                <p className="pkg-preview__name">{pkg.name}</p>
                <p className="pkg-preview__subtitle">{pkg.subtitle}</p>
                <div className="pkg-preview__price">{pkg.price}</div>
                <div className="pkg-preview__meta">
                  <span>👥 {pkg.capacity}</span>
                  <span>⏱ {pkg.duration}</span>
                </div>
              </div>
              <ul className="pkg-preview__features">
                {pkg.features.map((f) => (
                  <li key={f}><span className="pkg-preview__check">✓</span> {f}</li>
                ))}
              </ul>
              <Link
                to={`/packages`}
                className={`btn btn--lg pkg-preview__cta ${pkg.popular ? 'btn--primary' : 'btn--secondary'}`}
                id={`pkg-preview-${pkg.id}`}
              >
                Check Availability
              </Link>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--sp-10)' }}>
          <Link to="/packages" className="btn btn--secondary btn--lg" id="home-packages-cta">
            View All Packages & Compare →
          </Link>
        </div>
      </div>
    </section>
  );
}
