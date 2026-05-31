import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usergetPfp } from '../Service/api';
import CollapsibleExample from './navbar';
import Footer from './footer';

const Userp = () => {
  const { name } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await usergetPfp(name);
        setUser(result.data);
      } catch (e) {}
    };
    fetchUser();
  }, [name]);

  return (
    <div style={{ background: '#0A0A0F', minHeight: '100vh', paddingTop: 72 }}>
      <CollapsibleExample />
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '80px 40px' }}>
        {user ? (
          <div style={{ background: '#13131A', border: '1px solid #2A2A35', borderLeft: '3px solid #C9A96E', padding: '40px 36px' }}>
            {user.userImage && (
              <img src={user.userImage} alt={user.userName}
                style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', marginBottom: 24, border: '2px solid #2A2A35' }} />
            )}
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 400, color: '#F5F0E8', marginBottom: 8 }}>{user.userName}</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: '#8A8A95', marginBottom: 4 }}>{user.email}</p>
            {user.contact && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: '#8A8A95' }}>{user.contact}</p>}
          </div>
        ) : (
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#8A8A95' }}>Loading profile...</p>
        )}
        <Link to="/" style={{ display: 'inline-block', marginTop: 28, fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', letterSpacing: '0.14em', color: '#8A8A95' }}>
          ← Back to Home
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Userp;
