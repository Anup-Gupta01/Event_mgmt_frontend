import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../About/About.css';
import './Services.css';

const services = [
  {
    id: 'venue-booking',
    category: 'Venue',
    icon: '🏛️',
    title: 'Venue Booking',
    desc: 'Choose from four distinct palace venues — from our 12,000 sq ft Darbar Hall to the intimate Maharani Suite. Each space is uniquely designed to set the stage for your occasion.',
    features: ['4 distinct hall options', 'Indoor & outdoor configurations', 'Dedicated setup crew', 'Site inspection available'],
    startingPrice: '₹55,000/day',
    availability: 'Available',
  },
  {
    id: 'floral-decor',
    category: 'Décor',
    icon: '🌸',
    title: 'Floral Décor',
    desc: 'Our in-house floral design team creates breathtaking arrangements — from cascading mandap florals to table centrepieces sourced from Jaipur\'s finest gardens.',
    features: ['Custom mandap designs', 'Fresh & preserved flowers', 'Table centrepieces', 'Bridal car decoration'],
    startingPrice: '₹30,000',
    availability: 'Available',
  },
  {
    id: 'catering',
    category: 'Catering',
    icon: '🍽️',
    title: 'Royal Catering',
    desc: 'Our culinary team crafts exquisite menus blending authentic Rajasthani cuisine with global flavours. Live counters, themed stations, and custom wedding cakes available.',
    features: ['Rajasthani royal thali', 'Multi-cuisine live counters', 'Wedding cake & desserts', 'Dietary customisation'],
    startingPrice: '₹1,200/person',
    availability: 'Available',
  },
  {
    id: 'photography',
    category: 'Photography',
    icon: '📸',
    title: 'Photography & Video',
    desc: 'From pre-wedding shoots in palace corridors to cinematic wedding films with drone footage — our award-winning visual team captures every emotion with artistry.',
    features: ['Full-day photo coverage', 'Cinematic wedding film', 'Drone aerial footage', 'Same-day reels'],
    startingPrice: '₹45,000',
    availability: 'Available',
  },
  {
    id: 'dj-music',
    category: 'Music',
    icon: '🎵',
    title: 'DJ & Live Music',
    desc: 'Set the perfect mood with our curated music experiences — from traditional shehnai and folk artists for ceremonies to premium DJ setups for receptions and galas.',
    features: ['Classical & folk artists', 'DJ with premium setup', 'Band performances', 'Custom playlist curation'],
    startingPrice: '₹25,000',
    availability: 'Available',
  },
  {
    id: 'lighting',
    category: 'Lighting',
    icon: '💡',
    title: 'Lighting Setup',
    desc: 'Transform any space with our professional lighting solutions — ambient ceiling lights, floral fairy lights, coloured LED washes, and dramatic stage spotlights.',
    features: ['LED wall washes', 'Fairy light canopies', 'Stage spotlighting', 'Candlelight arrangements'],
    startingPrice: '₹20,000',
    availability: 'Available',
  },
  {
    id: 'seating',
    category: 'Décor',
    icon: '🪑',
    title: 'Seating Arrangement',
    desc: 'Elegant seating configurations designed for both comfort and aesthetic flow — from traditional floor seating to banquet rounds, cocktail high-tops, and theatre layouts.',
    features: ['Banquet & theatre layouts', 'Royal throne chairs', 'Custom name cards', 'Table linen selection'],
    startingPrice: '₹15,000',
    availability: 'Available',
  },
  {
    id: 'stage',
    category: 'Venue',
    icon: '🎪',
    title: 'Stage Setup',
    desc: 'Professionally constructed stages, mandap structures, mehendi corners, and photo backdrops — all crafted by our in-house carpentry and décor team.',
    features: ['Grand mandap construction', 'LED backdrop screens', 'Mehendi corner setups', 'Custom brand arches'],
    startingPrice: '₹18,000',
    availability: 'Available',
  },
  {
    id: 'sound',
    category: 'Music',
    icon: '🔊',
    title: 'Sound System',
    desc: 'Crystal-clear professional-grade audio tailored for every space. From intimate suite announcements to thunderous ballroom sound for 800 guests.',
    features: ['Line array speaker systems', 'Wireless microphones', 'DJ mixer & monitors', 'Soundcheck & technician'],
    startingPrice: '₹12,000',
    availability: 'Available',
  },
  {
    id: 'invitation',
    category: 'Design',
    icon: '✉️',
    title: 'Invitation Design',
    desc: 'Luxury printed invitations with custom calligraphy, embossed seals, and intricate Rajasthani artwork — or elegant digital invites with motion graphics.',
    features: ['Hand-crafted printed sets', 'Custom calligraphy', 'Digital motion invites', 'RSVP management'],
    startingPrice: '₹8,000',
    availability: 'Available',
  },
  {
    id: 'coordination',
    category: 'Planning',
    icon: '🎯',
    title: 'Event Coordination',
    desc: 'A dedicated event manager is your single point of contact — from planning through execution. We coordinate all vendors, manage timelines, and handle every unexpected detail.',
    features: ['Dedicated event manager', 'Full-day on-site presence', 'Vendor coordination', 'Timeline management'],
    startingPrice: '₹20,000',
    availability: 'Available',
  },
  {
    id: 'transport',
    category: 'Logistics',
    icon: '🚐',
    title: 'Guest Transport',
    desc: 'VIP fleet management for seamless guest arrivals and departures — from luxury car pickups from airports and hotels to baraat processions and vintage horse carriages.',
    features: ['Luxury sedan fleet', 'Coach & shuttle buses', 'Vintage baraat vehicles', 'Airport transfers'],
    startingPrice: '₹5,000/vehicle',
    availability: 'On Request',
  },
];

