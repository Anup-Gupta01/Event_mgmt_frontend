import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container">
          <div className="footer__grid">

            {/* Brand */}
            <div className="footer__brand">
              <div className="footer__logo">
                <span className="footer__logo-icon">✦</span>
                <div>
                  <div className="footer__logo-main">Raj Mahal</div>
                  <div className="footer__logo-sub">Est. 1947 · Jaipur</div>
                </div>
              </div>
              <p className="footer__tagline">
                Where every occasion becomes a royal memory. Crafting extraordinary events in the heart of Rajasthan since 1947.
              </p>
              <div className="footer__socials">
                <a href="#" aria-label="Instagram" className="footer__social-link">𝕀</a>
                <a href="#" aria-label="Facebook"  className="footer__social-link">𝕗</a>
                <a href="#" aria-label="YouTube"   className="footer__social-link">▶</a>
              </div>
            </div>

            {/* Quick links */}
            <div className="footer__col">
              <h4 className="footer__heading">Explore</h4>
              <ul className="footer__links">
                <li><Link to="/about">Our Story</Link></li>
                <li><Link to="/venues">Our Venues</Link></li>
                <li><Link to="/events">Event Services</Link></li>
                <li><Link to="/gallery">Photo Gallery</Link></li>
                <li><Link to="/packages">Packages</Link></li>
                <li><Link to="/booking">Book an Event</Link></li>
                <li><Link to="/track">Track Booking</Link></li>
              </ul>
            </div>

            {/* Venues */}
            <div className="footer__col">
              <h4 className="footer__heading">Our Venues</h4>
              <ul className="footer__links">
                <li><Link to="/venues/darbar-hall">Darbar Hall</Link></li>
                <li><Link to="/venues/jasmine-pavilion">Jasmine Pavilion</Link></li>
                <li><Link to="/venues/rooftop-terrace">Rooftop Terrace</Link></li>
                <li><Link to="/venues/maharani-suite">Maharani Suite</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer__col">
              <h4 className="footer__heading">Contact</h4>
              <address className="footer__address">
                <p>Palace Road, Near City Palace</p>
                <p>Jaipur, Rajasthan — 302 001</p>
                <a href="tel:+911412345678" className="footer__contact-link">+91 141 234 5678</a>
                <a href="mailto:events@rajmahal.in" className="footer__contact-link">events@rajmahal.in</a>
              </address>
              <div className="footer__hours">
                <p className="footer__hours-label">Office Hours</p>
                <p>Mon – Sat: 9:00 AM – 7:00 PM</p>
                <p>Sun: 10:00 AM – 4:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-inner">
            <p className="footer__copy">
              © {new Date().getFullYear()} Raj Mahal Palace & Events. All rights reserved.
            </p>
            <div className="footer__legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <Link to="/admin">Admin</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
