import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CollapsibleExample() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isAdmin = localStorage.getItem('ir_role') === 'admin';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`ir-nav${scrolled ? ' ir-nav--scrolled' : ''}`}>
        <div className="ir-nav__inner">
          {/* Brand */}
          <Link to="/main" className="ir-nav__brand">
            <span className="ir-nav__infinity">∞</span>
            <span className="ir-nav__brandname">Infinity Realm</span>
          </Link>

          {/* Desktop links */}
          <ul className="ir-nav__links">
            <li><Link to="/men" className="ir-nav__link">Men</Link></li>
            <li><Link to="/women" className="ir-nav__link">Women</Link></li>
            <li><Link to="/main" className="ir-nav__link">New Arrivals</Link></li>
            {isAdmin && <li><Link to="/admin" className="ir-nav__link">Admin</Link></li>}
          </ul>

          {/* Right actions */}
          <div className="ir-nav__actions">
            <Link to="/cart" className="ir-nav__icon" aria-label="Cart">
              <i className="bi bi-bag"></i>
            </Link>
            <Link to="/login" className="ir-nav__icon" aria-label="Account">
              <i className="bi bi-person"></i>
            </Link>
            {/* Hamburger */}
            <button
              className={`ir-nav__hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="ir-nav__overlay" onClick={() => setMenuOpen(false)}>
          <div className="ir-nav__overlay-inner" onClick={e => e.stopPropagation()}>
            <button className="ir-nav__overlay-close" onClick={() => setMenuOpen(false)}>
              <i className="bi bi-x-lg"></i>
            </button>
            <div className="ir-nav__overlay-brand">
              <span className="ir-nav__infinity">∞</span>
              <span className="ir-nav__brandname">Infinity Realm</span>
            </div>
            <ul className="ir-nav__overlay-links">
              <li><Link to="/men" onClick={() => setMenuOpen(false)}>Men</Link></li>
              <li><Link to="/women" onClick={() => setMenuOpen(false)}>Women</Link></li>
              <li><Link to="/main" onClick={() => setMenuOpen(false)}>New Arrivals</Link></li>
              <li><Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link></li>
              <li><Link to="/login" onClick={() => setMenuOpen(false)}>Account</Link></li>
              {isAdmin && <li><Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link></li>}
            </ul>
          </div>
        </div>
      )}

      <style>{`
        .ir-nav {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 200;
          background: transparent;
          transition: background 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      border-color 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          border-bottom: 1px solid transparent;
        }
        .ir-nav--scrolled {
          background: rgba(10, 10, 15, 0.96);
          border-bottom-color: #2A2A35;
          backdrop-filter: blur(12px);
        }
        .ir-nav__inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ir-nav__brand {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
        }
        .ir-nav__infinity {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          color: #C9A96E;
          line-height: 1;
        }
        .ir-nav__brandname {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          color: #F5F0E8;
          text-transform: uppercase;
        }
        .ir-nav__links {
          display: flex;
          gap: 40px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .ir-nav__link {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          font-weight: 400;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #F5F0E8;
          text-decoration: none;
          position: relative;
          padding-bottom: 2px;
          transition: color 0.2s;
        }
        .ir-nav__link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #C9A96E;
          transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .ir-nav__link:hover { color: #C9A96E; }
        .ir-nav__link:hover::after { width: 100%; }
        .ir-nav__actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .ir-nav__icon {
          color: #F5F0E8;
          font-size: 1.1rem;
          text-decoration: none;
          transition: color 0.2s;
        }
        .ir-nav__icon:hover { color: #C9A96E; }
        .ir-nav__hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        .ir-nav__hamburger span {
          display: block;
          width: 22px;
          height: 1px;
          background: #F5F0E8;
          transition: all 0.3s;
        }
        .ir-nav__hamburger.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
        .ir-nav__hamburger.open span:nth-child(2) { opacity: 0; }
        .ir-nav__hamburger.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }
        /* Mobile overlay */
        .ir-nav__overlay {
          position: fixed;
          inset: 0;
          z-index: 300;
          background: rgba(10,10,15,0.6);
          backdrop-filter: blur(4px);
        }
        .ir-nav__overlay-inner {
          position: absolute;
          right: 0;
          top: 0;
          height: 100%;
          width: min(320px, 85vw);
          background: #13131A;
          border-left: 1px solid #2A2A35;
          padding: 32px 32px;
          display: flex;
          flex-direction: column;
        }
        .ir-nav__overlay-close {
          align-self: flex-end;
          background: none;
          border: none;
          color: #8A8A95;
          font-size: 1.2rem;
          cursor: pointer;
          margin-bottom: 40px;
          transition: color 0.2s;
        }
        .ir-nav__overlay-close:hover { color: #C9A96E; }
        .ir-nav__overlay-brand {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 48px;
        }
        .ir-nav__overlay-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .ir-nav__overlay-links li a {
          display: block;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          font-weight: 400;
          color: #F5F0E8;
          text-decoration: none;
          padding: 10px 0;
          border-bottom: 1px solid #2A2A35;
          transition: color 0.2s, padding-left 0.2s;
        }
        .ir-nav__overlay-links li a:hover {
          color: #C9A96E;
          padding-left: 8px;
        }
        @media (max-width: 900px) {
          .ir-nav__links { display: none; }
          .ir-nav__hamburger { display: flex; }
          .ir-nav__inner { padding: 0 24px; }
        }
      `}</style>
    </>
  );
}

export default CollapsibleExample;
