import CryptoJS from 'crypto-js';


//environmet variables
//const consumerKey: string = 'lJb8nqGOFvAXwwLEm4cgvcA9OyQa';
//const tenant_name: string = 't/liverpool.com';

export function cryptoSignature(token: string, url: string) {
  //environmet variables
  const consumerKey: string = import.meta.env.VITE_CONSUMER_KEY;
  const tenant_name: string = import.meta.env.VITE_TENANT_NAME;
  // Init
  const mgtw = import.meta.env.VITE_MGTW;
  let targetUrl = url.trim();
  targetUrl =
    '/' +
    tenant_name +
    targetUrl.replace(new RegExp(`^${mgtw}/${tenant_name}`), '');
  const contentType = 'application/json';
  //configuration
  const config = {
    algorithm: 'hmac-sha256',
    secretkey: consumerKey,
    params: [targetUrl, contentType, token],
  };

  const newSignature = computeHttpSignature(config);
  return newSignature;
}

export function cryptoSignatureV2(body: string, url: string, timestamp: number) {
  console.log(">>>>> Using signature v2");

  //environmet variables
  const consumerKey: string = import.meta.env.VITE_CONSUMER_KEY;
  const tenant_name: string = import.meta.env.VITE_TENANT_NAME;
  // Init
  const mgtw = import.meta.env.VITE_MGTW;
  let targetUrl = url.trim();
  targetUrl =
    '/' +
    tenant_name +
    targetUrl.replace(new RegExp(`^${mgtw}/${tenant_name}`), '');
  //configuration
  console.log("targetUrl:",targetUrl);
  console.log("timestamp:",timestamp);

  const bodyJson = body;
  console.log("body:",bodyJson);

  const configVi = {
    algorithm : 'hmac-sha256',
    secretkey : consumerKey,
    params : [timestamp,targetUrl,body]
  };

  const newSignature = computeHttpSignatureV1(configVi);
  return newSignature;
}

function computeHttpSignature(config: any) {
  // compute sig here
  let signingBase = '';
  config.params.forEach(function (param: any) {
    signingBase += param + ';';
  });

  signingBase = signingBase.substring(0, signingBase.length - 1);

  const key = CryptoJS.enc.Utf8.parse(config.secretkey);
  const msg = CryptoJS.enc.Utf8.parse(signingBase);
  const encoded = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(msg, key));
  console.log('signature ', encoded);
  return encoded;
}

function computeHttpSignatureV1(config: any) {
  // compute sig here
  let signingBase = '';
  config.params.forEach(function(param: any){
    signingBase += param ;
  });

  console.log("signingBase : "+signingBase)
  const key = CryptoJS.enc.Utf8.parse(config.secretkey);
  const msg = CryptoJS.enc.Utf8.parse(signingBase);
  const encoded = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(msg, key));

  return encoded;
}
