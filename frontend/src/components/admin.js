import '../styles/admin.css';
import { deletedUser, userDisplay } from '../Service/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => { getUsersList(); }, []);

  const getUsersList = async () => {
    try {
      const result = await userDisplay();
      setUserList(result.data);
    } catch (e) {}
  };

  const handleDelete = async (id) => {
    await deletedUser(id);
    getUsersList();
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
          <li><Link to="/main">← Back to Site</Link></li>
        </ul>
      </div>

      <section>
        <div className="ir-admin-header">
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 8 }}>Admin Panel</p>
          <h2>User Management</h2>
          <div style={{ width: 40, height: 1, background: '#C9A96E', marginTop: 12 }} />
        </div>

        {userList.length === 0 ? (
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#8A8A95', padding: '40px 0' }}>No registered users yet.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="ir-admin-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Avatar</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {userList.map((user) => (
                  <tr key={user._id}>
                    <td style={{ color: '#F5F0E8' }}>{user.userName}</td>
                    <td>{user.email}</td>
                    <td>{user.contact || '—'}</td>
                    <td>
                      {user.userImage
                        ? <img className="primage" src={user.userImage} alt={user.userName} />
                        : <div style={{ width: 40, height: 40, background: '#1C1C26', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <i className="bi bi-person" style={{ color: '#8A8A95', fontSize: '1.1rem' }}></i>
                          </div>
                      }
                    </td>
                    <td>
                      <button className="ir-btn-delete" onClick={() => handleDelete(user._id)}>
                        <i className="bi bi-trash3" style={{ marginRight: 6 }}></i>Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default Admin;
