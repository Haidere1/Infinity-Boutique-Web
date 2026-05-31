import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      background: '#0D0D13',
      borderTop: '1px solid #C9A96E',
      padding: '72px 60px 0',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr 1fr',
        gap: 60,
        paddingBottom: 60,
        borderBottom: '1px solid #2A2A35',
      }}>
        {/* Brand column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <span style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '2rem',
              color: '#C9A96E',
              lineHeight: 1,
            }}>∞</span>
            <span style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#F5F0E8',
            }}>Infinity Realm</span>
          </div>
          <p style={{
            fontSize: '0.82rem',
            color: '#8A8A95',
            lineHeight: 1.8,
            maxWidth: 280,
            marginBottom: 28,
          }}>
            At Infinity Realm, we believe style has no boundaries. Every piece we curate is a testament to timeless craft, refined taste, and the pursuit of infinite elegance.
          </p>
          {/* Social icons */}
          <div style={{ display: 'flex', gap: 12 }}>
            {['instagram', 'facebook', 'twitter-x', 'tiktok'].map(icon => (
              <a
                key={icon}
                href="/"
                style={{
                  width: 36,
                  height: 36,
                  border: '1px solid #2A2A35',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#8A8A95',
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#C9A96E'; e.currentTarget.style.color = '#C9A96E'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2A35'; e.currentTarget.style.color = '#8A8A95'; }}
              >
                <i className={`bi bi-${icon}`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.62rem',
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#C9A96E',
            marginBottom: 24,
          }}>Collections</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { label: "Men's Edit", to: '/men' },
              { label: "Women's Edit", to: '/women' },
              { label: 'New Arrivals', to: '/main' },
              { label: 'On Sale', to: '/main' },
              { label: 'My Cart', to: '/cart' },
            ].map(link => (
              <li key={link.label}>
                <Link to={link.to} style={{
                  fontSize: '0.8rem',
                  color: '#8A8A95',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#F5F0E8'}
                  onMouseLeave={e => e.currentTarget.style.color = '#8A8A95'}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact / Hours */}
        <div>
          <h4 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.62rem',
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#C9A96E',
            marginBottom: 24,
          }}>Visit Us</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { icon: 'geo-alt', text: 'Lahore, Punjab, Pakistan' },
              { icon: 'envelope', text: 'hello@infinityrealm.pk' },
              { icon: 'telephone', text: '+92 321 000 0000' },
            ].map(item => (
              <div key={item.icon} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <i className={`bi bi-${item.icon}`} style={{ color: '#C9A96E', fontSize: '0.85rem', marginTop: 2, flexShrink: 0 }}></i>
                <span style={{ fontSize: '0.8rem', color: '#8A8A95', lineHeight: 1.5 }}>{item.text}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 28 }}>
            <div style={{ fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 12 }}>
              Store Hours
            </div>
            {[
              { days: 'Mon – Thu', hours: '10 am – 9 pm' },
              { days: 'Fri – Sat', hours: '10 am – 11 pm' },
              { days: 'Sunday', hours: '11 am – 8 pm' },
            ].map(row => (
              <div key={row.days} style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                color: '#8A8A95',
                padding: '5px 0',
                borderBottom: '1px solid #1C1C26',
              }}>
                <span>{row.days}</span>
                <span style={{ color: '#F5F0E8' }}>{row.hours}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        padding: '20px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <span style={{ fontSize: '0.68rem', color: '#4A4A55', letterSpacing: '0.08em' }}>
          © {new Date().getFullYear()} Infinity Realm. All rights reserved.
        </span>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Privacy Policy', 'Terms of Service', 'Returns'].map(item => (
            <a key={item} href="/" style={{
              fontSize: '0.65rem',
              color: '#4A4A55',
              textDecoration: 'none',
              letterSpacing: '0.08em',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#8A8A95'}
              onMouseLeave={e => e.currentTarget.style.color = '#4A4A55'}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
