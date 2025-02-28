import CryptoJS from 'crypto-js';

const cryptoAES = (
  plaintextPassword: string,
  key: string,
  email: string,
): any => {
  const userName: string = email.split('@')[0];
  console.log('This is the pwd plain ', plaintextPassword);
  console.log('This is the User', userName);
  const rawKey = userName + ':' + key;
  console.log('Raw key ', rawKey);

  const hashedRawKey = CryptoJS.SHA1(CryptoJS.enc.Utf8.parse(rawKey));
  const hashedKey = CryptoJS.enc.Hex.parse(
    hashedRawKey.toString(CryptoJS.enc.Hex).substr(0, 32),
  );

  //AES encryption
  const encrypted = CryptoJS.AES.encrypt(plaintextPassword, hashedKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  console.log('The encryption was successfull!');

  return encrypted.toString();;
};

export default cryptoAES;
