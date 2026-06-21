import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const navLinks = [
  { label: 'Home',     to: '/' },
  { label: 'About',    to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Venues',   to: '/venues' },
  { label: 'Packages', to: '/packages' },
  { label: 'Gallery',  to: '/gallery' },
  { label: 'Contact',  to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const transparent = isHome && !scrolled;

  return (
    <header className={`navbar ${transparent ? 'navbar--transparent' : 'navbar--solid'} ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">

        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">✦</span>
          <div className="navbar__logo-text">
            <span className="navbar__logo-main">Raj Mahal</span>
            <span className="navbar__logo-sub">Est. 1947 · Jaipur</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="navbar__nav" aria-label="Primary navigation">
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* CTA */}
        <div className="navbar__actions">
          <Link to="/login" id="nav-login-btn" className="btn navbar__login-btn">
            Login
          </Link>
          <Link to="/contact" id="nav-book-cta" className="btn btn--primary navbar__cta">
            Book an Event
          </Link>
          <button
            className="navbar__hamburger"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`hamburger-line ${menuOpen ? 'hamburger-line--open' : ''}`} />
            <span className={`hamburger-line ${menuOpen ? 'hamburger-line--open' : ''}`} />
            <span className={`hamburger-line ${menuOpen ? 'hamburger-line--open' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
        {navLinks.map(({ label, to }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`
            }
          >
            {label}
          </NavLink>
        ))}
        <div className="navbar__mobile-btns">
          <Link to="/login" className="btn btn--secondary" style={{ flex: 1, justifyContent: 'center' }}>
            Login
          </Link>
          <Link to="/contact" className="btn btn--primary" style={{ flex: 1, justifyContent: 'center' }}>
            Book an Event
          </Link>
        </div>
      </div>
    </header>
  );
}
