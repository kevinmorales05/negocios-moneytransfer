import cryptoAES from "@/utils/cryptoAES";
import { AuthDataInterface, CoordinatesInterface } from "../../types/basic";

export async function preSingUp(
  user: AuthDataInterface,
  coordinates: CoordinatesInterface
) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  //cypher password
  let cypheredpassword: string = "";
  if (user.password && user.email) {
    cypheredpassword = cryptoAES(
      user.password,
      import.meta.env.VITE_TENANT_KEY,
      user.email
    );
  }
  const base64Credentials = btoa(`${import.meta.env.VITE_CONSUMER_KEY}:${import.meta.env.VITE_SECRET}`);

  console.log('base 64 string authorization basic ', base64Credentials)

  myHeaders.append("Authorization", `Basic ${base64Credentials}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");
  //include cypher of the password
  urlencoded.append("password", `${cypheredpassword}`);
  urlencoded.append(
    "scope",
    "use_otp update_info_scope use_accounts use_payments use_profile use_cards"
  );
  urlencoded.append("username", `${user.email}@casher.mx`);
  urlencoded.append("longitude", coordinates.longitude.toString());
  urlencoded.append("latitude", coordinates.latitude.toString());

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const response = await fetch(import.meta.env.VITE_AUTH_URL, requestOptions);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en autenticación:", error);
    throw error;
  }
}
//get address codes according to zipcode
export async function getAddressByZipCode(postalCode: string, token: string) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`); // Token de autenticación
  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: urlencoded,
  };
  try {
    const getAddress = await fetch(
      `${import.meta.env.VITE_MGTW}/${
        import.meta.env.VITE_TENANT_NAME
      }onboarding/1.0.0/getAddress?pc=${postalCode}`,
      requestOptions
    );
    if (!getAddress.ok) {
      throw new Error(`HTTP error! Status: ${getAddress.status}`);
    }
    const data = await getAddress.json();
    return data;
  } catch (error) {
    console.error("Error fetching address:", error);
    throw error;
  }
}

export const registerUser = async (
  userData: AuthDataInterface,
  token: string
) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`); // Token de autenticación
  let cypheredpassword: string = "";
  if (userData.password && userData.email) {
    cypheredpassword = cryptoAES(
      userData.password,
      import.meta.env.VITE_TENANT_KEY,
      userData.email
    );
  }
  const raw = JSON.stringify({
    branchId: import.meta.env.VITE_BRANCH_ID_CASHER,
    email: userData.email,
    password: cypheredpassword,
    personType: "2",
    termsAndConditionsId: "61957402ea01ff5337e9af11",
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_MGTW}/${
        import.meta.env.VITE_TENANT_NAME
      }onboarding/1.0.0/register/create`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en el registro:", error);
    throw error;
  }
};

export const simpleLogin = async (
  user: AuthDataInterface,
  coordinates: CoordinatesInterface
) => {
  const myHeaders = new Headers();
  let cypheredpassword: string = "";
  if (user.password && user.email) {
    cypheredpassword = cryptoAES(
      user.password,
      import.meta.env.VITE_TENANT_KEY,
      user.email
    );
  }
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  myHeaders.append("Authorization", `Basic ${import.meta.env.VITE_AUTH_TOKEN}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "password");
  urlencoded.append("password", cypheredpassword);
  urlencoded.append(
    "scope",
    "use_otp update_info_scope use_accounts use_payments use_profile use_cards"
  );
  urlencoded.append("username", `${user.email}@casher.mx`);
  urlencoded.append("longitude", coordinates.longitude.toString());
  urlencoded.append("latitude", coordinates.latitude.toString());

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const response = await fetch(import.meta.env.VITE_AUTH_URL, requestOptions);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en autenticación:", error);
    throw error;
  }
};

export interface Risk {
  level: number;
}

export interface BusinessInfo {
  businessName: string;
  stablishmentDate: string; // Consider using Date type if needed
  msisdn: string;
  addressLine1: string;
  addressLine2: string;
  addressExteriorNumber: string;
  addressInteriorNumber: string;
  addressIntersections: string;
  addressSuburb: string;
  addressCity: string;
  addressState: string;
  addressCountry: string;
  addressZip: string;
  mobilePhone: string;
  leasedLine: string;
  businessLine: string;
  docType: string;
  docNumber: string;
  rfc: string;
  curp: string;
  federalInstrumentDocument: string;
  publicInstrumentDocument: string;
  taxIdentificationCardImage: string;
  advancedElectronicSignatureProofImage: string;
  advancedElectronicSignatureSerialNumber: string;
  otpMsisdn: string;
  name: string;
  lastName: string;
  risk: Risk;
}

export const validateOTP = async (otp: string, token: string) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("x-signature", import.meta.env.VITE_X_SIGNATURE);
  myHeaders.append("Authorization", `Bearer ${token}`);
  const raw = JSON.stringify({
    otp: otp,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_MGTW}/${
        import.meta.env.VITE_TENANT_NAME
      }onboarding/1.0.0/otp/validate`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en el registro:", error);
    throw error;
  }
};
//falta integrar este servicio
export const updateUserInfo = async (userData: BusinessInfo, token: string) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("x-signature", import.meta.env.VITE_X_SIGNATURE);
  myHeaders.append("Authorization", `Bearer ${token}`); // Token de autenticación

  const raw = JSON.stringify(userData);
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_MGTW}/${
        import.meta.env.VITE_TENANT_NAME
      }onboarding/1.0.0/register/updateInfo`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en el update de datos:", error);
    throw error;
  }
};
