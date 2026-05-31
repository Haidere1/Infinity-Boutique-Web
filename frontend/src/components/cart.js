import CollapsibleExample from "./navbar";
import { useEffect, useState } from "react";
import { deleteProductCart, prDisplayCart } from "../Service/api";
import { Link } from "react-router-dom";
import Footer from "./footer";

const Cart = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const result = await prDisplayCart();
    setProduct(result.data);
  };

  const handleDelete = async (id) => {
    await deleteProductCart(id);
    getProduct();
  };

  const subtotal = product.reduce((sum, item) => {
    const price = parseFloat(item.prPrice) || 0;
    return sum + price;
  }, 0);

  return (
    <div style={{ background: '#0A0A0F', minHeight: '100vh', paddingTop: 72 }}>
      <CollapsibleExample />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 40px 100px' }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.65rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#C9A96E',
            marginBottom: 10,
          }}>
            Your Selection
          </p>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 400,
            color: '#F5F0E8',
            letterSpacing: '0.04em',
          }}>
            Shopping Bag
          </h1>
          <div style={{ width: 48, height: 1, background: '#2A2A35', marginTop: 16 }} />
        </div>

        {product.length === 0 ? (
          /* Empty state */
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '5rem',
              color: '#2A2A35',
              marginBottom: 20,
              lineHeight: 1,
            }}>∞</div>
            <p style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.6rem',
              color: '#8A8A95',
              marginBottom: 8,
            }}>Your bag is empty</p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.8rem',
              color: '#8A8A95',
              marginBottom: 36,
              letterSpacing: '0.05em',
            }}>Explore our collections and find your next piece</p>
            <Link to="/men" className="infinity-btn">Browse Collections</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 48, alignItems: 'start' }}>
            {/* Line items */}
            <div>
              {product.map((item, i) => (
                <div key={item._id} style={{
                  display: 'flex',
                  gap: 24,
                  padding: '24px 0',
                  borderBottom: '1px solid #2A2A35',
                }}>
                  {/* Thumbnail */}
                  <div style={{ width: 90, height: 110, flexShrink: 0, overflow: 'hidden' }}>
                    <img
                      src={item.prImage}
                      alt={item.prName}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: '1.2rem',
                        color: '#F5F0E8',
                        marginBottom: 4,
                      }}>{item.prName || 'Infinity Piece'}</div>
                      <div style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.75rem',
                        color: '#8A8A95',
                        marginBottom: 8,
                      }}>{item.prDescription}</div>
                    </div>
                    <div style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.85rem',
                      color: '#C9A96E',
                    }}>
                      {item.prPrice ? `PKR ${item.prPrice}` : '—'}
                    </div>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(item._id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#8A8A95',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      padding: 4,
                      alignSelf: 'flex-start',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#C9A96E'}
                    onMouseLeave={e => e.currentTarget.style.color = '#8A8A95'}
                    aria-label="Remove item"
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
              ))}
            </div>

            {/* Summary panel */}
            <div style={{
              background: '#13131A',
              border: '1px solid #2A2A35',
              borderLeft: '3px solid #C9A96E',
              padding: '32px 28px',
              position: 'sticky',
              top: 100,
            }}>
              <h2 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.4rem',
                fontWeight: 400,
                color: '#F5F0E8',
                marginBottom: 24,
              }}>Order Summary</h2>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.8rem',
                color: '#8A8A95',
                marginBottom: 12,
              }}>
                <span>{product.length} item{product.length > 1 ? 's' : ''}</span>
                <span style={{ color: '#F5F0E8' }}>PKR {subtotal.toLocaleString()}</span>
              </div>

              <div style={{ height: 1, background: '#2A2A35', margin: '20px 0' }} />

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.2rem',
                color: '#F5F0E8',
                marginBottom: 28,
              }}>
                <span>Total</span>
                <span style={{ color: '#C9A96E' }}>PKR {subtotal.toLocaleString()}</span>
              </div>

              <button className="infinity-btn-filled" style={{ width: '100%' }}>
                Proceed to Checkout
              </button>

              <Link to="/men" style={{
                display: 'block',
                textAlign: 'center',
                marginTop: 16,
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '0.14em',
                color: '#8A8A95',
                textDecoration: 'none',
              }}>
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
