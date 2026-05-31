import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('ir_token');
  const role = localStorage.getItem('ir_role');
  if (!token || role !== 'admin') return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
