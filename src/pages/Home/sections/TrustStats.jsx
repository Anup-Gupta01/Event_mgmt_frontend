import { useEffect, useRef, useState } from 'react';
import './TrustStats.css';

const stats = [
  { number: 77,    suffix: '+', label: 'Years of Royal Legacy',  desc: 'Est. 1947' },
  { number: 12000, suffix: '+', label: 'Events Hosted',          desc: 'And counting' },
  { number: 4,     suffix: '',  label: 'Distinct Venues',        desc: 'Each unique' },
  { number: 98,    suffix: '%', label: 'Guest Satisfaction',     desc: 'Verified reviews' },
  { number: 500,   suffix: '+', label: 'Weddings Celebrated',    desc: 'Royal ceremonies' },
  { number: 24,    suffix: '/7',label: 'Event Support',          desc: 'Always available' },
];

function useCountUp(target, duration = 1800, active) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return count;
}

function StatItem({ stat, active }) {
  const count = useCountUp(stat.number, 1600, active);
  return (
    <div className="trust-stat">
      <div className="trust-stat__number">
        {count.toLocaleString('en-IN')}{stat.suffix}
      </div>
      <div className="trust-stat__label">{stat.label}</div>
      <div className="trust-stat__desc">{stat.desc}</div>
    </div>
  );
}

export default function TrustStats() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="trust-stats" ref={ref} id="trust-stats">
      <div className="container">
        <div className="trust-stats__grid">
          {stats.map((s, i) => (
            <StatItem key={i} stat={s} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
