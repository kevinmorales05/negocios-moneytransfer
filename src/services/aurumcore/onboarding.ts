import { AuthDataInterface, CoordinatesInterface } from "../../types/basic";

export async function preSingUp(
  user: AuthDataInterface,
  coordinates: CoordinatesInterface
) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  myHeaders.append("Authorization", `Basic ${import.meta.env.VITE_AUTH_TOKEN}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");
  urlencoded.append("password", "Jxi1F5Fvd/vjvcC55SHfEBvqDxGSM2U6fo4sNOBe8Ew=");
  urlencoded.append(
    "scope",
    "use_otp update_info_scope use_accounts use_payments use_profile use_cards"
  );
  urlencoded.append("username", "victor@tenet.capital@casher.mx");
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

  const raw = JSON.stringify({
    branchId: "eMaCKHWPSuCGWmPzNn3DTvma2xR9AyNqX5bX",
    email: "victor@tenet.capital",
    password: "Jxi1F5Fvd/vjvcC55SHfEBvqDxGSM2U6fo4sNOBe8Ew=",
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
