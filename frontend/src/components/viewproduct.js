import CollapsibleExample from "./navbar";
import '../styles/viewproduct.css';
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { prDisplay, productCart } from "../Service/api";
import Footer from "./footer";

const Viewproduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const result = await prDisplay(id);
    setProduct(result.data);
  };

  const prAdditionCart = async (e) => {
    e.preventDefault();
    await productCart(product);
    window.alert("Added to your bag.");
  };

  return (
    <div className="ir-vp-page">
      <CollapsibleExample />

      {/* Breadcrumb */}
      <nav className="ir-vp-breadcrumb">
        <Link to="/main">Home</Link>
        <span>›</span>
        <Link to="/men">Collection</Link>
        <span>›</span>
        <span style={{ color: '#F5F0E8' }}>{product.prName || 'Product'}</span>
      </nav>

      <div className="ir-vp-inner">
        {/* Image */}
        <div className="ir-vp-image">
          {product.prImage && (
            <img src={product.prImage} alt={product.prName} />
          )}
        </div>

        {/* Details */}
        <div className="ir-vp-details">
          <p className="ir-vp-eyebrow">Infinity Realm — Exclusive</p>
          <h1 className="ir-vp-name">{product.prName || '—'}</h1>

          {product.prPrice && (
            <div className="ir-vp-price">PKR {product.prPrice}</div>
          )}

          <div className="ir-vp-divider" />

          <p className="ir-vp-desc-label">About this piece</p>
          <p className="ir-vp-desc">
            {product.prDescription || 'Crafted with precision and care, this piece embodies the Infinity Realm standard — where quality meets timeless style.'}
          </p>

          <Link to="/cart" className="infinity-btn-filled ir-vp-cta" onClick={prAdditionCart}>
            Add to Bag
          </Link>

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
