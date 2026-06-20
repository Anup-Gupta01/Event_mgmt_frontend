import './FeatureStrip.css';

const features = [
  { icon: '🏛', title: '4 Distinct Venues', desc: 'From 80 to 800 guests' },
  { icon: '👨‍🍳', title: 'Royal Catering', desc: 'Rajasthani & global cuisine' },
  { icon: '🎨', title: 'Bespoke Décor', desc: 'Custom floral & theme design' },
  { icon: '📸', title: 'In-house Photography', desc: 'Professional coverage' },
  { icon: '🚗', title: 'Valet Parking', desc: 'Dedicated parking staff' },
  { icon: '👑', title: 'Dedicated Concierge', desc: 'From first call to last dance' },
];

export default function FeatureStrip() {
  return (
    <section className="feature-strip" aria-label="Key features">
      <div className="container">
        <ul className="feature-strip__list">
          {features.map((f) => (
            <li key={f.title} className="feature-strip__item">
              <span className="feature-strip__icon">{f.icon}</span>
              <div>
                <p className="feature-strip__title">{f.title}</p>
                <p className="feature-strip__desc">{f.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
