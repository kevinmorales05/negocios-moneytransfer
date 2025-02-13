// import {AuthDataInterface, CoordinatesInterface} from '../reactRedux';
// import cryptoAES from '../../utils/cryptoAES';
// import cryptoAESauth from '../../utils/cryptoAESauth';
// import {HttpClient} from '../../utils/http-client';
// import qs from 'qs';
// import axios from 'axios';
// import { cryptoSignature } from '../../utils/cryptoSignature';

// /**
//  * Pre Signup
//  * @param user
//  * @returns
//  */

// async function preSignUp(user: AuthDataInterface): Promise<any> {
//   const tokenResponse = axios(setAxiosConfig(user, 'signUp'))
//     .then(function (response) {
//       console.log('desde signUp', JSON.stringify(response.data));
//       HttpClient.bearerToken = response.data.access_token;
//       console.log('tokk', HttpClient.bearerToken);
//       return response;
//     })
//     .catch(function (error) {
//       console.log(error);
//       return error;
//     });
//   console.log('RESPONSE ', JSON.stringify(tokenResponse, null, 3));


//   const registerResponse = axios(
//     setAxiosConfigAuthServices(user, HttpClient.bearerToken),
//   )
//     .then(function (response) {
//       console.log('desde signUp', JSON.stringify(response.data));
//       HttpClient.bearerToken = response.data.access_token;
//       console.log('tokk signUP', HttpClient.bearerToken);
//       return response;
//     })
//     .catch(function (error) {
//       console.log(error);
//       return error;
//     });

//   if (registerResponse === undefined)
//     return Promise.reject(new Error('preSignUp:register/create'));

//   const {data} = registerResponse;
//   //console.log('this is the data', response)

//   return data;
// }

// /**
//  * Main Login.
//  * @param user
//  */
// async function login(user: AuthDataInterface, coords?: CoordinatesInterface): Promise<any> {
//   const tokenResponse = axios(setAxiosConfig(user, 'login', coords))
//     .then(function (response) {
//       HttpClient.bearerToken = response.data.access_token;
//       console.log('Token desde login', response);
//       return response;
//     })
//     .catch(function (error) {
//       console.log(error);
//       return error.response;
//     });
//   console.log('RESPONSE ', JSON.stringify(tokenResponse, null, 3));

//   return tokenResponse;
// }
// async function preLogin(user: AuthDataInterface, coordinates : CoordinatesInterface): Promise<any> {
//   try {
//     const response = await axios(setAxiosConfig(user, 'signup', coordinates));
//     HttpClient.bearerToken = response.data.access_token;
//     console.log('Request to accept terms and conditions', response);
//     const termsAndConditionsResponse = await axios(setAxiosConfigValidateTermsAndContitions(response.data.access_token));
//     const termsId = termsAndConditionsResponse.data.data.termsAndConditionsId
//     console.log("TERMS AND CONDITIOS RESPONSE", termsAndConditionsResponse)
//     const authToken = await createAccount(user, response.data.access_token, termsId, coordinates);
//     if(authToken.data.responseCode == 100) {
//       return authToken;
//     }
//     console.log("Login tras crear usuario para obtener permiso de use_otp");
//     const newToken = await login(user);
//     console.log('Nuevo token para validar otp', newToken);
//     return newToken;
//   } catch (error : any) {
//     console.log("Error on authServices preLogin",error);
//     return error.response;
//   }
// }
// async function getTermsAndConditions(token: string): Promise<any>{
//   try {
//     const response = await axios(setAxiosConfigValidateTermsAndContitions(token));
//     return response;
//   } catch (error : any) {
//     console.log("Error on authServices termsAndConditions",error);
//     return error.response;
//   }
// }
// async function getBusinessList(token: string): Promise<any>{
//   try {
//     const response = await axios(setAxiosConfigBusinessList(token));
//     return response;
//   } catch (error : any) {
//     console.log("Error on authServices businessList",error);
//     return error.response;
//   }
// }
// async function getCountries(token: string): Promise<any>{
//   try {
//     const response = await axios(setAxiosConfigCountries(token));
//     return response;
//   } catch (error : any) {
//     console.log("Error on authServices countries",error);
//     return error.response;
//   }
// }

// async function simplePrelogin(user: AuthDataInterface, coordinates : CoordinatesInterface): Promise<any> {
//   try {
//     const response = await axios(setAxiosConfig(user, 'signup', coordinates));
//     return response;
//   } catch (error : any) {
//     console.log("Error on authServices preLogin",error);
//     return error.response;
//   }
// }

