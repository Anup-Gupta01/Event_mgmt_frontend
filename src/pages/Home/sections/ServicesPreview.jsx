import { Link } from 'react-router-dom';
import './ServicesPreview.css';

const services = [
  { icon: '🏛️', title: 'Venue Booking',       desc: 'Grand halls & open-air pavilions for every scale of celebration.' },
  { icon: '🌸', title: 'Floral Décor',         desc: 'Bespoke floral design crafted by our in-house creative director.' },
  { icon: '🍽️', title: 'Royal Catering',       desc: 'Curated menus blending Rajasthani flavours with global cuisine.' },
  { icon: '📸', title: 'Photography & Video',  desc: 'Cinematic wedding films and editorial-quality photography.' },
  { icon: '🎵', title: 'DJ & Live Music',      desc: 'From classical shehnai to chart-topping DJ sets — we curate it all.' },
  { icon: '💡', title: 'Lighting Setup',       desc: 'Ambient, stage, and décor lighting to set the perfect mood.' },
  { icon: '🪑', title: 'Seating Arrangement',  desc: 'Elegant seating plans designed for comfort and aesthetic flow.' },
  { icon: '🎪', title: 'Stage Setup',          desc: 'Grand stages, mandaps, and performance platforms custom-built.' },
  { icon: '🔊', title: 'Sound Systems',        desc: 'Crystal-clear professional audio for every room and outdoor space.' },
  { icon: '✉️', title: 'Invitation Design',    desc: 'Luxury printed and digital invites with custom calligraphy.' },
  { icon: '🎯', title: 'Event Coordination',   desc: 'A dedicated manager handles every detail so you can celebrate.' },
  { icon: '🚐', title: 'Guest Transport',      desc: 'VIP fleet management for seamless guest arrivals and departures.' },
];

export default function ServicesPreview() {
  return (
    <section className="svc-preview section" id="services-preview">
      <div className="container">
        <div className="section-header">
          <p className="section-tag">What We Offer</p>
          <h2 className="section-title">Every Detail, <em>Masterfully Managed</em></h2>
          <div className="divider" />
          <p className="section-subtitle">
            From the first flower to the final farewell, our expert team handles every element of your event with precision and artistry.
          </p>
        </div>

        <div className="svc-preview__grid">
          {services.map((s, i) => (
            <div key={i} className="svc-preview__card">
              <div className="svc-preview__icon">{s.icon}</div>
              <h3 className="svc-preview__title">{s.title}</h3>
              <p className="svc-preview__desc">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="svc-preview__cta">
          <Link to="/services" className="btn btn--secondary btn--lg" id="home-services-cta">
            View All Services →
          </Link>
        </div>
      </div>
    </section>
  );
}
