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
        setProducts(all.filter(p => p.category === 'women' || p.category === 'unisex'));
      } catch (e) {}
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <div style={{ background: '#0A0A0F', minHeight: '100vh' }}>
      <CollapsibleExample />

      {/* ── Hero ── */}
      <div className="ir-col-hero">
        <video
          className="ir-col-hero__video"
          src={womenVideo}
          poster={bgwomen}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="ir-col-hero__overlay" />
        <div className="ir-col-hero__content">
          <p className="ir-col-hero__eyebrow">Infinity Realm — Women's Collection</p>
          <h1 className="ir-col-hero__title">Women</h1>
          <div className="ir-col-hero__divider" />
          <div className="ir-col-hero__cta">
            <Link
              to="#women-collection"
              className="infinity-btn"
              onClick={e => {
                e.preventDefault();
                document.getElementById('women-collection').scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Collection
            </Link>
          </div>
        </div>
        <div className="ir-col-hero__scroll">
          <span className="ir-col-hero__scroll-label">Scroll</span>
          <div className="ir-col-hero__scroll-line" />
        </div>
      </div>

      {/* ── Editorial Statement ── */}
      <div className="ir-col-statement">
        <div className="ir-col-statement__rule" />
        <p className="ir-col-statement__quote">
          "Grace is not something you wear — it is something you carry. Every piece in this collection was made for women who already know that."
        </p>
        <span className="ir-col-statement__attr">— Infinity Realm</span>
        <div className="ir-col-statement__rule ir-col-statement__rule--bottom" />
      </div>

      {/* ── Product Grid ── */}
      <section className="ir-col-products" id="women-collection">
        <div className="ir-col-products__header">
          <div>
            <p className="ir-col-products__sub">Women's Edit</p>
            <h2 className="ir-col-products__heading">The Collection</h2>
          </div>
          {!loading && products.length > 0 && (
            <span className="ir-col-products__count">{products.length} piece{products.length !== 1 ? 's' : ''}</span>
          )}
        </div>

        {loading ? (
          <div className="ir-col-empty">
            <div className="ir-col-empty__symbol">∞</div>
            <p className="ir-col-empty__sub" style={{ color: '#8A8A95' }}>Loading collection...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="ir-col-empty">
            <div className="ir-col-empty__symbol">∞</div>
            <p className="ir-col-empty__title">Collection coming soon</p>
            <p className="ir-col-empty__sub">New arrivals will appear here once added by the admin.</p>
          </div>
        ) : (
          <div className="ir-col-grid">
            {products.map((pr) => (
              <Link to={`/viewproduct/${pr._id}`} key={pr._id} className="ir-col-card">
                <div className="ir-col-card__img-wrap">
                  <img src={pr.prImage} alt={pr.prName} className="ir-col-card__img" />
                  <div className="ir-col-card__badge">New</div>
                </div>
                <div className="ir-col-card__body">
                  <div>
                    <div className="ir-col-card__name">{pr.prName}</div>
                    <div className="ir-col-card__price">
                      {pr.prPrice ? `PKR ${Number(pr.prPrice).toLocaleString()}` : '—'}
                    </div>
                  </div>
                  <div className="ir-col-card__arrow">
                    <i className="bi bi-arrow-right"></i>
                  </div>
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