// //estoy aqui
// async function createAccount(
//   user: AuthDataInterface,
//   authToken: string,
//   termsAndConditiosId: string,
//   coordinates: CoordinatesInterface
// ): Promise<any> {
//   const registerResponse = axios(setAxiosConfigAuthServices(user, authToken, termsAndConditiosId, coordinates))
//     .then(function (response) {
//       console.log('desde signUp', JSON.stringify(response.data));
//       HttpClient.bearerToken = response.data.access_token;
//       console.log('tokk CreatedUser', authToken);
//       return response;
//     })
//     .catch(function (error) {
//       console.log("Catch on createAccount function",error);
//       return error;
//     });
//   return registerResponse;
// }
// /**
//  * Function to update user info
//  * @param user
//  * @returns
//  */
// async function updateUserInfoOnboarding(user: AuthDataInterface, authToken: string, latitude: number, longitude: number): Promise<any> {

//   const updatedUser = axios(setAxiosConfigUpdateUser(user, authToken, latitude, longitude))
//     .then(function(response) {
//       console.log("Response from auth.services updateInfo", response);
//       return response;
//     })
//   console.log("2 Response from auth.services updateInfo", updatedUser);
//   return updatedUser;  
  
// }

// /**
//  * Function to update user info.
//  * @param user
//  * @returns
//  */
// async function updateUserCreatedInfo(user: AuthDataInterface, authToken: string,): Promise<any> {

//   const updatedUser = axios(setAxiosConfigUpdateUserCreated(user, authToken))
//     .then(function(response) {
//       console.log("Response from auth.services profile/update", response);
//       return response;
//     })
//   console.log("2 Response from auth.services profile/update", updatedUser);
//   return updatedUser;  
  
// }

// /**
//  * Function to update user password
//  * @param mail
//  * @param currentPassword 
//  * @param newPassword 
//  * @param authToken 
//  * @returns 
//  */
// async function updatePassword(mail:string, currentPassword:string, newPassword: string, authToken: string) {
//   const updatedPassword = axios(setAxiosConfigUpdatePassword(mail,currentPassword,newPassword, authToken))
//     .then(function(response) {
//       console.log("1 Response from auth.services updatePassword", response);
//       return response;
//     })
//   console.log("2 Response from auth.services updatePassword", updatedPassword);
//   return updatedPassword;
// }

// const setAxiosConfigUpdatePassword = (
//   mail: string,
//   currentPassword:string, 
//   newPassword: string, 
//   authToken: string
// ) => {
//   const pass_encript_current = cryptoAESauth(currentPassword)
//   const pass_encript_new = cryptoAESauth(newPassword);
//   console.log("TESTEO current pass encrypted", `${pass_encript_current}`)
//   console.log("TESTEO new pass encrypted", `${pass_encript_new}`)
//   const config = {
//     method: 'post',
//     url: `${import.meta.env.VITE_URL_AURUM}user-profile/1.0.0/password/update`,
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${authToken}`,
//       'x-signature': cryptoSignature(authToken, `${import.meta.env.VITE_URL_AURUM}user-profile/1.0.0/profile/updatePassword`),
//     },
//     data: {
//       oldPassword:`${pass_encript_current}`,
//       newPassword:`${pass_encript_new}`
//     },
//   };
//   console.log('Successfully configured axios for update password!', config);
//   return config;
// }


// const setAxiosConfigAuthServices = (
//   user: AuthDataInterface,
//   authToken: string,
//   termsAndConditionsId: string,
//   coordinates: CoordinatesInterface
// ) => {
//   const config = {
//     method: 'post',
//     url: `${import.meta.env.VITE_URL_AURUM}onboarding/1.0.0/register/create`,
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${authToken}`,
//       'Latitude': coordinates.latitude,
//       'Longitude': coordinates.longitude
//     },
//     data: buildNewUserStructure(user, termsAndConditionsId),
//   };

//   console.log('>>> Coordinates: ', coordinates.latitude, ' ,',  coordinates.longitude);
//   console.log('Successfully configured axios for singup!');
//   return config;
// };

