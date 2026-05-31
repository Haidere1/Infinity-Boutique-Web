import CollapsibleExample from "./navbar";
import '../styles/viewproduct.css';
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { prDisplay, productCart } from "../Service/api";
import Footer from "./footer";

const Viewproduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [added, setAdded] = useState(false);
  const isLoggedIn = !!localStorage.getItem('ir_token');

  useEffect(() => { getProduct(); }, []);

  const getProduct = async () => {
    try {
      const result = await prDisplay(id);
      setProduct(result.data);
    } catch (e) {}
  };

  const prAdditionCart = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    await productCart(product);
    setAdded(true);
    setTimeout(() => navigate('/cart'), 800);
  };

  return (
    <div className="ir-vp-page">
      <CollapsibleExample />

      <nav className="ir-vp-breadcrumb">
        <Link to="/">Home</Link>
        <span>›</span>
        <Link to="/men">Collection</Link>
        <span>›</span>
        <span style={{ color: '#F5F0E8' }}>{product.prName || 'Product'}</span>
      </nav>

      <div className="ir-vp-inner">
        <div className="ir-vp-image">
          {product.prImage && <img src={product.prImage} alt={product.prName} />}
        </div>
        <div className="ir-vp-details">
          <p className="ir-vp-eyebrow">Infinity Realm — Exclusive</p>
          <h1 className="ir-vp-name">{product.prName || '—'}</h1>
          {product.prPrice && <div className="ir-vp-price">PKR {product.prPrice}</div>}
          <div className="ir-vp-divider" />
          <p className="ir-vp-desc-label">About this piece</p>
          <p className="ir-vp-desc">
            {product.prDescription || 'Crafted with precision and care, this piece embodies the Infinity Realm standard — where quality meets timeless style.'}
          </p>

          <button
            className="infinity-btn-filled ir-vp-cta"
            onClick={prAdditionCart}
            style={{ width: '100%', cursor: 'pointer' }}
          >
            {added ? 'Added — Redirecting...' : isLoggedIn ? 'Add to Bag' : 'Sign In to Add to Bag'}
          </button>

          {!isLoggedIn && (
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: '#8A8A95', marginTop: 12, textAlign: 'center' }}>
              <Link to="/signup" style={{ color: '#C9A96E', borderBottom: '1px solid transparent' }}>Create a free account</Link> to start shopping
            </p>
          )}

          <div className="ir-vp-secondary">
            <i className="bi bi-bag-check" style={{ color: '#C9A96E' }}></i>
            Free delivery on orders over PKR 5,000
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Viewproduct;
