import { Link } from 'react-router-dom';
import './AboutPreview.css';

export default function AboutPreview() {
  return (
    <section className="about-preview section" id="about-preview">
      <div className="container">
        <div className="about-preview__grid">

          {/* Image side */}
          <div className="about-preview__images">
            <div className="about-preview__img-main">
              <img src="/darbar_hall.png" alt="Darbar Hall interior" />
            </div>
            <div className="about-preview__img-accent">
              <img src="/jasmine_pavilion.png" alt="Jasmine Pavilion garden" />
              <div className="about-preview__badge">
                <span className="about-preview__badge-number">1947</span>
                <span className="about-preview__badge-text">Est. Jaipur</span>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div className="about-preview__content">
            <p className="section-tag">Our Heritage</p>
            <h2 className="section-title">
              A Palace Born<br />for <em>Royal Moments</em>
            </h2>
            <div className="divider divider--left" />
            <p className="about-preview__body">
              Nestled in the heart of the Pink City, Raj Mahal has been the canvas for Rajasthan's most treasured celebrations since 1947. What began as a royal guest house of the Maharaja of Pratapgarh has evolved into Jaipur's most sought-after luxury event destination.
            </p>
            <p className="about-preview__body">
              Our palace spans over 3 acres of manicured grounds, four distinct event venues, a heritage orchid garden, and a culinary team of 120 specialists — all dedicated to transforming your vision into an experience your guests will speak of for generations.
            </p>

            <ul className="about-preview__highlights">
              <li>
                <span className="about-preview__highlight-icon">✦</span>
                <span>FSSAI-certified in-house royal kitchen</span>
              </li>
              <li>
                <span className="about-preview__highlight-icon">✦</span>
                <span>Rajasthan Tourism Heritage Award — 2019, 2022</span>
              </li>
              <li>
                <span className="about-preview__highlight-icon">✦</span>
                <span>Preferred venue for 3 Bollywood film productions</span>
              </li>
              <li>
                <span className="about-preview__highlight-icon">✦</span>
                <span>ISO 9001:2015 certified event management team</span>
              </li>
            </ul>

            <Link to="/about" id="about-read-more" className="btn btn--secondary">
              Our Full Story →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
