import { AccountBalance, AccountData, TransactionCore } from "@/services/kuhnipay/loggedservices";

// Define the type for a single transaction
export interface Transaction {
    description: string;
    amount: number;
  }
  
  // Define the props type for FinanceSummary
  export interface FinanceSummaryProps {
    companyName: string;
    transactionsCore?: TransactionCore[] | null;
    accountBalance?: AccountBalance[] | null;
    account?: AccountData[] | null;
  }