import '../styles/admin.css';
import { getOrders, updateOrderStatus } from '../Service/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const statusColors = {
  confirmed:  '#C9A96E',
  processing: '#7E9FBF',
  shipped:    '#7EBF9A',
  delivered:  '#6EA87E',
  cancelled:  '#B05252',
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      const res = await getOrders();
      setOrders(res.data);
    } catch (e) {}
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      setOrders(prev => prev.map(o => o._id === id ? { ...o, status } : o));
    } catch (e) {}
  };

  return (
    <div className="stbg">
      <input type="checkbox" id="check" />
      <label htmlFor="check">
        <i className="bi bi-list" id="btn"></i>
        <i className="bi bi-x-lg" id="cancel"></i>
      </label>
      <div className="sidebar">
        <header>Admin</header>
        <ul>
          <li><Link to="/admin">Users</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/orders">Orders</Link></li>
          <li><Link to="/">← Back to Site</Link></li>
        </ul>
      </div>

      <section>
        <div className="ir-admin-header">
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 8 }}>Admin Panel</p>
          <h2>Orders</h2>
          <div style={{ width: 40, height: 1, background: '#C9A96E', marginTop: 12 }} />
        </div>

        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '4rem', color: '#1C1C26', marginBottom: 16 }}>∞</div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#8A8A95' }}>No orders yet.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="ir-admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <>
                    <tr key={order._id}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setExpanded(expanded === order._id ? null : order._id)}>
                      <td style={{ color: '#C9A96E', fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.08em' }}>{order.orderId}</td>
                      <td style={{ color: '#F5F0E8' }}>{order.userName}</td>
                      <td>{order.userEmail}</td>
                      <td>
                        <span style={{ background: '#1C1C26', padding: '3px 10px', fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: '#8A8A95' }}>
                          {order.items?.length || 0} item{order.items?.length !== 1 ? 's' : ''}
                        </span>
                      </td>
                      <td style={{ color: '#C9A96E', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem' }}>PKR {order.total}</td>
                      <td style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: '#8A8A95' }}>
                        {new Date(order.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td onClick={e => e.stopPropagation()}>
                        <select
                          value={order.status}
                          onChange={e => handleStatusChange(order._id, e.target.value)}
                          style={{
                            background: '#0A0A0F',
                            border: `1px solid ${statusColors[order.status] || '#2A2A35'}`,
                            color: statusColors[order.status] || '#F5F0E8',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '0.65rem',
                            letterSpacing: '0.1em',
                            padding: '5px 10px',
                            cursor: 'pointer',
                            outline: 'none',
                            textTransform: 'capitalize',
                          }}>
                          <option value="confirmed">Confirmed</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                    {/* Expanded row — items detail */}
                    {expanded === order._id && (
                      <tr key={order._id + '-detail'}>
                        <td colSpan="7" style={{ padding: '0 0 0 24px', background: '#0D0D13' }}>
                          <div style={{ padding: '16px 0 20px' }}>
                            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 12 }}>Items in this order</p>
                            {order.items?.map((item, i) => (
                              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
                                {item.prImage && <img src={item.prImage} alt={item.prName} style={{ width: 44, height: 54, objectFit: 'cover', border: '1px solid #2A2A35' }} />}
                                <div>
                                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', color: '#F5F0E8' }}>{item.prName}</div>
                                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: '#C9A96E' }}>PKR {item.prPrice}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default Orders;
