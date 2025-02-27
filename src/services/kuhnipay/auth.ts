import { LogoutRequest } from "@/types/basic";
import { ApiResponse } from "./onboardingkuhnipay";

export async function logoutUser(
  requestData: LogoutRequest,
  authToken: string
): Promise<ApiResponse> {
  const url = `${import.meta.env.VITE_MGTW}/${
    import.meta.env.VITE_TENANT_NAME
  }sessionengine/1.0.0/session/api/v1/logout`;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${authToken}`);

  const body = JSON.stringify({
    appVersion: requestData.appVersion,
    latitude: requestData.latitude,
    longitude: requestData.longitude,
    deviceId: requestData.deviceId,
    data: {
      token: requestData.userToken,
      username: requestData.username,
    },
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: headers,
    body: body,
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Logout request failed:", error);
    throw error;
  }
}
