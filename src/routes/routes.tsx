import { ReactElement } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import MainPage from "../pages/MainPage";
import SuccessPage from "@/pages/Success";
import { useAuth } from "@/context/authSafeHook";

interface PrivateRouteProps {
  element: ReactElement;
}
// Componente para proteger rutas
const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { logged } = useAuth();
  return logged ? element : <Navigate to="/login" />;
};

// Componente principal de rutas
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/success" element={<SuccessPage />} />

    <Route
      path="/dashboard"
      element={<PrivateRoute element={<Dashboard />} />}
    />
  </Routes>
);

export default AppRoutes;
