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
    cypheredpassword = cryptoAES(user.password, "key", user.email);
  }

  myHeaders.append("Authorization", `Basic ${import.meta.env.VITE_AUTH_TOKEN}`);

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

export const registerUser = async (
  userData: AuthDataInterface,
  token: string
) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`); // Token de autenticación
  let cypheredpassword: string = "";
  if (userData.password && userData.email) {
    cypheredpassword = cryptoAES(userData.password, "key", userData.email);
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
    cypheredpassword = cryptoAES(user.password, "key", user.email);
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
