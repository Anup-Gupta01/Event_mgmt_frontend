import { Link } from 'react-router-dom';
import './ServicesSection.css';

const services = [
  {
    id: 'weddings',
    icon: '💍',
    title: 'Royal Weddings',
    desc: 'From intimate nikahs to grand baraat processions, we orchestrate every ritual with cultural authenticity and palatial splendour.',
    bullets: ['Mehendi & Sangeet nights', 'Grand baraat welcome', 'Sacred mandap ceremonies', 'Lavish reception banquets'],
    image: '/wedding_gallery.png',
  },
  {
    id: 'corporate',
    icon: '🏆',
    title: 'Corporate Events',
    desc: 'Impress your stakeholders with executive galas, product launches, and annual conferences held in an ambience of rare distinction.',
    bullets: ['Annual galas & award nights', 'Product unveilings', 'Leadership conclaves', 'Team retreats & offsites'],
    image: '/corporate_gala.png',
  },
  {
    id: 'social',
    icon: '🥂',
    title: 'Social Celebrations',
    desc: 'Birthday milestones, anniversaries, and festive soirées — we craft bespoke experiences that reflect your personality and style.',
    bullets: ['Milestone birthdays', 'Anniversary dinners', 'Engagement parties', 'Cocktail evenings'],
    image: '/rooftop_terrace.png',
  },
  {
    id: 'exhibitions',
    icon: '🖼',
    title: 'Exhibitions & Shows',
    desc: 'The palace\'s grand halls provide a heritage backdrop for fashion shows, art exhibitions, and cultural showcases.',
    bullets: ['Fashion week showcases', 'Art & photography exhibits', 'Cultural heritage evenings', 'Luxury brand activations'],
    image: '/maharani_suite.png',
  },
];

export default function ServicesSection() {
  return (
    <section className="services section--lg" style={{ background: 'var(--clr-surface-alt)' }} id="services">
      <div className="container">
        <div className="section-header">
          <p className="section-tag">What We Host</p>
          <h2 className="section-title">Every Occasion,<br /><em>Perfectly Curated</em></h2>
          <div className="divider" />
          <p className="section-subtitle">
            From intimate family gatherings to grand state-level events, our experienced team tailors every detail to exceed expectations.
          </p>
        </div>

        <div className="services__grid">
          {services.map((svc) => (
            <article key={svc.id} className="service-card" id={`service-${svc.id}`}>
              <div className="service-card__img">
                <img src={svc.image} alt={svc.title} />
                <div className="service-card__img-overlay" />
              </div>
              <div className="service-card__body">
                <span className="service-card__icon">{svc.icon}</span>
                <h3 className="service-card__title">{svc.title}</h3>
                <p className="service-card__desc">{svc.desc}</p>
                <ul className="service-card__bullets">
                  {svc.bullets.map((b) => (
                    <li key={b}><span>—</span> {b}</li>
                  ))}
                </ul>
                <Link to="/contact" className="service-card__cta">
                  Inquire Now <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
