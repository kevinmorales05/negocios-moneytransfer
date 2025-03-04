// Tipos de datos basados en tu modelo
export interface Amount {
    amount: string;
    currency: string;
  }
  
  export interface CurrencyExchange {
    souceCurrency: string;
    targetCurrency: string;
    unitCurrency: string;
    exchangeRate: string;
    quotationDate: string | null;
    contractIdentification: string | null;
  }
  
  export interface BankTransactionCode {
    code: string | null;
    subcode: string | null;
  }
  
  export interface ProprietaryBankTransactionCode {
    code: string;
    issuer: string | null;
  }
  
  export interface MerchantDetail {
    merchantName: string | null;
    merchantCategoryCode: string | null;
  }
  
  export interface AccountDetails {
    identification: string;
    name: string | null;
    secondaryIdentification: string;
    bankName: string;
    creditorName?: string;
    debtorName?: string;
  }
  
  export interface CardInstrument {
    authorizationType: string | null;
    name: string | null;
    identification: string | null;
    cardSchemeName: string | null;
  }
  
  export interface TransactionCore {
    accountId: string;
    accountNumber: string;
    child: boolean;
    parentAccountId: string | null;
    transactionId: string;
    transactionReference: string;
    status: string;
    bookingDateTime: string;
    transactionInformation: string;
    transactionType: string;
    trackingKey: string;
    authorizationCode: string;
    amount: Amount;
    currencyExchange: CurrencyExchange;
    bankTransactionCode: BankTransactionCode;
    propietaryBankTransactionCode: ProprietaryBankTransactionCode;
    merchantDetail: MerchantDetail;
    creditorAccount: AccountDetails;
    debtorAccount: AccountDetails;
    cardInstrument: CardInstrument;
    transactionTypeInfo: string | null;
  }
  
  export interface TransactionListProps {
    transactions: TransactionCore[] | null | undefined;
  }