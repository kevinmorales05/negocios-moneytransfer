import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import MainPage from "../pages/MainPage";

// Componente para proteger rutas
const PrivateRoute = ({ element }) => {
  const { user, logged } = useContext(AuthContext);
  return logged ? element : <Navigate to="/login" />;
};

// Componente principal de rutas
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route
      path="/dashboard"
      element={<PrivateRoute element={<Dashboard />} />}
    />
  </Routes>
);

export default AppRoutes;
