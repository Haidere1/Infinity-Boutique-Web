import '../styles/admin.css';
import { productAddition, prDisplay, deleteProduct } from '../Service/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FileBase64 from 'react-file-base64';

const Prodcuts = () => {
  const [productData, setProductData] = useState({
    prID: '',
    prName: '',
    prPrice: '',
    prDescription: '',
    prImage: '',
    category: 'unisex'
  });
  const { prID, prName, prPrice, prDescription, prImage, category } = productData;

  const [productList, setProductList] = useState([]);
  const [adding, setAdding] = useState(false);

  useEffect(() => { getProductList(); }, []);

  const getProductList = async () => {
    try {
      const result = await prDisplay();
      setProductList(result.data);
    } catch (e) {}
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  const prAddition = async (e) => {
    e.preventDefault();
    if (!prName || !prPrice) return;
    setAdding(true);
    try {
      await productAddition(productData);
      setProductData({ prID: '', prName: '', prPrice: '', prDescription: '', prImage: '', category: 'unisex' });
      await getProductList();
    } catch (err) {}
    setAdding(false);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    getProductList();
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
          <h2>Product Management</h2>
          <div style={{ width: 40, height: 1, background: '#C9A96E', marginTop: 12 }} />
        </div>

        {/* ── Add Product Form ── */}
        <div className="ir-admin-form" style={{ marginBottom: 56 }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 400, color: '#F5F0E8', marginBottom: 28, letterSpacing: '0.04em' }}>Add New Product</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div className="ir-field">
              <label htmlFor="prID">Product ID</label>
              <input id="prID" name="prID" type="text" value={prID} onChange={handleChange} placeholder="e.g. 001" />
            </div>
            <div className="ir-field">
              <label htmlFor="prName">Product Name</label>
              <input id="prName" name="prName" type="text" value={prName} onChange={handleChange} placeholder="e.g. Classic Fit Shirt" />
            </div>
            <div className="ir-field">
              <label htmlFor="prPrice">Price (PKR)</label>
              <input id="prPrice" name="prPrice" type="text" value={prPrice} onChange={handleChange} placeholder="e.g. 3200" />
            </div>
            <div className="ir-field">
              <label htmlFor="prDescription">Description</label>
              <input id="prDescription" name="prDescription" type="text" value={prDescription} onChange={handleChange} placeholder="Brief product description" />
            </div>
            <div className="ir-field">
              <label htmlFor="category">Category</label>
              <select id="category" name="category" value={category} onChange={handleChange} style={{ background: 'transparent', border: 'none', borderBottom: '1px solid #2A2A35', color: '#F5F0E8', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', padding: '8px 0', outline: 'none', width: '100%', cursor: 'pointer' }}>
                <option value="men" style={{ background: '#13131A' }}>Men</option>
                <option value="women" style={{ background: '#13131A' }}>Women</option>
                <option value="unisex" style={{ background: '#13131A' }}>Unisex (shows in both)</option>
              </select>
            </div>
            <div className="ir-field" style={{ gridColumn: '1 / -1' }}>
              <label>Product Image</label>
              <div style={{ padding: '12px 0', borderBottom: '1px solid #2A2A35', display: 'flex', alignItems: 'center', gap: 16 }}>
                <i className="bi bi-image" style={{ color: '#C9A96E', fontSize: '1.1rem' }}></i>
                <FileBase64 multiple={false} onDone={({ base64 }) => setProductData(prev => ({ ...prev, prImage: base64 }))} />
                {prImage && <img src={prImage} alt="preview" style={{ width: 56, height: 70, objectFit: 'cover', border: '1px solid #2A2A35' }} />}
              </div>
            </div>
          </div>

          <button
            className="infinity-btn-filled"
            onClick={prAddition}
            disabled={adding}
            style={{ marginTop: 32 }}
          >
            {adding ? 'Adding...' : 'Add Product'}
          </button>
        </div>

        {/* ── Product List ── */}
        <div>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 400, color: '#F5F0E8', marginBottom: 24, letterSpacing: '0.04em' }}>
            Inventory
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', color: '#8A8A95', marginLeft: 12 }}>{productList.length} items</span>
          </h3>

          {productList.length === 0 ? (
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#8A8A95' }}>No products added yet.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="ir-admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {productList.map((item) => (
                    <tr key={item._id}>
                      <td>{item.prID}</td>
                      <td style={{ color: '#F5F0E8' }}>{item.prName}</td>
                      <td style={{ textTransform: 'capitalize' }}>{item.category || 'unisex'}</td>
                      <td>{item.prPrice ? `PKR ${item.prPrice}` : '—'}</td>
                      <td style={{ maxWidth: 220 }}>{item.prDescription}</td>
                      <td>{item.prImage && <img className="primage" src={item.prImage} alt={item.prName} />}</td>
                      <td style={{ whiteSpace: 'nowrap' }}>
                        <Link to={`/editproduct/${item._id}`}>
                          <button className="ir-btn-edit">
                            <i className="bi bi-pencil" style={{ marginRight: 6 }}></i>Edit
                          </button>
                        </Link>
                        <button className="ir-btn-delete" onClick={() => handleDelete(item._id)}>
                          <i className="bi bi-trash3" style={{ marginRight: 6 }}></i>Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Prodcuts;
