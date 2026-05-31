import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const GLogin = () => {
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    try {
      // Decode the JWT payload to get user info
      const payload = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
      localStorage.setItem('ir_token', credentialResponse.credential);
      localStorage.setItem('ir_user', payload.name || payload.email);
      localStorage.setItem('ir_role', 'user');
      navigate('/');
    } catch (e) {
      console.error('Google login error:', e);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log('Google login failed')}
        theme="filled_black"
        shape="rectangular"
        size="large"
      />
    </div>
  );
};

export default GLogin;