// /* AÑADIR LATITUDE Y LOGITUDE */
// const setAxiosConfigUpdateUser= (
//   user: AuthDataInterface,
//   authToken: string,
//   latitude: number,
//   longitude: number
// ) => {
//   const config = {
//     method: 'post',
//     url: `${import.meta.env.VITE_URL_AURUM}onboarding/1.0.0/register/updateInfo`,
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${authToken}`,
//       'X-JWT-Assertion': `${import.meta.env.VITE_X_JWT_ASSERTION}`,
//       'x-signature': cryptoSignature(authToken, `${import.meta.env.VITE_URL_AURUM}onboarding/1.0.0/register/updateInfo`),
//       'Latitude': latitude,
//       'Longitude': longitude
//     },
//     data: user,
//   };
//   console.log('Successfully configured axios for singup!');
//   console.log('Coordinates:  ', latitude, ', ', longitude)
//   return config;
// };
// const setAxiosConfigUpdateUserCreated= (
//   user: AuthDataInterface,
//   authToken: string,
// ) => {
//   const config = {
//     method: 'post',
//     url: `${import.meta.env.VITE_URL_AURUM}user-profile/1.0.0/profile/update`,
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${authToken}`,
//       'x-signature': cryptoSignature(authToken, `${import.meta.env.VITE_URL_AURUM}user-profile/1.0.0/profile/update`),
      
//     },
//     data: user,
//   };
//   return config;
// };
// const setAxiosConfigOTPservice= (
//   channel:  number,
//   authToken: string,
// ) => {
//   //postman is working without signature
//   const config = {
//     method: 'post',
//     url: `${import.meta.env.VITE_URL_AURUM}onboarding/1.0.0/otp/send`,
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${authToken}`,
//       'x-signature': cryptoSignature(authToken, `${import.meta.env.VITE_URL_AURUM}onboarding/1.0.0/otp/send`),
//     },
//     data: JSON.stringify({
//       channelId: channel
//     }),
//   };
//   console.log('Successfully configured axios for singup!');
//   return config;
// };
// const setAxiosConfigOTPserviceValidate= (
//   otp:  string,
//   authToken: string,
// ) => {
//   //postman is working without signature
//   const config = {
//     method: 'post',
//     url: `${import.meta.env.VITE_URL_AURUM}onboarding/1.0.0/otp/validate`,
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${authToken}`,
//       'x-signature': cryptoSignature(authToken, `${import.meta.env.VITE_URL_AURUM}onboarding/1.0.0/otp/validate`),

//     },
//     data: JSON.stringify({
//       otp: otp
//     }),
//   };
//   console.log('Successfully configured axios for singup!');
//   return config;
// };

// const buildNewUserStructure = (user: AuthDataInterface, termsAndConditionsId? : string) => {
//   let pass_encript = cryptoAESauth(user.password ?? "");
//   console.log('pwd ncripted', pass_encript);
//   let data = JSON.stringify({
//     branchId: import.meta.env.VITE_BRANCH_ID_CASHER,
//     email: `${user.email}`,
//     password: `${pass_encript}`,
//     personType: '1',
//     termsAndConditionsId: termsAndConditionsId ?? '61957402ea01ff5337e9af11',
//   });
//   return data;
// };
// /**
//  * Function to validate sended OTP via email.
//  * @param otp
//  * @returns
//  */
// async function otpValidate(otp: string, authToken: string): Promise<any> {
//   //configure axios
//   const otpReponse = axios(setAxiosConfigOTPserviceValidate(otp, authToken))
//   .then(function (response) {
//     console.log('desde otp validate success', JSON.stringify(response.data));
//     return response;
//   })
//   .catch(function (error) {
//     console.log(error);
//     return error;
//   });
// return otpReponse;
// }



// /**
//  * Function to send otp.
//  * @param channelId
//  * channelId = 1: email
//  * channelId = 2: sms
//  * @returns
//  */
// async function sendOtp(channelId: number, authToken:string): Promise<any> {
//   //configure axios
//   const otpReponse = axios(setAxiosConfigOTPservice(channelId, authToken))
//   .then(function (response) {
//     console.log('desde otp send success', JSON.stringify(response.data));
//     return response;
//   })
//   .catch(function (error) {
//     console.log(error);
//     return error;
//   });
//   return otpReponse;
// }

// const setAxiosConfig = (
//   user: AuthDataInterface, 
//   signupSettings: string, 
//   coords: CoordinatesInterface = {
//     latitude: 90, 
//     longitude: 90
//   }
// ) => {
  
//   // eslint-disable-next-line @typescript-eslint/no-require-imports
//   const Buffer = require('buffer/').Buffer  // note: the trailing slash is important!
//   const base64Credentials = Buffer.from(`${import.meta.env.VITE_CONSUMER_KEY}:${import.meta.env.VITE_SECRET}`).toString('base64');

