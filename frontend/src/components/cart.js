import CollapsibleExample from "./navbar";
import { useEffect, useState } from "react";
import { deleteProductCart, prDisplayCart, createOrder } from "../Service/api";
import { Link } from "react-router-dom";
import Footer from "./footer";

const Cart = () => {
  const [product, setProduct] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [orderDone, setOrderDone] = useState(null);
  const isLoggedIn = !!localStorage.getItem('ir_token');

  // Decode email from JWT
  const getEmailFromToken = () => {
    try {
      const token = localStorage.getItem('ir_token');
      if (!token) return '';
      return JSON.parse(atob(token.split('.')[1])).email || '';
    } catch { return ''; }
  };

  const [email, setEmail] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      getProduct();
      setEmail(getEmailFromToken());
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getProduct = async () => {
    try {
      const result = await prDisplayCart();
      setProduct(result.data);
    } catch (e) {}
  };

  const handleDelete = async (id) => {
    await deleteProductCart(id);
    getProduct();
  };

  const subtotal = product.reduce((sum, item) => sum + (parseFloat(item.prPrice) || 0), 0);

  const handlePlaceOrder = async () => {
    if (!email) return;
    setPlacing(true);
    try {
      const res = await createOrder({
        userName: localStorage.getItem('ir_user') || 'Guest',
        userEmail: email,
        items: product,
        total: subtotal.toLocaleString(),
      });
      setOrderDone(res.data.orderId);
      setProduct([]);
      setShowCheckout(false);
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || 'Unknown error';
      console.error('Order failed:', msg, e);
      alert('Order failed: ' + msg);
    }
    setPlacing(false);
  };

  // Guest view
  if (!isLoggedIn) {
    return (
      <div style={{ background: '#0A0A0F', minHeight: '100vh', paddingTop: 72 }}>
        <CollapsibleExample />
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '120px 40px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '5rem', color: '#2A2A35', marginBottom: 24, lineHeight: 1 }}>∞</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 400, color: '#F5F0E8', marginBottom: 12 }}>Your Bag Awaits</h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: '#8A8A95', marginBottom: 40, lineHeight: 1.8 }}>
            Sign in to view your shopping bag and place orders.<br />You can continue browsing without an account.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/login" className="infinity-btn-filled">Sign In</Link>
            <Link to="/signup" className="infinity-btn">Create Account</Link>
          </div>
          <Link to="/" style={{ display: 'block', marginTop: 32, fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', letterSpacing: '0.14em', color: '#8A8A95', textDecoration: 'none' }}>
            Continue Browsing
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Order success state
  if (orderDone) {
    return (
      <div style={{ background: '#0A0A0F', minHeight: '100vh', paddingTop: 72 }}>
        <CollapsibleExample />
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '120px 40px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '5rem', color: '#C9A96E', marginBottom: 24, lineHeight: 1 }}>∞</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', fontWeight: 400, color: '#F5F0E8', marginBottom: 12 }}>Order Confirmed</h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#8A8A95', marginBottom: 8, letterSpacing: '0.04em' }}>
            A confirmation has been sent to <span style={{ color: '#C9A96E' }}>{email}</span>
          </p>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: '#8A8A95', marginBottom: 40 }}>
            Reference: <span style={{ color: '#C9A96E', letterSpacing: '0.1em' }}>{orderDone}</span>
          </p>
          <Link to="/" className="infinity-btn">Continue Shopping</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ background: '#0A0A0F', minHeight: '100vh', paddingTop: 72 }}>
      <CollapsibleExample />

      {/* Checkout Modal */}
      {showCheckout && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(10,10,15,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ background: '#13131A', border: '1px solid #2A2A35', borderTop: '3px solid #C9A96E', width: '100%', maxWidth: 480, padding: '40px 36px' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 8 }}>Checkout</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 400, color: '#F5F0E8', marginBottom: 28 }}>Confirm Your Order</h2>

            {/* Items summary */}
            <div style={{ marginBottom: 24 }}>
              {product.map(item => (
                <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1C1C26' }}>
                  <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', color: '#F5F0E8' }}>{item.prName}</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: '#C9A96E' }}>PKR {item.prPrice}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', marginTop: 4 }}>
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: '#F5F0E8' }}>Total</span>
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: '#C9A96E' }}>PKR {subtotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8A8A95', marginBottom: 8 }}>
                Confirmation Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #2A2A35', color: '#F5F0E8', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', padding: '8px 0', outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderBottomColor = '#C9A96E'}
                onBlur={e => e.target.style.borderBottomColor = '#2A2A35'}
              />
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button className="infinity-btn-filled" onClick={handlePlaceOrder} disabled={placing || !email} style={{ flex: 1 }}>
                {placing ? 'Placing Order...' : 'Place Order'}
              </button>
              <button className="infinity-btn" onClick={() => setShowCheckout(false)} style={{ flex: 1 }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 40px 100px' }}>
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 10 }}>Your Selection</p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: '#F5F0E8', letterSpacing: '0.04em' }}>Shopping Bag</h1>
          <div style={{ width: 48, height: 1, background: '#2A2A35', marginTop: 16 }} />
        </div>

        {product.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '5rem', color: '#2A2A35', marginBottom: 20, lineHeight: 1 }}>∞</div>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', color: '#8A8A95', marginBottom: 8 }}>Your bag is empty</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: '#8A8A95', marginBottom: 36 }}>Explore our collections and find your next piece</p>
            <Link to="/men" className="infinity-btn">Browse Collections</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 48, alignItems: 'start' }}>
            <div>
              {product.map((item) => (
                <div key={item._id} style={{ display: 'flex', gap: 24, padding: '24px 0', borderBottom: '1px solid #2A2A35' }}>
                  <div style={{ width: 90, height: 110, flexShrink: 0, overflow: 'hidden' }}>
                    <img src={item.prImage} alt={item.prName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: '#F5F0E8', marginBottom: 4 }}>{item.prName || 'Infinity Piece'}</div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#8A8A95', marginBottom: 8 }}>{item.prDescription}</div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#C9A96E' }}>{item.prPrice ? `PKR ${item.prPrice}` : '—'}</div>
                  </div>
                  <button onClick={() => handleDelete(item._id)}
                    style={{ background: 'none', border: 'none', color: '#8A8A95', cursor: 'pointer', fontSize: '1rem', alignSelf: 'flex-start', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#C9A96E'}
                    onMouseLeave={e => e.currentTarget.style.color = '#8A8A95'}>
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
              ))}
            </div>

            <div style={{ background: '#13131A', border: '1px solid #2A2A35', borderLeft: '3px solid #C9A96E', padding: '32px 28px', position: 'sticky', top: 100 }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 400, color: '#F5F0E8', marginBottom: 24 }}>Order Summary</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: '#8A8A95', marginBottom: 12 }}>
                <span>{product.length} item{product.length > 1 ? 's' : ''}</span>
                <span style={{ color: '#F5F0E8' }}>PKR {subtotal.toLocaleString()}</span>
              </div>
              <div style={{ height: 1, background: '#2A2A35', margin: '20px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: '#F5F0E8', marginBottom: 28 }}>
                <span>Total</span>
                <span style={{ color: '#C9A96E' }}>PKR {subtotal.toLocaleString()}</span>
              </div>
              <button className="infinity-btn-filled" style={{ width: '100%' }} onClick={() => setShowCheckout(true)}>
                Proceed to Checkout
              </button>
              <Link to="/men" style={{ display: 'block', textAlign: 'center', marginTop: 16, fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', letterSpacing: '0.14em', color: '#8A8A95', textDecoration: 'none' }}>
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
