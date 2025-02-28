import "./financeSummary.css";
import { FinanceSummaryProps } from "./types";

const FinanceSummary: React.FC<FinanceSummaryProps> = ({
  companyName,
  balance,
  transactions,
}) => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="finance-container">
      {/* Header con el nombre de la empresa y la fecha actual */}
      <div className="header-section">
        <span className="company-name">{companyName}</span>
        <span className="current-date">{currentDate}</span>
      </div>

      {/* Sección del balance actual */}
      <div className="balance-section">
        Balance Actual: ${balance.toFixed(2)}
      </div>

      {/* Sección de transacciones */}
      <div className="transactions">
        <h3>Transacciones Recientes</h3>
        <ul className="transaction-list">
          {transactions.length > 0 ? (
            transactions.map((tx, index) => (
              <li key={index} className="transaction-item">
                <span>{tx.description}</span>
                <span
                  className={`transaction-amount ${
                    tx.amount >= 0 ? "positive" : "negative"
                  }`}
                >
                  {tx.amount >= 0 ? `+${tx.amount}` : `${tx.amount}`} USD
                </span>
              </li>
            ))
          ) : (
            <li>No hay transacciones recientes.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default FinanceSummary;
