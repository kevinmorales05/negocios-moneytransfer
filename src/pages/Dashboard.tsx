// src/pages/Dashboard.tsx
import { useState } from "react";
import Header from "@/components/components/header/Header";
import "../styles/Dashboard.css";
import FinanceSummary from "@/components/components/financeSummary/financeSummary";
import SendMoney from "@/components/components/sendMoney/SendMonet";
import UserProfile from "@/components/components/userProfile/UserProfile";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //mock finance summary
  const transactions = [
    { description: "Depósito", amount: 500 },
    { description: "Compra en Supermercado", amount: -120 },
    { description: "Pago de Servicio", amount: -60 },
    { description: "Venta de Producto", amount: 300 },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return (
          <div>
            🏠 Bienvenido a Home
            <FinanceSummary
              companyName="Tech Finance LLC"
              balance={1620}
              transactions={transactions}
            />
          </div>
        );
      case "send-money":
        return (
          <div>
            💸 Sección para Enviar Dinero
            <SendMoney />
          </div>
        );
      case "profile":
        return (
          <div>
            🙍‍♂️ Mi Perfil
            <UserProfile />
          </div>
        );
      case "pay-bills":
        return <div>🧾 Pago de Servicios</div>;
      case "statements":
        return <div>🧾 Estados de Cuenta</div>;
      default:
        return <div>Seleccione una opción</div>;
    }
  };

  return (
    <div>
      <Header />
      <div className="dashboard">
        {/* Botón para abrir/cerrar el menú en móviles */}
        <button
          className="menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>

        {/* Menú lateral */}
        <div className={`sidebar ${isMenuOpen ? "open" : ""}`}>
          <button
            className={activeSection === "home" ? "active" : ""}
            onClick={() => {
              setActiveSection("home");
              setIsMenuOpen(false);
            }}
          >
            🏠 Home
          </button>
          <button
            className={activeSection === "send-money" ? "active" : ""}
            onClick={() => {
              setActiveSection("send-money");
              setIsMenuOpen(false);
            }}
          >
            💸 Enviar Dinero
          </button>
          <button
            className={activeSection === "profile" ? "active" : ""}
            onClick={() => {
              setActiveSection("profile");
              setIsMenuOpen(false);
            }}
          >
            🙍‍♂️ Mi Perfil
          </button>
          <button
            className={activeSection === "pay-bills" ? "active" : ""}
            onClick={() => {
              setActiveSection("pay-bills");
              setIsMenuOpen(false);
            }}
          >
            🧾 Pago de Servicios
          </button>
          <button
            className={activeSection === "statements" ? "active" : ""}
            onClick={() => {
              setActiveSection("statements");
              setIsMenuOpen(false);
            }}
          >
            🧾 Estados de cuenta
          </button>
        </div>

        {/* Contenido dinámico */}
        <div className="content">{renderSection()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
