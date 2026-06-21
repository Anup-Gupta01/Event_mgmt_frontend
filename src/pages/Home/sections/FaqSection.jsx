import { useState } from 'react';
import './FaqSection.css';

const faqs = [
  {
    q: 'How far in advance should I book a venue?',
    a: 'We recommend booking at least 6–12 months in advance, especially for weekend dates during the wedding season (October–March). However, we do accommodate last-minute bookings based on availability.',
  },
  {
    q: 'Can I customise the package inclusions?',
    a: 'Absolutely. All our packages are starting points. Our events team will work with you to build a bespoke bundle that matches your vision, guest list, and budget — adding or removing services as needed.',
  },
  {
    q: 'Is a venue tour available before booking?',
    a: 'Yes! We offer complimentary guided venue tours Monday through Saturday by appointment. You can request a tour through our Contact page or by calling our events desk directly.',
  },
  {
    q: 'What is your cancellation and refund policy?',
    a: 'Cancellations made 90+ days before the event receive a full deposit refund. Cancellations within 30–90 days receive a 50% refund. Within 30 days, the deposit is non-refundable. We strongly recommend event insurance.',
  },
  {
    q: 'Do you allow external caterers or vendors?',
    a: 'Our in-house catering and vendor teams are world-class and preferred. However, we do allow pre-approved external vendors for specific services (e.g., specialist cuisine) with a small coordination fee.',
  },
  {
    q: 'Is valet parking available for all events?',
    a: 'Yes. We offer valet parking for all event types. Capacity varies by venue — from 50 cars at our Suite to unlimited valet with our Royal package. Parking details are discussed during the planning process.',
  },
  {
    q: 'Can you accommodate destination wedding guests with accommodation?',
    a: 'Yes. Our Presidential Suite and Bridal Suite are available for guests, and we have tie-ups with luxury hotels nearby for extended accommodation needs. Our team can coordinate the full guest hospitality experience.',
  },
  {
    q: 'What happens on the day of the event?',
    a: 'Your dedicated event manager will be on-site from setup through the end of the event. They handle all vendor coordination, timing, and troubleshooting so you can focus entirely on celebrating.',
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState(null);
  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <section className="faq section" id="faq">
      <div className="container">
        <div className="section-header">
          <p className="section-tag">Common Questions</p>
          <h2 className="section-title">Frequently Asked <em>Questions</em></h2>
          <div className="divider" />
        </div>

        <div className="faq__list">
          {faqs.map((item, i) => (
            <div
              key={i}
              className={`faq__item ${open === i ? 'faq__item--open' : ''}`}
              id={`faq-${i}`}
            >
              <button
                className="faq__question"
                onClick={() => toggle(i)}
                aria-expanded={open === i}
                aria-controls={`faq-ans-${i}`}
              >
                <span>{item.q}</span>
                <span className="faq__icon" aria-hidden="true">{open === i ? '−' : '+'}</span>
              </button>
              <div
                className="faq__answer"
                id={`faq-ans-${i}`}
                role="region"
                aria-hidden={open !== i}
              >
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
