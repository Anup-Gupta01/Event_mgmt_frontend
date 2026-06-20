import { Link } from 'react-router-dom';
import '../About/About.css';
import './Events.css';

const eventTypes = [
  {
    id: 'weddings',
    icon: '💍',
    title: 'Royal Weddings',
    tagline: 'A union as timeless as the palace itself',
    desc: "From the first mehendi to the final farewell, Raj Mahal's wedding team manages every ritual, every detail, every emotion with grace and precision. Our cultural consultants ensure authentic Rajputana traditions are honoured while accommodating modern preferences.",
    offerings: [
      'Mehendi & Sangeet ceremonies', 'Grand baraat welcome with dhol, nadaswaram & horse processional',
      'Elaborate pheras & sacred mandap', 'Lavish reception banquets up to 800 guests',
      'Bridal suite & family accommodation', 'Wedding stationery & invitation design',
    ],
    image: '/wedding_gallery.png',
  },
  {
    id: 'corporate',
    icon: '🏆',
    title: 'Corporate Events',
    tagline: 'Where business meets Rajputana splendour',
    desc: 'Impress your board, reward your team, and launch your brand against the backdrop of a centuries-old palace. Our dedicated corporate events division provides state-of-the-art AV, enterprise Wi-Fi, translation services, and a business centre — all within a heritage setting unlike any convention hall.',
    offerings: [
      'Annual galas & award ceremonies', 'Product launches & brand activations',
      'Leadership conclaves & board retreats', 'Employee recognition events',
      'Conference & seminar setups', 'Custom branded collateral & gifting',
    ],
    image: '/corporate_gala.png',
  },
  {
    id: 'social',
    icon: '🥂',
    title: 'Social Celebrations',
    tagline: 'Life\'s milestones deserve a royal backdrop',
    desc: 'Whether it is a silver jubilee anniversary, a landmark birthday, or a retirement soirée — we craft events that reflect your personality. Our design team works closely with you to choose themes, florals, menus, and entertainment that make each gathering unmistakably yours.',
    offerings: [
      'Birthday milestone parties', 'Engagement & pre-wedding celebrations',
      'Anniversary dinners & renewals', 'Baby shower & naming ceremonies',
      'Cocktail soirées & rooftop gatherings', 'Family reunion banquets',
    ],
    image: '/rooftop_terrace.png',
  },
  {
    id: 'exhibitions',
    icon: '🖼',
    title: 'Exhibitions & Cultural Shows',
    tagline: 'Heritage walls for contemporary visions',
    desc: "Raj Mahal's grand halls provide a rare heritage canvas for fashion weeks, art exhibitions, cultural festivals, and luxury brand showcases. The aesthetic of carved sandstone and gold leaf is an unmatched backdrop that adds prestige and visual depth to any exhibition.",
    offerings: [
      'Fashion week runway shows', 'Photography & fine art exhibitions',
      'Cultural heritage performances', 'Luxury brand & jewellery showcases',
      'Book launch & literary events', 'Film & documentary screenings',
    ],
    image: '/darbar_hall.png',
  },
];

export default function Events() {
  return (
    <div>
      {/* Hero */}
      <div className="page-hero">
        <div className="page-hero__bg">
          <img src="/wedding_gallery.png" alt="Royal event at Raj Mahal" />
          <div className="page-hero__overlay" />
        </div>
        <div className="page-hero__content container">
          <p className="page-hero__eyebrow">Event Services</p>
          <h1 className="page-hero__title">Every Event, <em>Elevated</em></h1>
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Events</span>
          </nav>
        </div>
      </div>

      {/* Intro */}
      <section className="section section--sm">
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="section-tag">What We Do</p>
          <h2 className="section-title">Curated for <em>Every Occasion</em></h2>
          <div className="divider" />
          <p className="section-subtitle">
            From intimate private dinners to grand state-level events, our experienced team of 40+ professionals tailors every detail to create moments that transcend the ordinary.
          </p>
        </div>
      </section>

      {/* Event types */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="events-list">
            {eventTypes.map((evt, i) => (
              <article key={evt.id} id={`event-${evt.id}`} className={`event-card ${i % 2 === 1 ? 'event-card--reverse' : ''}`}>
                <div className="event-card__img">
                  <img src={evt.image} alt={evt.title} />
                  <div className="event-card__img-overlay" />
                  <span className="event-card__icon-badge">{evt.icon}</span>
                </div>
                <div className="event-card__body">
                  <h2 className="event-card__title">{evt.title}</h2>
                  <p className="event-card__tagline">{evt.tagline}</p>
                  <p className="event-card__desc">{evt.desc}</p>
                  <h4 className="event-card__offerings-title">What's included:</h4>
                  <ul className="event-card__offerings">
                    {evt.offerings.map((o) => (
                      <li key={o}>
                        <span>✦</span> {o}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" id={`inquire-${evt.id}`} className="btn btn--primary">
                    Inquire About {evt.title}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
