import vodd from '../videos/vodd.mp4';
import '../styles/login.css';
import { createContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GLogin from './glogin';
import { userLogin } from '../Service/api';

export const Appcontext = createContext(null);

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [userData, setUserData] = useState({ userName: '', password: '' });
  const { userName, password } = userData;

  const handleChange = (e) => setUserData({ ...userData, [e.target.name]: e.target.value });

  const userCheck = async () => {
    setError('');
    try {
      const res = await userLogin(userData);
      if (res.data.status === 'ok hai') {
        const token = res.data.user;
        const payload = JSON.parse(atob(token.split('.')[1]));
        localStorage.setItem('ir_token', token);
        localStorage.setItem('ir_user', userData.userName);
        localStorage.setItem('ir_role', payload.role || 'user');
        navigate('/main');
      } else {
        setError('Invalid username or password.');
      }
    } catch (e) {
      setError('Could not connect to server. Is the backend running?');
    }
  };

  const handleKey = (e) => { if (e.key === 'Enter') userCheck(); };

  return (
    <div className="ir-auth-wrap">
      <video src={vodd} autoPlay muted loop playsInline className="ir-auth-video" />
      <div className="ir-auth-overlay" />

      <div className="ir-auth-card">
        <div className="ir-auth-logo">
          <span className="ir-auth-logo-symbol">∞</span>
          <span className="ir-auth-logo-name">Infinity Realm</span>
        </div>
        <h1 className="ir-auth-title">Welcome Back</h1>
        <p className="ir-auth-subtitle">Sign in to your account</p>

        {error && (
          <div style={{ background: 'rgba(176,82,82,0.10)', border: '1px solid #B05252', color: '#B05252', padding: '10px 14px', fontSize: '0.75rem', marginBottom: 20, fontFamily: 'Inter, sans-serif', letterSpacing: '0.04em' }}>
            {error}
          </div>
        )}

        <div className="ir-field">
          <label htmlFor="userName">Username</label>
          <input id="userName" name="userName" type="text" value={userName} onChange={handleChange} onKeyDown={handleKey} placeholder="Enter your username" />
        </div>
        <div className="ir-field">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value={password} onChange={handleChange} onKeyDown={handleKey} placeholder="Enter your password" />
        </div>

        <div className="ir-auth-cta">
          <button className="infinity-btn-filled" style={{ width: '100%' }} onClick={userCheck}>Sign In</button>
        </div>
        <div className="ir-auth-divider"><span>or continue with</span></div>
        <div className="ir-auth-google"><GLogin /></div>
        <p className="ir-auth-switch">New to Infinity Realm? <Link to="/signup">Create an account</Link></p>
      </div>
    </div>
  );
};

export default Login;
