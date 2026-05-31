import vodd from '../videos/background.mp4';
import '../styles/login.css';
import { createContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { userAdd } from '../Service/api';
import FileBase64 from 'react-file-base64';

export const Appcontext = createContext(null);

const Signup = () => {
  const [userData, setUserData] = useState({
    email: "",
    userName: "",
    password: "",
    userImage: "",
    contact: "",
  });

  const { email, userName, password, contact } = userData;

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const userAddition = async (e) => {
    e.preventDefault();
    await userAdd(userData);
    window.alert("Welcome to Infinity Realm!");
  };

  return (
    <div className="ir-auth-wrap">
      <video src={vodd} autoPlay muted loop playsInline className="ir-auth-video" />
      <div className="ir-auth-overlay" />

      <form className="ir-auth-card" onSubmit={userAddition}>
        <div className="ir-auth-logo">
          <span className="ir-auth-logo-symbol">∞</span>
          <span className="ir-auth-logo-name">Infinity Realm</span>
        </div>

        <h1 className="ir-auth-title">Join Us</h1>
        <p className="ir-auth-subtitle">Create your account</p>

        <div className="ir-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
        </div>

        <div className="ir-field">
          <label htmlFor="userName">Username</label>
          <input
            id="userName"
            name="userName"
            type="text"
            value={userName}
            onChange={handleChange}
            placeholder="Choose a username"
          />
        </div>

        <div className="ir-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            placeholder="Create a password"
          />
        </div>

        <div className="ir-field">
          <label htmlFor="contact">Contact Number</label>
          <input
            id="contact"
            name="contact"
            type="text"
            value={contact || ''}
            onChange={handleChange}
            placeholder="+92 000 0000000"
          />
        </div>

        <div className="ir-field">
          <label>Profile Image</label>
          <div className="ir-field-file">
            <i className="bi bi-image" style={{ color: '#C9A96E' }}></i>
            <FileBase64
              multiple={false}
              onDone={({ base64 }) => setUserData({ ...userData, userImage: base64 })}
            />
          </div>
        </div>

        <div className="ir-auth-cta">
          <button type="submit" className="infinity-btn-filled" style={{ width: '100%' }}>
            Create Account
          </button>
        </div>

        <p className="ir-auth-switch">
          Already have an account?{' '}
          <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