//   const config = {
//     method: 'post',
//     url: import.meta.env.VITE_AUTH_URL,
//     headers: {
//       'Authorization': `Basic ${base64Credentials}`,
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     data: buildDataStructure(user, signupSettings, coords),
//   };
//   console.log('Successfully configured axios!');
//   return config;
// };

// const buildDataStructure = (
//   user: AuthDataInterface,
//   signupSettings: string,
//   coords: CoordinatesInterface
// ) => {
//   let grantTypeConfig = 'client_credentials';
//   if (signupSettings === 'login') {
//     grantTypeConfig = 'password';
//   }
//   const pasword = user.password ? user.password : 'xxxxxx'
//   if (pasword && user.email) {
//     const pass_encript = cryptoAES(pasword, import.meta.env.VITE_TENANT_KEY, user.email);
//     console.log("cryptoAES pass encrypted from login", `${pass_encript}`)
//     const pass_encript2 = cryptoAESauth(pasword);
//     console.log("cryptoAESauth pass encrypted from login 2", `${pass_encript2}`)
//     const userData = qs.stringify({
//       grant_type: `${grantTypeConfig}`,
//       password: `${pass_encript}`,
//       scope:
//         'use_otp update_info_scope use_accounts use_payments use_profile use_cards',
//       username: `${user.email}@${import.meta.env.VITE_TERMINAL}`,
//       longitude: `${coords.longitude}`,
//       latitude: `${coords.latitude}`,
//     });
//     console.log('datos enviados', userData);
//     console.log('The data structure was created successfully!');
//     return userData;
//   } else {
//     console.log('Incomplete information in order to login!', user);
//     return null;
//   }
// };
// async function getProfile(authToken:string): Promise<any> {
//   const response = axios(setAxiosConfigProfileServices(authToken)).then (function (res){
//     console.log('data from profile', JSON.stringify(res.data));
//     return res;
//   }).catch(function (error){
//     console.log('Error ', error);
//     return error;
//   });
//   return response;
// }
// const setAxiosConfigProfileServices = (authToken: string) => {
//   const urlService = `${import.meta.env.VITE_URL_AURUM}user-profile/1.0.0/profile/getProfile`;
  
//   console.log('token desde profile services', authToken);
//   const config = {
//     method: 'get',
//     url: urlService,
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${authToken}`,
//       'x-signature': cryptoSignature(authToken, urlService),
//     },
//   };
//   console.log('Successfully configured axios for auth endpoints!');
//   return config;
// };


// /**
//  * Function to validate terms and conditions
//  * @param authToken
//  * @returns
//  */
// async function validateTermsAndConditions(authToken: string,): Promise<any> {

//   const data = axios(setAxiosConfigValidateTermsAndContitions(authToken))
//     .then(function(response) {
//       console.log("Response from auth.services termsAndConditions", response);
//       return response;
//     })
//   console.log("2 Response from auth.services termsAndConditions", data);
//   return data;  
// }

// const setAxiosConfigValidateTermsAndContitions = (authToken: string) => {
//   const urlService = `${import.meta.env.VITE_URL_AURUM}onboarding/1.0.0/termsAndConditions?branchId=${import.meta.env.VITE_BRANCH_ID_CASHER}`;  
//   const config = {
//     method: 'get',
//     url: urlService,
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${authToken}`,
//     },
//   };
//   console.log('Successfully configured axios for termsAndConditions endpoint!');
//   return config;
// };
// const setAxiosConfigBusinessList = (authToken: string) => {
//   const urlService = `${import.meta.env.VITE_URL_AURUM}onboarding/1.0.0/businessLine`;  
//   const config = {
//     method: 'get',
//     url: urlService,
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${authToken}`,
//     },
//   };
//   console.log('Successfully configured axios for termsAndConditions endpoint!');
//   return config;
// };
// const setAxiosConfigCountries = (authToken: string) => {
//   const urlService = `${import.meta.env.VITE_URL_AURUM}onboarding/1.0.0/countries`;  
//   const config = {
//     method: 'get',
//     url: urlService,
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${authToken}`,
//     },
//   };
//   console.log('Successfully configured axios for termsAndConditions endpoint!');
//   return config;
// };

// export const authServices = {
//   login,
//   otpValidate,
//   preSignUp,
//   updateUserInfoOnboarding,
//   updateUserCreatedInfo,
//   sendOtp,
//   preLogin,
//   createAccount,
//   getProfile,
//   updatePassword,
//   validateTermsAndConditions,
//   simplePrelogin,
//   getTermsAndConditions,
//   getBusinessList,
//   getCountries,
// };
