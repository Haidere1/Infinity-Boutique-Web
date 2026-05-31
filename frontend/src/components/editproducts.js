import '../styles/admin.css';
import { editPr, prDisplay } from '../Service/api';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FileBase64 from 'react-file-base64';

const EditProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    prID: '',
    prName: '',
    prDescription: '',
    prPrice: '',
    prImage: ''
  });
  const { prID, prName, prDescription, prPrice, prImage } = product;
  const [saving, setSaving] = useState(false);

  useEffect(() => { getProduct(); }, []);

  const getProduct = async () => {
    try {
      const result = await prDisplay(id);
      setProduct(result.data);
    } catch (e) {}
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const editProduct = async () => {
    setSaving(true);
    try {
      await editPr(id, product);
      navigate('/products');
    } catch (e) {}
    setSaving(false);
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
          <h2>Edit Product</h2>
          <div style={{ width: 40, height: 1, background: '#C9A96E', marginTop: 12 }} />
        </div>

        <div className="ir-admin-form">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div className="ir-field">
              <label htmlFor="prID">Product ID</label>
              <input id="prID" name="prID" type="text" value={prID} onChange={handleChange} />
            </div>
            <div className="ir-field">
              <label htmlFor="prName">Product Name</label>
              <input id="prName" name="prName" type="text" value={prName} onChange={handleChange} />
            </div>
            <div className="ir-field">
              <label htmlFor="prPrice">Price (PKR)</label>
              <input id="prPrice" name="prPrice" type="text" value={prPrice} onChange={handleChange} />
            </div>
            <div className="ir-field">
              <label htmlFor="prDescription">Description</label>
              <input id="prDescription" name="prDescription" type="text" value={prDescription} onChange={handleChange} />
            </div>
            <div className="ir-field" style={{ gridColumn: '1 / -1' }}>
              <label>Product Image</label>
              <div style={{ padding: '12px 0', borderBottom: '1px solid #2A2A35', display: 'flex', alignItems: 'center', gap: 16 }}>
                <i className="bi bi-image" style={{ color: '#C9A96E', fontSize: '1.1rem' }}></i>
                <FileBase64 multiple={false} onDone={({ base64 }) => setProduct(prev => ({ ...prev, prImage: base64 }))} />
                {prImage && <img src={prImage} alt="current" style={{ width: 56, height: 70, objectFit: 'cover', border: '1px solid #2A2A35' }} />}
              </div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', color: '#8A8A95', marginTop: 8 }}>Upload a new image to replace the current one.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 16, marginTop: 32 }}>
            <button className="infinity-btn-filled" onClick={editProduct} disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <Link to="/products">
              <button className="infinity-btn">Cancel</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditProducts;
