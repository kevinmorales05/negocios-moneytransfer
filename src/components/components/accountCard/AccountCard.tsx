import React, { useState } from "react";
import "./AccountCard.css";

export interface AccountCardProps {
  accountNumber: string;
}

const AccountCard: React.FC<AccountCardProps> = ({ accountNumber }) => {
  const [showFull, setShowFull] = useState(false);

  const maskedAccount = `XXXX-${accountNumber.slice(-4)}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accountNumber);
    alert("Número de cuenta copiado.");
  };

  const shareAccount = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Número de Cuenta",
          text: `Mi número de cuenta: ${accountNumber}`,
        })
        .catch((error) => console.error("Error al compartir:", error));
    } else {
      alert("Tu navegador no soporta compartir.");
    }
  };

  return (
    <div className="account-card">
      <div className="card-content">
        <p className="account-label">Número de Cuenta</p>
        <p className="account-number">{showFull ? accountNumber : maskedAccount}</p>
        <div className="button-group">
          <button onClick={() => setShowFull(!showFull)}>
            {showFull ? "Ocultar" : "Mostrar"}
          </button>
          <button onClick={copyToClipboard}>Copiar</button>
          <button onClick={shareAccount}>Compartir</button>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
