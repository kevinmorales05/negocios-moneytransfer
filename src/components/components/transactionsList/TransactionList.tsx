import React from "react";
import "./TransactionList.css"; // Importamos los estilos
import { TransactionListProps } from "./types";

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <div className="transaction-container">
      <h2>📄 Historial de Transacciones</h2>
      <div className="transaction-list">
        {transactions && transactions.length > 0 ? (
          transactions.map((tx) => {
            const isNegative = parseFloat(tx.amount.amount) < 0;
            return (
              <div key={tx.transactionId} className="transaction-card">
                <div className="transaction-header">
                  <span className="transaction-id">ID: {tx.transactionId}</span>
                  <span className={`transaction-status ${tx.status.toLowerCase()}`}>
                    {tx.status}
                  </span>
                </div>

                <div className="transaction-body">
                  <div className="transaction-info">
                    <span className="transaction-label">Fecha:</span>
                    <span>{new Date(tx.bookingDateTime).toLocaleString()}</span>
                  </div>

                  <div className="transaction-info">
                    <span className="transaction-label">Cuenta:</span>
                    <span>{tx.accountNumber}</span>
                  </div>

                  <div className="transaction-info">
                    <span className="transaction-label">Monto:</span>
                    <span className={`transaction-amount ${isNegative ? "negative" : "positive"}`}>
                      {isNegative ? "" : "+"}{tx.amount.amount} {tx.amount.currency}
                    </span>
                  </div>

                  <div className="transaction-info">
                    <span className="transaction-label">Referencia:</span>
                    <span>{tx.transactionReference}</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-transactions">❌ No hay transacciones disponibles</p>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
