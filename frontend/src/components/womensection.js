import CollapsibleExample from "./navbar";
import bgwomen from '../women/bgwomen.jpg';
import womenVideo from '../videos/vodd.mp4';
import '../styles/mensection.css';
import '../styles/womensection.css';
import { useEffect, useState } from "react";
import Footer from "./footer";
import { Link } from "react-router-dom";
import { prDisplay } from "../Service/api";

const Women = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await prDisplay();
        const all = result.data || [];
        setProducts(all.filter(p => p.category === 'women' || p.category === 'unisex' || !p.category));
      } catch (e) {}
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <div style={{ background: '#0A0A0F', minHeight: '100vh' }}>
      <CollapsibleExample />

      {/* ── Full-viewport Hero ── */}
      <div className="ir-section-hero">
        <video
          className="ir-section-hero__video"
          src={womenVideo}
          poster={bgwomen}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="ir-section-hero__overlay" />
        <div className="ir-section-hero__content">
          <p className="ir-section-hero__eyebrow">Infinity Realm — Women</p>
          <h1 className="ir-section-hero__title">Grace<br />Redefined</h1>
          <div className="divider-gold left" style={{ marginTop: 20, marginBottom: 28 }} />
          <Link to="#collection" className="infinity-btn" onClick={e => { e.preventDefault(); document.getElementById('women-collection').scrollIntoView({ behavior: 'smooth' }); }}>
            View Collection
          </Link>
        </div>
      </div>

      {/* ── Editorial Strip ── */}
      <div className="ir-editorial-strip ir-editorial-strip--women">
        <div className="ir-editorial-strip__line" />
        <p className="ir-editorial-strip__quote">"50% Off Winter Collection — Shop Now"</p>
        <div className="ir-editorial-strip__line" />
      </div>

      {/* ── Product Grid ── */}
      <section className="ir-products-section" id="women-collection">
        <div className="ir-products-section__header">
          <div>
            <p className="section-subtitle">Women's Edit</p>
            <div className="divider-gold left" style={{ marginBottom: 12 }} />
            <h2 className="section-title">The Collection</h2>
          </div>
        </div>

        {loading ? (
          <div className="ir-products-empty">
            <p style={{ color: '#8A8A95', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', letterSpacing: '0.1em' }}>Loading collection...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="ir-products-empty">
            <div className="ir-products-empty__symbol">∞</div>
            <p className="ir-products-empty__title">Collection coming soon</p>
            <p className="ir-products-empty__sub">New arrivals will appear here once added by the admin.</p>
          </div>
        ) : (
          <div className="ir-products-grid">
            {products.map((pr) => (
              <Link to={`/viewproduct/${pr._id}`} key={pr._id} className="ir-pr-card">
                <div className="ir-pr-card__img-wrap">
                  <img src={pr.prImage} alt={pr.prName} className="ir-pr-card__img" />
                </div>
                <div className="ir-pr-card__body">
                  <div>
                    <div className="ir-pr-card__name">{pr.prName}</div>
                    <div className="ir-pr-card__price">{pr.prPrice ? `PKR ${Number(pr.prPrice).toLocaleString()}` : '—'}</div>
                  </div>
                  <span className="ir-pr-card__cta">View</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Women;
