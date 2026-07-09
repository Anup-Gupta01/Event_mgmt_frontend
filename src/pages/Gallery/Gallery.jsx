import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../About/About.css';
import './Gallery.css';

const galleryItems = [
  { src: '/wedding_gallery.png',   alt: 'Royal wedding ceremony in Darbar Hall',  category: 'Wedding' },
  { src: '/darbar_hall.png',       alt: 'Darbar Hall grand interior setup',        category: 'Venue' },
  { src: '/jasmine_pavilion.png',  alt: 'Jasmine Pavilion garden mandap',          category: 'Wedding' },
  { src: '/mehendi_ceremony.png',  alt: 'Colourful mehendi ceremony',              category: 'Wedding' },
  { src: '/corporate_gala.png',    alt: 'Corporate awards gala evening',           category: 'Corporate' },
  { src: '/rooftop_terrace.png',   alt: 'Rooftop cocktail soirée at sunset',       category: 'Social' },
  { src: '/maharani_suite.png',    alt: 'Maharani Suite corporate dinner',         category: 'Corporate' },
  { src: '/hero_palace.png',       alt: 'Eventora venue exterior at golden hour',category: 'Venue' },
];

const filters = ['All', 'Wedding', 'Corporate', 'Social', 'Venue'];

export default function Gallery() {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = active === 'All' ? galleryItems : galleryItems.filter(i => i.category === active);

  return (
    <div>
      {/* Hero */}
      <div className="page-hero">
        <div className="page-hero__bg">
          <img src="/mehendi_ceremony.png" alt="Gallery" />
          <div className="page-hero__overlay" />
        </div>
        <div className="page-hero__content container">
          <p className="page-hero__eyebrow">Photo Gallery</p>
          <h1 className="page-hero__title">Moments of <em>Magnificence</em></h1>
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Gallery</span>
          </nav>
        </div>
      </div>

      {/* Filter */}
      <div className="venues-filter">
        <div className="container">
          <div className="venues-filter__inner">
            <p className="venues-filter__label">Filter by:</p>
            <div className="venues-filter__tabs">
              {filters.map((f) => (
                <button
                  key={f}
                  id={`gallery-filter-${f.toLowerCase()}`}
                  className={`venues-filter__tab ${active === f ? 'venues-filter__tab--active' : ''}`}
                  onClick={() => setActive(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="section">
        <div className="container">
          <div className="gallery-grid">
            {filtered.map((img, i) => (
              <div
                key={i}
                className="gallery-item"
                onClick={() => setLightbox(img)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setLightbox(img)}
                aria-label={`View ${img.alt}`}
              >
                <img src={img.src} alt={img.alt} />
                <div className="gallery-item__overlay">
                  <span className="gallery-item__zoom">⊕</span>
                  <p className="gallery-item__caption">{img.alt}</p>
                  <span className="gallery-item__cat badge badge--gold">{img.category}</span>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--clr-muted)', padding: '4rem 0' }}>
              No images in this category.
            </p>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="lightbox"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <div className="lightbox__inner" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox__close" onClick={() => setLightbox(null)} aria-label="Close lightbox">✕</button>
            <img src={lightbox.src} alt={lightbox.alt} className="lightbox__img" />
            <p className="lightbox__caption">{lightbox.alt}</p>
          </div>
        </div>
      )}
    </div>
  );
}
