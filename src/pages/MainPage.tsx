import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MainPage.css'; // Asegúrate de agregar este archivo de estilos.

const MainPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="main-container">
      <header className="main-header">
        <div className="logo">Kuhnipay Negocios</div>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/login" className="nav-item">Iniciar Sesión</Link>
          <Link to="/signup" className="nav-item">Crear Cuenta</Link>
        </nav>
        <div className="menu-icon" onClick={toggleMenu}>
          ☰
        </div>
      </header>
      <section className="hero">
        <h1>Bienvenido a Kuhnipay Negocios</h1>
        <p>Transformamos tus sueños financieros en realidad.</p>
      </section>
    </div>
  );
};

export default MainPage;
