import cryptoAES from "@/utils/cryptoAES";

export interface AuthPayload {
  appVersion: string;
  latitude: string;
  longitude: string;
  deviceId: string;
  data: {
    password: string;
    scope: string;
    username: string;
    zoneId: string;
  };
}

export interface LoginResponse {
  access_token?: string;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
  expires_in?: number;
  lastLoginDate?: string;
  branchId?: string;

  error_message?: string;
  code?: string;
  error_description?: string;
}

export async function authenticateUser(
  payload: AuthPayload,
  token: string
): Promise<LoginResponse> {
  const url = `${import.meta.env.VITE_MGTW}/${
    import.meta.env.VITE_TENANT_NAME
  }sessionengine/1.0.0/session/api/v1/login`;

  const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });

  let cypheredpassword: string = "";
  if (payload.data.password && payload.data.username) {
    cypheredpassword = cryptoAES(
      payload.data.password,
      import.meta.env.VITE_TENANT_KEY,
      payload.data.username
    );
    //se almacena el password cifrado antes de enviar
    payload.data.password = cypheredpassword;
  }

  const requestOptions: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(
        `Error en la solicitud: ${response.status} - ${response.statusText}`
      );
    }

    const result = await response.json();
    ///error password incorrecto
    if (result.error === "1") {
      return {
        error_message: "1",
        error_description: "Contraseña incorrecta",
      };
    }
    //error otra sesion activa
    if (result.error === "2") {
      return {
        error_message: "1",
        error_description: "Otra sesión activa",
      };
    }
    //error otra sesion activa
    if (result.error === "3") {
      return {
        error_message: "3",
        error_description: "Cuenta bloqueada",
      };
    }
    return result;
  } catch (error) {
    console.error("Error en la autenticación:", error);
    return {
      error_message:
        error instanceof Error ? error.message : "Error desconocido",
    };
  }
}

export interface ApiError {
  error_message: string;
  code: string;
  error_description: string;
}

export interface UserProfileDataProfile {
  name: string;
  middleName: string | null;
  lastName: string;
  secondLastName: string | null;
  dateOfBirth: string | null;
  gender: number;
  birthState: string | null;
  birthCity: string | null;
  maritalState: string | null;
  nationality: string;
  businessName: string;
  stablishmentDate: string;
  msisdn: string;
  addressLine1: string;
  addressLine2: string | null;
  addressExteriorNumber: string;
  addressInteriorNumber: string | null;
  addressIntersections: string | null;
  addressSuburb: string;
  addressCity: string;
  addressState: string;
  addressCountry: string;
  addressZip: string;
  mobilePhone: string;
  leasedLine: string;
  rfc: string;
  curp: string;
  businessLine: string;
  docType: number;
  docNumber: string;
  externalClabe: string | null;
  accountholderNumber: string;
}

export interface ApiResponseProfile {
  responseCode: string;
  responseMessage: string;
  responseSubject: string;
  messageType: number;
  transId: string;
  data: UserProfileDataProfile;
}

