// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import Header from "@/components/components/header/Header";
import "../styles/Dashboard.css";
import FinanceSummary from "@/components/components/financeSummary/financeSummary";
import SendMoney from "@/components/components/sendMoney/SendMonet";
import UserProfile from "@/components/components/userProfile/UserProfile";
import {
  AccountBalance,
  AccountData,
  getAccounts,
  getBalances,
  getTransactionsCore,
  TransactionCore,
} from "@/services/kuhnipay/loggedservices";
import { useAuth } from "@/context/authSafeHook";

const Dashboard = () => {
  ///mocks
  //mock transactions
  const transactions2: TransactionCore[] = [
    {
      accountId: "1234",
      accountNumber: "100-2002-3263",
      child: false,
      parentAccountId: null,
      transactionId: "abcd1234",
      transactionReference: "0",
      status: "CONFIRMED",
      bookingDateTime: "2025-02-20T11:48:28.422Z",
      transactionInformation: "Abono capital",
      transactionType: "INTERNAL TRANSFER",
      trackingKey: "123456789",
      authorizationCode: "334516728941",
      amount: { amount: "1.6", currency: "MXN" },
      currencyExchange: {
        souceCurrency: "MXN",
        targetCurrency: "MXN",
        unitCurrency: "MXN",
        exchangeRate: "0",
        quotationDate: null,
        contractIdentification: null,
      },
      bankTransactionCode: { code: null, subcode: null },
      propietaryBankTransactionCode: { code: "PAYMENT", issuer: null },
      merchantDetail: { merchantName: null, merchantCategoryCode: null },
      creditorAccount: {
        identification: "100-2002-3265",
        name: null,
        secondaryIdentification: "646180402402306763",
        bankName: "Kuhni Pay",
        creditorName: "TENET CAPITAL SA de CV",
      },
      debtorAccount: {
        identification: "100-2002-3263",
        name: null,
        secondaryIdentification: "646180402402306747",
        bankName: "Kuhni Pay",
        debtorName: "Traxwire SA de CV",
      },
      cardInstrument: {
        authorizationType: null,
        name: null,
        identification: null,
        cardSchemeName: null,
      },
      transactionTypeInfo: null,
    },
    {
      accountId: "1234",
      accountNumber: "100-2002-3263",
      child: false,
      parentAccountId: null,
      transactionId: "dfbcd1234",
      transactionReference: "0",
      status: "CONFIRMED",
      bookingDateTime: "2025-02-20T11:48:28.422Z",
      transactionInformation: "Abono capital",
      transactionType: "INTERNAL TRANSFER",
      trackingKey: "123456789",
      authorizationCode: "334516728941",
      amount: { amount: "-13.6", currency: "MXN" },
      currencyExchange: {
        souceCurrency: "MXN",
        targetCurrency: "MXN",
        unitCurrency: "MXN",
        exchangeRate: "0",
        quotationDate: null,
        contractIdentification: null,
      },
      bankTransactionCode: { code: null, subcode: null },
      propietaryBankTransactionCode: { code: "PAYMENT", issuer: null },
      merchantDetail: { merchantName: null, merchantCategoryCode: null },
      creditorAccount: {
        identification: "100-2002-3265",
        name: null,
        secondaryIdentification: "646180402402306763",
        bankName: "Kuhni Pay",
        creditorName: "TENET CAPITAL SA de CV",
      },
      debtorAccount: {
        identification: "100-2002-3263",
        name: null,
        secondaryIdentification: "646180402402306747",
        bankName: "Kuhni Pay",
        debtorName: "Traxwire SA de CV",
      },
      cardInstrument: {
        authorizationType: null,
        name: null,
        identification: null,
        cardSchemeName: null,
      },
      transactionTypeInfo: null,
    },
  ];
  //mock balances
  const accountBalances: AccountBalance[] = [
    {
      accountId: "123456789",
      accountNumber: "9876543210",
      amount: {
        amount: "1500.75",
        currency: "USD",
      },
      dayIncomingAmount: "500.00",
      monthIncomingAmount: "7500.00",
      dayOutgoingAmount: "200.00",
      monthOutgoingAmount: "4500.00",
      type: "Checking",
      child: false,
      parentAccountId: null,
      dateTime: "2025-03-03T10:30:00Z",
      nominalGAT: "3.5",
      realGAT: "3.2",
      creditLine: "5000.00",
    },
  ];
  //mock accounts
  const accountMock: AccountData[] = [
    {
      accountId: "55c5f6a3-5798-4387-a0f7-1abeaeff223c",
      status: "ACTIVE",
      statusUpdateDateTime: "2025-01-30T12:22:17Z",
      currency: "MXN",
      accountType: "ACCOUNT",
      accountSubType: "ACCOUNT",
      nickname: "Cuenta Kunhipay",
      openingDate: "2025-01-30",
      closingDate: null,
      daysOld: 33,
      description: "ACCOUNT",
      account: {
        accountHolderId: "1bcc7ff7-84d5-4a9d-aa0b-f5ace57ced6b",
        identification: "646180402402306747",
        identificationState: "ACTIVE",
        identificationComment: "Cuenta validada.",
        name: "ACCOUNT",
        secondaryIdentification: "100-2002-3263",
        child: false,
        parentAccountId: null,
        paymentReference: "BW-000000301",
        schemeId: "1b44a8bd-8d04-4c7c-b2f0-f698d6376725",
        schemeName: "Kuhnipay Negocios",
        rate: "0.0",
        term: null,
        nominalGAT: 0.0,
        realGAT: -5.75,
      },
    },
  ];
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [transactions, setTransactions] = useState<TransactionCore[] | null>(
    transactions2
  );
  const [account, setAccount] = useState<AccountData[] | null>(accountMock);
  const [balance, setBalance] = useState<null | AccountBalance[]>(
    accountBalances
  );

  const { token } = useAuth();
  //mock finance summary

  useEffect(() => {
    const getAccount = async () => {
      console.log("inicia getaccounts");
      if (token) {
        const accounts = await getAccounts(token);
        console.log("data recibida de cuentas ", accounts.data);
        if (accounts.data) {
          setAccount(accounts.data.data);
        }
      }
    };
    const getTransactions = async () => {
      console.log("inicia gettransactions");
      if (token) {
        try {
          const gettransactions = await getTransactionsCore(token);
          console.log(
            "estas son las transacciones recibidas",
            gettransactions.data
          );
          if (gettransactions.data) {
            setTransactions(gettransactions.data.data);
          }
        } catch (error) {
          console.log("error consultando transacciones previas ", error);
        }
      }
    };
    const getBalance = async () => {
      console.log("inicia getbalance");
      if (token) {
        try {
          const balances = await getBalances(token);
          console.log("balances recibidos ", balances.data);
          if (balances.data) {
            setBalance(balances.data.data);
          }
        } catch (error) {
          console.log("error consulting balances ", error);
        }
      }
    };
    getAccount(); //setear account
    getTransactions(); //setear transacciones
    getBalance(); //setear balance

    return () => {};
  }, [token]);

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return (
          <div>
            🏠 Bienvenido a Home
            <FinanceSummary
              companyName="Tech Finance LLC"
              transactionsCore={transactions}
              accountBalance={balance}
              account={account}
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
