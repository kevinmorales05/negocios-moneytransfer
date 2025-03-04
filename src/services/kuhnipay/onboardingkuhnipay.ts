export interface AccountData {
  email: string; // email should be of type string
  password: string; // password should be of type string
}
export async function registerUserAccount(
  accountData: AccountData,
  deviceID: string,
  latitude: string,
  longitude: string,
  accessToken: string
): Promise<ApiResponse> {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  const requestBody = {
    appVersion: "1.0.0",
    latitude: latitude,
    longitude: longitude,
    deviceId: deviceID,
    accountData: {
      accountEmail: accountData.email,
      accountPassword: accountData.password,
      accountPasswordUpdate: accountData.password,
    },
  };

  // const requestBody = {
  //     appVersion: "1.0.0",
  //     latitude: "9.6233",
  //     longitude: "-15.8634",
  //     deviceId: "TAABCCDDEEFFGG001-A100-B200-C3002",
  //     accountData: {
  //         accountEmail: "victor@vats.capital",
  //         accountPassword: "OKz60Ev2bZ9ShuYzwuMKzw==",
  //         accountPasswordUpdate: "OKz60Ev2bZ9ShuYzwuMKzw=="
  //     }
  // };

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(requestBody),
    redirect: "follow" as RequestRedirect,
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_MGTW}/${
        import.meta.env.VITE_TENANT_NAME
      }casherusers/1.0.0/casherusers/api/v1/registerUserAccount`,
      requestOptions
    );

    const result = await response.json();
    console.log("Response:", result);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: (error as Error).message };
  }
}

export interface PersonalDataInterface {
  name: string;
  middleName: string;
  lastName: string;
  secondLastName: string;
  birthDate: string;
  gender: number;
  curp: string;
  rfc: string;
  phone: string;
  accessToken: string;
}

export async function registerPersonalInfo(
  personalData: PersonalDataInterface,
  deviceID: string,
  latitude: string,
  longitude: string,
  accessToken: string
): Promise<ApiResponse> {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  const raw = JSON.stringify({
    appVersion: "1.0.0",
    latitude: latitude,
    longitude: longitude,
    deviceId: deviceID,
    msisdn: personalData.phone,
    personalData: personalData,
  });

  //   const raw = JSON.stringify({
  //     appVersion: "1.0.0",
  //     latitude: "99.6233",
  //     longitude: "-15.8634",
  //     deviceId: "TAABCCDDEEFFGG001-A100-B200-C3002",
  //     msisdn: "5530594464",
  //     personalData: {
  //       name: "VICTOR",
  //       middleName: "ANDRES",
  //       lastName: "TRUJILLO",
  //       secondLastName: "SIERRA",
  //       birthDate: "1984-05-21",
  //       gender: 1,
  //       curp: "TUSD840521HDFRRC06",
  //       rfc: "XEXX010101000",
  //       phone: "5530594464",
  //     },
  //   });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_MGTW}/${
        import.meta.env.VITE_TENANT_NAME
      }casherusers/1.0.0/casherusers/api/v1/registerPersonalInfo`,
      requestOptions
    );

    const result = await response.json();
    console.log(result);
    return { success: false, message: "error desconocido!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: (error as Error).message };
  }
}
export interface AddresDataInterface {
  street: string;
  internalNumber: string;
  externalNumber: string;
  postalCode: string;
  cityName: string;
  stateName: string;
  suburbName: string;
}
export async function registerAddress(
  address: AddresDataInterface,
  deviceID: string,
  latitude: string,
  longitude: string,
  accessToken: string
): Promise<ApiResponse> {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  const raw = JSON.stringify({
    appVersion: "1.0.0",
    latitude: latitude,
    longitude: longitude,
    deviceId: deviceID,
    addressData: address,
  });

  // const raw = JSON.stringify({
  //     "appVersion": "1.0.0",
  //     "latitude": "99.6233",
  //     "longitude": "-15.8634",
  //     "deviceId": "TAABCCDDEEFFGG001-A100-B200-C3002",
  //     "addressData": {
  //         "street": "LIMESTONE RD",
  //         "internalNumber": "STE 200-C",
  //         "externalNumber": "2055",
  //         "postalCode": "19808",
  //         "cityName": "22",
  //         "stateName": "19-01",
  //         "suburbName": "19-01-2054"
  //     }
  // });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_MGTW}/${
        import.meta.env.VITE_TENANT_NAME
      }casherusers/1.0.0/casherusers/api/v1/registerAddress`,
      requestOptions
    );
    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Error registering beneficiaries:", error);
    return { success: false, message: (error as Error).message };
  }
}

export interface Beneficiary {
  fullName: string;
  percentage: string;
}

export interface RegisterBeneficiariesRequest {
  appVersion: string;
  latitude: string;
  longitude: string;
  deviceId: string;
  msisdn: string;
  beneficiariesData: Beneficiary[];
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
  error?: any;
}

export async function registerBeneficiaries(
  data: RegisterBeneficiariesRequest,
  accessToken: string
): Promise<ApiResponse> {
  const url = `${import.meta.env.VITE_MGTW}/${
    import.meta.env.VITE_TENANT_NAME
  }casherusers/1.0.0/casherusers/api/v1/registerBeneficiaries`;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Error registering beneficiaries:", error);
    return { success: false, message: (error as Error).message };
  }
}

export enum IndicatorValue {
  IDENTITY_VALIDATION = "IDENTITY_VALIDATION",
  TERMS_AND_CONDITIONS = "TERMS_AND_CONDITIONS",
  ACCOUNT_CREATION = "ACCOUNT_CREATION",
  OTP_VALIDATED_BY_EMAIL = "OTP_VALIDATED_BY_EMAIL",
  ACCOUNT_ACTIVATION = "ACCOUNT_ACTIVATION",
}
export interface IndicatorRequest {
  appVersion: string;
  latitude: string;
  longitude: string;
  deviceId: string;
  indicatorName: IndicatorValue;
  indicatorValue: boolean;
}

export async function updateIndicator(
  data: IndicatorRequest,
  accessToken: string
): Promise<ApiResponse> {
  const url = `${import.meta.env.VITE_MGTW}/${
    import.meta.env.VITE_TENANT_NAME
  }casherusers/1.0.0/casherusers/api/v1/indicator`;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Error updating indicator:", error);
    return { success: false, message: (error as Error).message };
  }
}

export interface TransactionProfile {
  keyResourceOrigin: number;
  keyResourceDestination: number;
  accountUse: string;
  keyMonthlyDepositTransfers: number;
  keyMonthlyDepositAmounts: number;
  keyMonthlyWithdrawalTransfers: number;
  keyMonthlyWithdrawalAmounts: number;
}

export interface RegisterProfilePayload {
  appVersion: string;
  latitude: string;
  longitude: string;
  deviceId: string;
  transactionProfile: TransactionProfile;
}

export async function registerTransactionalProfile(
  transactionalProfile: RegisterProfilePayload,
  accessToken: string
): Promise<ApiResponse> {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(transactionalProfile),
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_MGTW}/${
        import.meta.env.VITE_TENANT_NAME
      }transactionalprofile/1.0.0/transactionalprofile/api/v1/registerTransactionalProfile`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Error updating indicator:", error);
    return { success: false, message: (error as Error).message };
  }
}
