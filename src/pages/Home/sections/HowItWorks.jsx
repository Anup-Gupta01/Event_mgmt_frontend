import './HowItWorks.css';

const steps = [
  {
    num: '01',
    icon: '📋',
    title: 'Share Your Vision',
    desc: 'Fill our enquiry form or call us. Tell us about your event, dates, and guest count. No commitment needed.',
  },
  {
    num: '02',
    icon: '🤝',
    title: 'Complimentary Consultation',
    desc: 'Meet our events team for a free venue tour and personalised consultation. We listen, advise, and plan.',
  },
  {
    num: '03',
    icon: '✏️',
    title: 'Bespoke Proposal',
    desc: 'Receive a detailed, fully itemised proposal tailored to your vision, guest list, and budget.',
  },
  {
    num: '04',
    icon: '🎯',
    title: 'We Handle Everything',
    desc: 'From décor setup to catering coordination — your dedicated manager ensures every detail is flawless.',
  },
  {
    num: '05',
    icon: '✨',
    title: 'Celebrate Royally',
    desc: 'Arrive as a guest at your own event. Soak in the memories while we take care of the rest.',
  },
];

export default function HowItWorks() {
  return (
    <section className="how-it-works section" style={{ background: 'var(--clr-surface-alt)' }} id="how-it-works">
      <div className="container">
        <div className="section-header">
          <p className="section-tag">The Process</p>
          <h2 className="section-title">How We Craft Your <em>Perfect Event</em></h2>
          <div className="divider" />
          <p className="section-subtitle">
            From first enquiry to the final dance — a seamless, stress-free journey guided by our expert team.
          </p>
        </div>

        <div className="hiw__steps">
          {steps.map((step, i) => (
            <div key={i} className="hiw__step">
              <div className="hiw__step-left">
                <div className="hiw__step-num">{step.num}</div>
                {i < steps.length - 1 && <div className="hiw__step-line" />}
              </div>
              <div className="hiw__step-body">
                <div className="hiw__step-icon">{step.icon}</div>
                <h3 className="hiw__step-title">{step.title}</h3>
                <p className="hiw__step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
