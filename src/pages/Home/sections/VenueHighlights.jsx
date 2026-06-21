import { Link } from 'react-router-dom';
import './VenueHighlights.css';

const venues = [
  {
    slug: 'darbar-hall',
    name: 'Darbar Hall',
    category: 'Grand Ballroom',
    capacity: '800 guests',
    area: '12,000 sq ft',
    image: '/darbar_hall.png',
    tag: 'Most Popular',
  },
  {
    slug: 'jasmine-pavilion',
    name: 'Jasmine Pavilion',
    category: 'Garden Venue',
    capacity: '350 guests',
    area: '6,500 sq ft',
    image: '/jasmine_pavilion.png',
    tag: 'Best for Weddings',
  },
  {
    slug: 'rooftop-terrace',
    name: 'Rooftop Terrace',
    category: 'Open Air',
    capacity: '200 guests',
    area: '4,000 sq ft',
    image: '/rooftop_terrace.png',
    tag: 'Skyline Views',
  },
  {
    slug: 'maharani-suite',
    name: 'Maharani Suite',
    category: 'Exclusive Suite',
    capacity: '80 guests',
    area: '2,200 sq ft',
    image: '/maharani_suite.png',
    tag: 'Corporate & Intimate',
  },
];

export default function VenueHighlights() {
  return (
    <section className="venue-hl section" id="venue-highlights">
      <div className="container">
        <div className="section-header">
          <p className="section-tag">Our Spaces</p>
          <h2 className="section-title">Four Extraordinary <em>Venues</em></h2>
          <div className="divider" />
          <p className="section-subtitle">
            Each space tells a different story — from a 12,000 sq ft palatial ballroom to a starlit rooftop overlooking the city.
          </p>
        </div>

        <div className="venue-hl__grid">
          {venues.map((v) => (
            <Link
              to={`/venues/${v.slug}`}
              key={v.slug}
              className="venue-hl__card"
              id={`venue-hl-${v.slug}`}
            >
              <div className="venue-hl__img-wrap">
                <img src={v.image} alt={v.name} className="venue-hl__img" />
                <div className="venue-hl__overlay" />
                <span className="venue-hl__tag">{v.tag}</span>
              </div>
              <div className="venue-hl__body">
                <p className="venue-hl__category">{v.category}</p>
                <h3 className="venue-hl__name">{v.name}</h3>
                <div className="venue-hl__meta">
                  <span>👥 {v.capacity}</span>
                  <span>📐 {v.area}</span>
                </div>
                <span className="venue-hl__link">Explore Venue →</span>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--sp-10)' }}>
          <Link to="/venues" className="btn btn--primary btn--lg" id="home-venues-cta">
            View All Venues
          </Link>
        </div>
      </div>
    </section>
  );
}