export interface ApiResponseError {
  error_message: string;
  code: string;
  error_description: string;
}
//get profile
export async function getUserProfile(
  token: string
): Promise<{ success: boolean; result: ApiResponseProfile | ApiError }> {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("x-signature", import.meta.env.VITE_X_SIGNATURE);
  myHeaders.append("Authorization", `Bearer ${token}`);
  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_MGTW}/${
        import.meta.env.VITE_TENANT_NAME
      }user-profile/1.0.0/profile/getProfile`,
      requestOptions
    );

    if (!response.ok) {
      const errorResponse: ApiResponseError = await response.json();
      return { success: false, result: errorResponse }; // Retorna el error
    }

    const result: ApiResponseProfile = await response.json();

    // Verificar si la respuesta es exitosa
    if (result.responseCode === "0") {
      return { success: true, result: result }; // Retorna la respuesta exitosa
    } else {
      return {
        success: false,
        result: {
          error_message: result.responseMessage,
          code: result.responseCode,
          error_description: "Error en la respuesta",
        } as ApiResponseError,
      };
    }

    console.log(result);
  } catch (error) {
    console.error("Request failed", error);
    return {
      success: false,
      result: {
        error_message: "Error de conexión",
        code: "500",
        error_description: error,
      } as ApiResponseError,
    };
  }
}

export interface Account {
  accountHolderId: string;
  identification: string;
  identificationState: string;
  identificationComment: string;
  name: string;
  secondaryIdentification: string;
  child: boolean;
  parentAccountId: string | null;
  paymentReference: string;
  schemeId: string;
  schemeName: string;
  rate: string;
  term: string | null;
  nominalGAT: number;
  realGAT: number;
}

export interface AccountData {
  accountId: string;
  status: string;
  statusUpdateDateTime: string;
  currency: string;
  accountType: string;
  accountSubType: string;
  nickname: string;
  openingDate: string;
  closingDate: string | null;
  daysOld: number;
  description: string;
  account: Account;
}

export interface AccountResponse {
  responseCode: string;
  responseMessage: string;
  responseSubject: string;
  messageType: number;
  transId: string;
  data: AccountData[];
  accountholderId: string;
}
export interface AccountError {
  error_message: string;
  code: string;
  error_description: string;
}
//get accounts
export async function getAccounts(
  token: string
): Promise<{ data?: AccountResponse; error?: string }> {
  const url = `${import.meta.env.VITE_MGTW}/${
    import.meta.env.VITE_TENANT_NAME
  }accounts/1.0.0/accounts`;

  const headers = new Headers({
    "Content-Type": "application/json",
    "x-signature": import.meta.env.VITE_X_SIGNATURE,
    Authorization: `Bearer ${token}`, // Truncado por seguridad
  });

  const requestOptions: RequestInit = {
    method: "GET",
    headers,
    redirect: "follow" as RequestRedirect,
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      const errorResponse: AccountError = await response.json();
      return {
        error: `❌ Error: ${errorResponse.error_message} (${errorResponse.code}) - ${errorResponse.error_description}`,
      };
    }
    const result: AccountResponse = await response.json();

    if (result.responseCode !== "0") {
      return { error: `❌ Error en respuesta: ${result.responseMessage}` };
    }

    return { data: result };
  } catch (error) {
    console.error("Error fetching accounts:", error);
    return { error: `❌ Error inesperado: ${(error as Error).message}` };
  }
}

export interface BalanceResponse {
  responseCode: string;
  responseMessage: string;
  responseSubject: string;
  messageType: number;
  transId: string;
  data: AccountBalance[];
  accountholderId: string;
}

export interface AccountBalance {
  accountId: string;
  accountNumber: string;
  amount: {
    amount: string;
    currency: string;
  };
  dayIncomingAmount: string;
  monthIncomingAmount: string;
  dayOutgoingAmount: string;
  monthOutgoingAmount: string;
  type: string;
  child: boolean;
  parentAccountId: string | null;
  dateTime: string;
  nominalGAT: string | null;
  realGAT: string | null;
  creditLine: string | null;
}

export interface BalanceError {
  error_message: string;
  code: string;
  error_description: string;
}
//get balance
export async function getBalances(
  token: string
): Promise<{ data?: BalanceResponse; error?: string }> {
  const url = `${import.meta.env.VITE_MGTW}/${
    import.meta.env.VITE_TENANT_NAME
  }accounts/1.0.0/balances`;

  const headers = new Headers({
    "Content-Type": "application/json",
    "x-signature": import.meta.env.VITE_X_SIGNATURE,
    Authorization: `Bearer ${token}`, // Truncado por seguridad
  });

  const requestOptions: RequestInit = {
    method: "GET",
    headers,
    redirect: "follow" as RequestRedirect,
  };

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      const errorResponse: BalanceError = await response.json();
      return {
        error: `❌ Error: ${errorResponse.error_message} (${errorResponse.code}) - ${errorResponse.error_description}`,
      };
    }

    const result: BalanceResponse = await response.json();

    if (result.responseCode !== "0") {
      return { error: `❌ Error en respuesta: ${result.responseMessage}` };
    }

    return { data: result };
  } catch (error) {
    return { error: `❌ Error inesperado: ${(error as Error).message}` };
  }
}

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

export interface TransactionResponse {
    responseCode: string;
    responseMessage: string;
    responseSubject: string;
    messageType: number;
    transId: string;
    data: TransactionCore[];
    accountholderId: string;
}

//get transactions
export async function getTransactionsCore(
    token: string
  ): Promise<{ data?: TransactionResponse; error?: string }> {
    const url = `${import.meta.env.VITE_MGTW}/${
      import.meta.env.VITE_TENANT_NAME
    }accounts/1.0.0/transactions`;
  
    const headers = new Headers({
      "Content-Type": "application/json",
      "x-signature": import.meta.env.VITE_X_SIGNATURE,
      Authorization: `Bearer ${token}`, // Truncado por seguridad
    });
  
    const requestOptions: RequestInit = {
      method: "GET",
      headers,
      redirect: "follow" as RequestRedirect,
    };
  
    try {
      const response = await fetch(url, requestOptions);
  
      if (!response.ok) {
        const errorResponse: BalanceError = await response.json();
        return {
          error: `❌ Error: ${errorResponse.error_message} (${errorResponse.code}) - ${errorResponse.error_description}`,
        };
      }
  
      const result: TransactionResponse = await response.json();
  
      if (result.responseCode !== "0") {
        return { error: `❌ Error en respuesta: ${result.responseMessage}` };
      }
  
      return { data: result };
    } catch (error) {
      return { error: `❌ Error inesperado: ${(error as Error).message}` };
    }
  }