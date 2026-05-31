import { Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Mainpage from "./components/main";
import Women from "./components/womensection";
import Men from './components/mensection';
import Viewproduct from "./components/viewproduct";
import Signup from "./components/signup";
import Admin from "./components/admin";
import Prodcuts from "./components/products";
import EditProducts from "./components/editproducts";
import Userp from "./components/userProfile";
import Cart from "./components/cart";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/main" element={<Mainpage />} />
      <Route path="/men" element={<Men />} />
      <Route path="/women" element={<Women />} />
      <Route path="/viewproduct/:id" element={<Viewproduct />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/userpfp/:name" element={<Userp />} />
      <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
      <Route path="/products" element={<ProtectedRoute><Prodcuts /></ProtectedRoute>} />
      <Route path="/editproduct/:id" element={<ProtectedRoute><EditProducts /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
