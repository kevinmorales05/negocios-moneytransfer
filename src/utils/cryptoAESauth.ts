import CryptoJS from "crypto-js";

const cryptoAESauth = (plaintextPassword: string): any => {
  const preEncypted = CryptoJS.SHA1(
    CryptoJS.enc.Utf8.parse(import.meta.env.VITE_CONSUMER_KEY)
  );
  const newKey = CryptoJS.enc.Hex.parse(
    preEncypted.toString(CryptoJS.enc.Hex).substr(0, 32)
  );
  const encrypted = CryptoJS.AES.encrypt(plaintextPassword, newKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted;
};

export default cryptoAESauth;
