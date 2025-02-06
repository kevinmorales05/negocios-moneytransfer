import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import MainPage from "../pages/MainPage";

const PrivateRoute = ({ element }) => {
  const { user } = useContext(AuthContext);
  return user ? element : <Navigate to="/login" />;
};

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
