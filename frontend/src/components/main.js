import CollapsibleExample from "./navbar";
import men from '../images/men.jpg';
import women from '../images/women.jpg';
import '../styles/main.css';
import Footer from "./footer";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { prDisplay } from "../Service/api";

const Mainpage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = async () => {
    const result = await prDisplay();
    setProducts(result.data);
  };

  return (
    <div style={{ background: '#0A0A0F', minHeight: '100vh' }}>
      <CollapsibleExample />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="ir-hero">
        <div className="ir-hero__bg">
          <div className="ir-hero__orb ir-hero__orb--1" />
          <div className="ir-hero__orb ir-hero__orb--2" />
          <div className="ir-hero__orb ir-hero__orb--3" />
          <div className="ir-hero__sweep" />
        </div>
        <div className="ir-hero__overlay" />
        <div className="ir-hero__content">
          <div className="ir-hero__eyebrow">∞</div>
          <h1 className="ir-hero__title">Timeless Elegance</h1>
          <p className="ir-hero__sub">Curated luxury for those who know</p>
          <div className="ir-hero__cta">
            <Link to="/men" className="infinity-btn" style={{ marginRight: 16 }}>Shop Men</Link>
            <Link to="/women" className="infinity-btn">Shop Women</Link>
          </div>
        </div>
      </section>

      {/* ── Category Split ───────────────────────────────── */}
      <section className="ir-categories">
        <div className="ir-cat">
          <img src={men} alt="Men's Collection" className="ir-cat__img" />
          <div className="ir-cat__overlay" />
          <div className="ir-cat__label">
            <p className="ir-cat__label-eyebrow">Collection</p>
            <h2 className="ir-cat__label-title">Men</h2>
            <Link to="/men" className="ir-cat__label-link">Explore Collection</Link>
          </div>
        </div>
        <div className="ir-cat">
          <img src={women} alt="Women's Collection" className="ir-cat__img" />
          <div className="ir-cat__overlay" />
          <div className="ir-cat__label">
            <p className="ir-cat__label-eyebrow">Collection</p>
            <h2 className="ir-cat__label-title">Women</h2>
            <Link to="/women" className="ir-cat__label-link">Explore Collection</Link>
          </div>
        </div>
      </section>

      {/* ── Promo Banner ─────────────────────────────────── */}
      <section className="ir-promo">
        <p className="ir-promo__eyebrow">Limited Time</p>
        <h2 className="ir-promo__title">50% Off Winter Arrivals</h2>
        <p className="ir-promo__sub">Discover the season's finest — for a price that moves.</p>
        <Link to="/men" className="infinity-btn-filled">Shop the Sale</Link>
      </section>

      {/* ── Featured Products ────────────────────────────── */}
      <section className="ir-featured">
        <div className="ir-featured__header">
          <div className="ir-featured__header-left">
            <p className="section-subtitle">Curated Picks</p>
            <div className="divider-gold left" style={{ marginBottom: 16 }} />
            <h2 className="section-title">Featured Products</h2>
          </div>
          <Link to="/men" className="infinity-btn" style={{ flexShrink: 0 }}>View All</Link>
        </div>

        <div className="ir-featured__grid">
          {products.slice(0, 8).map((product) => (
            <Link
              key={product._id}
              to={`/viewproduct/${product._id}`}
              className="ir-product-card"
              style={{ textDecoration: 'none' }}
            >
              <div className="ir-product-card__img-wrap">
                <img
                  src={product.prImage}
                  alt={product.prName}
                  className="ir-product-card__img"
                />
              </div>
              <div className="ir-product-card__info">
                <div className="ir-product-card__name">{product.prName || 'Infinity Piece'}</div>
                <div className="ir-product-card__desc">{product.prDescription}</div>
                {product.prPrice && (
                  <div style={{ marginTop: 8, fontFamily: 'Inter', fontSize: '0.8rem', color: '#C9A96E' }}>
                    PKR {product.prPrice}
                  </div>
                )}
                <span className="ir-product-card__link">View Details</span>
              </div>
            </Link>
          ))}
        </div>

        {products.length > 8 && (
          <div className="ir-featured__footer">
            <button className="infinity-btn" onClick={() => navigate('/men')}>Load More</button>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Mainpage;
