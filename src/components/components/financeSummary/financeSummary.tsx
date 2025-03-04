import AccountCard from "../accountCard/accountCard";
import TransactionList from "../transactionsList/TransactionList";
import "./financeSummary.css";
import { FinanceSummaryProps } from "./types";

const FinanceSummary: React.FC<FinanceSummaryProps> = ({
  companyName,
  accountBalance,
  transactionsCore,
  account,
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
      {accountBalance === null || accountBalance === undefined ? (
        <></>
      ) : (
        <>
          <div className="balance-section">
            Balance Actual: ${accountBalance[0].amount.amount}
          </div>
        </>
      )}
      {account === null || account === undefined ? (
        <></>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <AccountCard accountNumber={account[0].account.identification} />
          </div>
        </>
      )}

      {/* Sección de transacciones */}

      {/* Sección de transacciones con el core */}
      <TransactionList transactions={transactionsCore} />
    </div>
  );
};

export default FinanceSummary;
