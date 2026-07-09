import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../utils/api';
import './VenuesPreview.css';


const fallbackVenues = [
  { id:'1', name:'Darbar Hall', capacity:800, category:'Grand', description:'The grandest hall at Eventora — adorned with hand-carved marble pillars, Rajputana frescoes, and a 40-foot gold-leaf ceiling.', slug:'darbar-hall' },
  { id:'2', name:'Jasmine Pavilion', capacity:350, category:'Garden', description:'An elegant indoor-outdoor pavilion surrounded by manicured jasmine gardens.', slug:'jasmine-pavilion' },
  { id:'3', name:'Rooftop Terrace', capacity:200, category:'Open Air', description:'An open-air terrace with panoramic views of the city skyline and Rajasthani landscape.', slug:'rooftop-terrace' },
  { id:'4', name:'Maharani Suite', capacity:80, category:'Corporate', description:'An exclusive, intimate boardroom-style venue styled in deep teal and antique gold.', slug:'maharani-suite' },
];

const venueImages = {
  'darbar-hall': '/darbar_hall.png',
  'jasmine-pavilion': '/jasmine_pavilion.png',
  'rooftop-terrace': '/rooftop_terrace.png',
  'maharani-suite': '/maharani_suite.png',
};

export default function VenuesPreview() {
  const [venues, setVenues] = useState(fallbackVenues);

  useEffect(() => {
    api.get('/api/venues')
      .then(r => {
        const list = r.data?.venues || r.data;
        if (Array.isArray(list) && list.length > 0) setVenues(list);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="venues-preview section" id="venues-preview">
      <div className="container">
        <div className="section-header">
          <p className="section-tag">Our Spaces</p>
          <h2 className="section-title">Four Legendary <em>Venues</em></h2>
          <div className="divider" />
          <p className="section-subtitle">
            Each venue within Eventora tells its own story — discover the perfect setting for your occasion.
          </p>
        </div>

        <div className="venues-preview__grid">
          {venues.map((v) => (
            <article key={v.id} className="venue-card" id={`venue-card-${v.slug}`}>
              <div className="venue-card__img">
                <img src={venueImages[v.slug] || '/hero_palace.png'} alt={v.name} />
                <div className="venue-card__overlay" />
                <span className="venue-card__category badge badge--gold">{v.category}</span>
              </div>
              <div className="venue-card__body">
                <h3 className="venue-card__name">{v.name}</h3>
                <p className="venue-card__capacity">
                  <span>👥</span> Up to {v.capacity.toLocaleString()} guests
                </p>
                <p className="venue-card__desc">{v.description}</p>
                <div className="venue-card__footer">
                  <Link to={`/venues/${v.slug}`} className="btn btn--secondary venue-card__btn">
                    View Details
                  </Link>
                  <Link to="/contact" className="venue-card__book">Book →</Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="venues-preview__footer">
          <Link to="/venues" id="all-venues-btn" className="btn btn--primary btn--lg">
            Explore All Venues
          </Link>
        </div>
      </div>
    </section>
  );
}
