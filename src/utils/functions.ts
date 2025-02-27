import { CoordinatesInterface } from "@/types/basic";

export function generateUniqueId(): string {
  const getRandomLetters = (length: number) =>
    Array.from({ length }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join("");

  const getRandomDigits = (length: number) =>
    Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");

  const getRandomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  // Get a timestamp in milliseconds
  const timestamp = Date.now().toString().slice(-7); // Last 7 digits of timestamp to keep it readable

  // Generate each part
  const TA = "TA";
  const AB = getRandomLetters(2); // AA
  const CC = getRandomDigits(2); // CC
  const DD = getRandomDigits(2); // DD
  const EE = getRandomDigits(2); // EE
  const FF = getRandomDigits(2); // FF
  const GG = getRandomDigits(2); // GG
  const numericPart = timestamp; // Ensures uniqueness
  const A = `A${getRandomNumber(100, 999)}`; // A100
  const B = `B${getRandomNumber(100, 999)}`; // B200
  const C = `C${getRandomNumber(1000, 9999)}`; // C3002

  return `${TA}${AB}${CC}${DD}${EE}${FF}${GG}${numericPart}-${A}-${B}-${C}`;
}

export const getGeolocation = (): Promise<CoordinatesInterface> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(new Error(`Error getting location: ${error.message}`));
      }
    );
  });
};

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}