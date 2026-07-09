import { Link } from 'react-router-dom';
import './About.css';

const awards = [
  { year: '2022', title: 'Best Heritage Venue', org: 'Rajasthan Tourism Dept.' },
  { year: '2021', title: 'Luxury Wedding Venue of the Year', org: 'WeddingWire India' },
  { year: '2020', title: 'Excellence in Hospitality', org: 'FHRAI Awards' },
  { year: '2019', title: 'Most Iconic Event Space', org: 'EventX Magazine' },
];

const team = [
  { name: 'Vikramaditya Singh', role: 'Managing Director', note: '3rd generation custodian of the venue' },
  { name: 'Reema Chaturvedi', role: 'Director, Events', note: '22 years in luxury event design' },
  { name: 'Chef Harpal Arora', role: 'Executive Chef', note: 'Formerly Oberoi, Taj; Michelin-trained' },
  { name: 'Priya Khandelwal', role: 'Head, Guest Relations', note: 'Fluent in 4 languages, 10+ years' },
];

export default function About() {
  return (
    <div className="about-page">
      {/* Page hero */}
      <div className="page-hero">
        <div className="page-hero__bg">
          <img src="/hero_palace.png" alt="Eventora venue exterior" />
          <div className="page-hero__overlay" />
        </div>
        <div className="page-hero__content container">
          <p className="page-hero__eyebrow">Our Heritage</p>
          <h1 className="page-hero__title">The Story of<br /><em>Eventora</em></h1>
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>About</span>
          </nav>
        </div>
      </div>

      {/* Story section */}
      <section className="section about-story">
        <div className="container">
          <div className="about-story__grid">
            <div>
              <p className="section-tag">Since 1947</p>
              <h2 className="section-title">A Legacy of <em>Grandeur</em></h2>
              <div className="divider divider--left" />
              <p className="about-body">
                Eventora began its journey as a premier hospitality and event destination, built to the highest standards of craftsmanship and elegance. Every arch, fresco, and marble inlay tells a story of meticulous artistry and dedication to excellence.
              </p>
              <p className="about-body">
                Over the decades, Eventora has evolved from an exclusive private estate into one of the region's most celebrated event destinations. Today, under the stewardship of Managing Director Vikramaditya Singh, Eventora seamlessly blends heritage architecture with world-class modern hospitality.
              </p>
              <p className="about-body">
                Spanning 3.2 acres in the heritage quarter of Jaipur, the palace complex includes four distinct event venues, a heritage orchid garden, a royal culinary kitchen, and 24 heritage suites — all maintained to the exacting standards of a five-star luxury property.
              </p>
            </div>
            <div className="about-story__images">
              <img src="/darbar_hall.png" alt="Darbar Hall interior" className="about-story__img-main" />
              <img src="/maharani_suite.png" alt="Maharani Suite" className="about-story__img-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="about-stats" style={{ background: 'var(--clr-maroon)' }}>
        <div className="container">
          <div className="about-stats__grid">
            {[
              { number: '77', suffix: '+', label: 'Years in Operation' },
              { number: '12,000', suffix: '+', label: 'Events Hosted' },
              { number: '3.2', suffix: ' acres', label: 'Heritage Grounds' },
              { number: '120', suffix: '+', label: 'Culinary Specialists' },
              { number: '4', suffix: '', label: 'Distinct Event Venues' },
              { number: '98', suffix: '%', label: 'Guest Satisfaction' },
            ].map((s) => (
              <div key={s.label} className="about-stats__item">
                <span className="about-stats__number">{s.number}<span className="about-stats__suffix">{s.suffix}</span></span>
                <span className="about-stats__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Awards */}
      <section className="section" style={{ background: 'var(--clr-surface-alt)' }}>
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Recognition</p>
            <h2 className="section-title">Awards & <em>Accolades</em></h2>
            <div className="divider" />
          </div>
          <div className="awards-grid">
            {awards.map((a) => (
              <div key={a.title} className="award-card">
                <span className="award-card__year">{a.year}</span>
                <span className="award-card__icon">🏆</span>
                <h3 className="award-card__title">{a.title}</h3>
                <p className="award-card__org">{a.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Leadership</p>
            <h2 className="section-title">The People Behind <em>the Magic</em></h2>
            <div className="divider" />
          </div>
          <div className="team-grid">
            {team.map((m) => (
              <div key={m.name} className="team-card">
                <div className="team-card__avatar">{m.name.charAt(0)}</div>
                <h3 className="team-card__name">{m.name}</h3>
                <p className="team-card__role">{m.role}</p>
                <p className="team-card__note">{m.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title" style={{ color: '#fff', marginBottom: 'var(--sp-4)' }}>
            Ready to <em style={{ color: 'var(--clr-gold-lt)' }}>Experience Eventora?</em>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 'var(--sp-8)', maxWidth: '50ch', margin: '0 auto var(--sp-8)' }}>
            Schedule a complimentary palace tour with our events team.
          </p>
          <Link to="/contact" className="btn btn--gold btn--lg">Schedule a Tour</Link>
        </div>
      </section>
    </div>
  );
}