const categories = ['All', 'Venue', 'Décor', 'Catering', 'Photography', 'Music', 'Lighting', 'Design', 'Planning', 'Logistics'];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? services
    : services.filter(s => s.category === activeCategory);

  return (
    <div>
      <title>Our Services — Raj Mahal</title>

      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero__bg">
          <img src="/wedding_gallery.png" alt="Raj Mahal event services" />
          <div className="page-hero__overlay" />
        </div>
        <div className="page-hero__content container">
          <p className="page-hero__eyebrow">What We Offer</p>
          <h1 className="page-hero__title">Our Event <em>Services</em></h1>
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Services</span>
          </nav>
        </div>
      </div>

      {/* Intro */}
      <section className="section section--sm">
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="section-tag">Comprehensive Event Services</p>
          <h2 className="section-title">Every Detail, <em>Masterfully Managed</em></h2>
          <div className="divider" />
          <p className="section-subtitle">
            From floral artistry to cinematic photography, DJ setups to royal catering — our expert team manages every element of your celebration with precision and passion.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="services-filter">
        <div className="container">
          <div className="services-filter__inner">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`svc-filter-${cat.toLowerCase()}`}
                className={`services-filter__tab ${activeCategory === cat ? 'services-filter__tab--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <section className="section" style={{ paddingTop: 'var(--sp-12)' }}>
        <div className="container">
          <div className="services-grid">
            {filtered.map((svc) => (
              <article key={svc.id} id={`svc-${svc.id}`} className="svc-card">
                <div className="svc-card__header">
                  <div className="svc-card__icon">{svc.icon}</div>
                  <span className={`svc-card__avail ${svc.availability === 'Available' ? 'svc-card__avail--green' : 'svc-card__avail--amber'}`}>
                    {svc.availability}
                  </span>
                </div>

                <div className="svc-card__category">{svc.category}</div>
                <h2 className="svc-card__title">{svc.title}</h2>
                <p className="svc-card__desc">{svc.desc}</p>

                <ul className="svc-card__features">
                  {svc.features.map((f) => (
                    <li key={f}><span>✦</span> {f}</li>
                  ))}
                </ul>

                <div className="svc-card__footer">
                  <div className="svc-card__price">
                    <span className="svc-card__price-label">Starting from</span>
                    <span className="svc-card__price-amt">{svc.startingPrice}</span>
                  </div>
                  <Link
                    to={`/contact?service=${encodeURIComponent(svc.title)}`}
                    className="btn btn--primary svc-card__cta"
                    id={`svc-enquire-${svc.id}`}
                  >
                    Enquire Now
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section section--sm" style={{ background: 'var(--clr-maroon)', textAlign: 'center' }}>
        <div className="container">
          <p className="section-tag" style={{ color: 'var(--clr-gold-lt)' }}>Custom Packages</p>
          <h2 className="section-title" style={{ color: '#fff', marginBottom: 'var(--sp-4)' }}>
            Need a <em style={{ color: 'var(--clr-gold-xlt)' }}>Custom Combination?</em>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '52ch', margin: '0 auto var(--sp-8)' }}>
            Mix and match our services to create a perfectly tailored package for your event. Our team will craft a bespoke proposal with bundle pricing.
          </p>
          <div style={{ display: 'flex', gap: 'var(--sp-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn--gold btn--lg" id="services-custom-cta">
              Request Custom Package
            </Link>
            <Link to="/packages" className="btn btn--ghost btn--lg">
              View Standard Packages
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
