// Define the type for a single transaction
export interface Transaction {
    description: string;
    amount: number;
  }
  
  // Define the props type for FinanceSummary
  export interface FinanceSummaryProps {
    companyName: string;
    balance: number;
    transactions: Transaction[];
  }