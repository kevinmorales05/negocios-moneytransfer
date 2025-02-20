import React, { useContext, useState } from "react";

import { Link } from "react-router-dom";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "@/context/AuthContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, logged } = useContext(AuthContext);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="main-header">
      <div className="logo">Kuhnipay Negocios</div>
      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        {logged ? (
          <>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="nav-item"
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-item">
              Iniciar Sesión
            </Link>
            <Link to="/signup" className="nav-item">
              Crear Cuenta
            </Link>
          </>
        )}
      </nav>
      <div className="menu-icon" onClick={toggleMenu}>
        ☰
      </div>
    </header>
  );
}
