import { Link } from 'react-router-dom';
import './GalleryPreview.css';

const images = [
  { src: '/wedding_gallery.png',   alt: 'Royal wedding ceremony',      span: 'wide' },
  { src: '/darbar_hall.png',       alt: 'Darbar Hall grand interior',   span: 'tall' },
  { src: '/jasmine_pavilion.png',  alt: 'Jasmine Pavilion wedding',     span: 'normal' },
  { src: '/mehendi_ceremony.png',  alt: 'Mehendi ceremony in garden',   span: 'normal' },
  { src: '/corporate_gala.png',    alt: 'Corporate gala dinner',        span: 'normal' },
  { src: '/rooftop_terrace.png',   alt: 'Rooftop cocktail evening',     span: 'normal' },
];

export default function GalleryPreview() {
  return (
    <section className="gallery-preview section" style={{ background: 'var(--clr-surface-alt)' }} id="gallery-preview">
      <div className="container">
        <div className="section-header">
          <p className="section-tag">Our Gallery</p>
          <h2 className="section-title">Moments Captured in <em>Gold</em></h2>
          <div className="divider" />
        </div>

        <div className="gallery-preview__grid">
          {images.map((img, i) => (
            <div key={i} className={`gallery-preview__item gallery-preview__item--${img.span}`}>
              <img src={img.src} alt={img.alt} />
              <div className="gallery-preview__item-overlay">
                <p>{img.alt}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="gallery-preview__footer">
          <Link to="/gallery" id="full-gallery-btn" className="btn btn--secondary btn--lg">
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
