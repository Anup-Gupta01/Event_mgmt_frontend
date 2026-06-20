import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Venues.css';
import '../About/About.css';

const API = 'http://localhost:5000';

const fallback = [
  { id:'1', name:'Darbar Hall', slug:'darbar-hall', capacity:800, area:'12,000 sq ft', category:'Grand', description:'The grandest hall of Raj Mahal — adorned with hand-carved marble pillars, Rajputana frescoes, and a 40-foot gold-leaf ceiling. Perfect for grand royal weddings and state banquets.', features:['Marble flooring','Gold-leaf ceiling','5-ton chandelier','In-built stage','Green room','Pre-function lawn'], pricePerDay:250000 },
  { id:'2', name:'Jasmine Pavilion', slug:'jasmine-pavilion', capacity:350, area:'6,500 sq ft', category:'Garden', description:'An elegant indoor-outdoor pavilion surrounded by manicured jasmine gardens. The most sought-after venue for intimate weddings and reception ceremonies.', features:['Garden-view glass walls','Outdoor terrace','Bridal suite','Floral décor included'], pricePerDay:150000 },
  { id:'3', name:'Rooftop Terrace', slug:'rooftop-terrace', capacity:200, area:'4,000 sq ft', category:'Open Air', description:'An open-air terrace with panoramic views of the city skyline and Rajasthani landscape. Perfect for cocktail evenings and intimate soirees.', features:['360° skyline view','Retractable shade canopy','Outdoor bar counter','Custom lighting rig'], pricePerDay:90000 },
  { id:'4', name:'Maharani Suite', slug:'maharani-suite', capacity:80, area:'2,200 sq ft', category:'Corporate', description:'An exclusive boardroom-style venue styled in deep teal and antique gold, ideal for high-level corporate meetings and private dinners.', features:['Boardroom layout','Private lounge','Dedicated butler','Projector & screen'], pricePerDay:55000 },
];

const venueImages = {
  'darbar-hall': '/darbar_hall.png',
  'jasmine-pavilion': '/jasmine_pavilion.png',
  'rooftop-terrace': '/rooftop_terrace.png',
  'maharani-suite': '/maharani_suite.png',
};

const categories = ['All', 'Grand', 'Garden', 'Open Air', 'Corporate'];

export default function Venues() {
  const [venues, setVenues] = useState(fallback);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    axios.get(`${API}/api/venues`).then(r => setVenues(r.data)).catch(() => {});
  }, []);

  const filtered = filter === 'All' ? venues : venues.filter(v => v.category === filter);

  return (
    <div>
      {/* Page hero */}
      <div className="page-hero">
        <div className="page-hero__bg">
          <img src="/hero_palace.png" alt="Raj Mahal palace" />
          <div className="page-hero__overlay" />
        </div>
        <div className="page-hero__content container">
          <p className="page-hero__eyebrow">Our Spaces</p>
          <h1 className="page-hero__title">Discover Our <em>Venues</em></h1>
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Venues</span>
          </nav>
        </div>
      </div>

      {/* Filter bar */}
      <div className="venues-filter">
        <div className="container">
          <div className="venues-filter__inner">
            <p className="venues-filter__label">Filter by type:</p>
            <div className="venues-filter__tabs" role="group" aria-label="Category filter">
              {categories.map((c) => (
                <button
                  key={c}
                  id={`filter-${c.toLowerCase().replace(' ', '-')}`}
                  className={`venues-filter__tab ${filter === c ? 'venues-filter__tab--active' : ''}`}
                  onClick={() => setFilter(c)}
                  aria-pressed={filter === c}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Venue list */}
      <section className="section">
        <div className="container">
          <div className="venues-list">
            {filtered.map((v, i) => (
              <article key={v.id} className={`venue-detail-card ${i % 2 === 1 ? 'venue-detail-card--reverse' : ''}`}>
                <div className="venue-detail-card__img">
                  <img src={venueImages[v.slug]} alt={v.name} />
                  <span className="venue-detail-card__cat badge badge--gold">{v.category}</span>
                </div>
                <div className="venue-detail-card__body">
                  <h2 className="venue-detail-card__name">{v.name}</h2>
                  <div className="venue-detail-card__meta">
                    <span>👥 Up to {v.capacity.toLocaleString()} guests</span>
                    <span>📐 {v.area}</span>
                    <span>💰 From ₹{(v.pricePerDay/1000).toFixed(0)}K / day</span>
                  </div>
                  <p className="venue-detail-card__desc">{v.description}</p>
                  <ul className="venue-detail-card__features">
                    {v.features.map((f) => (
                      <li key={f}><span className="venue-detail-card__feature-dot">✦</span>{f}</li>
                    ))}
                  </ul>
                  <div className="venue-detail-card__actions">
                    <Link to={`/venues/${v.slug}`} className="btn btn--primary">
                      Full Details
                    </Link>
                    <Link to="/contact" className="btn btn--secondary">
                      Request Booking
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
