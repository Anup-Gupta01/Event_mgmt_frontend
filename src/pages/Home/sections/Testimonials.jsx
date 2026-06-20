import { useState, useEffect } from 'react';
import axios from 'axios';
import './Testimonials.css';

const API = 'http://localhost:5000';

const fallback = [
  { id:'1', name:'Priya & Rohan Mehta', event:'Wedding — Darbar Hall', rating:5, text:'Raj Mahal turned our wedding into a fairy tale. Every pillar, every flower, every moment was curated to perfection. Our guests still talk about it six months later.', location:'Mumbai' },
  { id:'2', name:'Arvind Kapoor', event:'Corporate Gala — Maharani Suite', rating:5, text:'We have hosted our annual awards dinner at Raj Mahal for three consecutive years. The professionalism, the food, and the ambience are consistently world-class.', location:'Delhi' },
  { id:'3', name:'Sunita & Deepak Sharma', event:'Anniversary — Jasmine Pavilion', rating:5, text:'The jasmine garden and that soft golden lighting — it felt like we stepped into a Mughal miniature painting. An evening we will treasure forever.', location:'Jaipur' },
  { id:'4', name:'Neha Agarwal', event:"Birthday Soirée — Rooftop Terrace", rating:5, text:'The rooftop under the stars with the city glowing below — absolutely magical. Every detail from the bar setup to the live music was handled flawlessly.', location:'Udaipur' },
];

function Stars({ n }) {
  return (
    <span className="testimonial-stars">
      {'★'.repeat(n)}{'☆'.repeat(5 - n)}
    </span>
  );
}

export default function Testimonials() {
  const [items, setItems]   = useState(fallback);
  const [active, setActive] = useState(0);

  useEffect(() => {
    axios.get(`${API}/api/testimonials`).then(r => setItems(r.data)).catch(() => {});
  }, []);

  return (
    <section className="testimonials section" id="testimonials">
      <div className="container">
        <div className="section-header">
          <p className="section-tag">Guest Stories</p>
          <h2 className="section-title">Words that <em>Move Us</em></h2>
          <div className="divider" />
        </div>

        <div className="testimonials__layout">
          {/* Main quote */}
          <div className="testimonials__main">
            <div className="testimonials__quote-mark">"</div>
            <blockquote className="testimonials__quote">
              {items[active]?.text}
            </blockquote>
            <div className="testimonials__author">
              <div className="testimonials__author-avatar">
                {items[active]?.name.charAt(0)}
              </div>
              <div>
                <p className="testimonials__author-name">{items[active]?.name}</p>
                <p className="testimonials__author-event">{items[active]?.event}</p>
                <p className="testimonials__author-loc">📍 {items[active]?.location}</p>
              </div>
            </div>
            <Stars n={items[active]?.rating || 5} />
          </div>

          {/* List of others */}
          <div className="testimonials__list">
            {items.map((t, i) => (
              <button
                key={t.id}
                className={`testimonials__item ${i === active ? 'testimonials__item--active' : ''}`}
                onClick={() => setActive(i)}
                aria-pressed={i === active}
              >
                <div className="testimonials__item-avatar">{t.name.charAt(0)}</div>
                <div>
                  <p className="testimonials__item-name">{t.name}</p>
                  <p className="testimonials__item-event">{t.event}</p>
                </div>
                <Stars n={t.rating} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
