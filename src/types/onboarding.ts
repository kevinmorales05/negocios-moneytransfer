export interface Accionista {
    nombre: string;
    rfc: string;
    porcentaje: string;
    capital: string;
    pep?: string;
    apellido: string;
    esPEP?: string;
    detallePEP?: string;
  }
  
  export interface Documento {
    [key: string]: any;
  }
  
  export interface Empresa {
    accionistas: Accionista[];
    name: string;
    lastName: string;
    secondLastName: string;
    reprfc: string;
    curp: string;
    repaddressZip: string;
    repaddressState: string;
    repaddressStateCode: string;
    repaddressCity: string;
    repaddressCityCode: string;
    repcolonia: string;
    repaddressCountry: string;
    reptelephone: string;
    repemail: string;
    charge: string;
    genero: string;
    repbrithday: string;
    repdocumentoIdentificacion: Documento;
    keyResourceOrigin: string;
    keyResourceDestination: string;
    keyMonthlyWithdrawalTransfers: string;
    keyMonthlyWithdrawalAmounts: string;
    keyMonthlyDepositTransfers: string;
    keyMonthlyDepositAmounts: string;
    monthlyincome: string;
    monthlyexpend: string;
    addressLine1: string;
    addressLine2: string;
    addressExteriorNumber: string;
    addressInteriorNumber: string;
    addressZip: string;
    addressState: string;
    addressStateCode: string;
    addressCity: string;
    addressCityCode: string;
    colonia: string;
    addressCountry: string;
    businessname: string;
    serienumber: string;
    rfc: string;
    numerofiscal: string;
    businessline: string;
    stablishmentDate: string;
    mobilePhone: string;
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
    tieneMasDeCuatro: string;
    documentoExistenciaCompania: Documento;
    identificacionCompania: Documento;
    companiaComprobanteDomicilio: Documento;
    documentoPoderRepLegal: Documento;
  }
  
export const baseCompany: Empresa = {
    accionistas: [],
    name: "",
    lastName: "",
    secondLastName: "",
    reprfc: "",
    curp: "",
    repaddressZip: "",
    repaddressState: "",
    repaddressStateCode: "",
    repaddressCity: "",
    repaddressCityCode: "",
    repcolonia: "",
    repaddressCountry: "",
    reptelephone: "",
    repemail: "",
    charge: "",
    genero: "",
    repbrithday: "",
    repdocumentoIdentificacion: {},
    keyResourceOrigin: "",
    keyResourceDestination: "",
    keyMonthlyWithdrawalTransfers: "",
    keyMonthlyWithdrawalAmounts: "",
    keyMonthlyDepositTransfers: "",
    keyMonthlyDepositAmounts: "",
    monthlyincome: "",
    monthlyexpend: "",
    addressLine1: "",
    addressLine2: "",
    addressExteriorNumber: "",
    addressInteriorNumber: "",
    addressZip: "",
    addressState: "",
    addressStateCode: "",
    addressCity: "",
    addressCityCode: "",
    colonia: "",
    addressCountry: "",
    businessname: "",
    serienumber: "",
    rfc: "",
    numerofiscal: "",
    businessline: "",
    stablishmentDate: "",
    mobilePhone: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    tieneMasDeCuatro: "",
    documentoExistenciaCompania: {},
    identificacionCompania: {},
    companiaComprobanteDomicilio: {},
    documentoPoderRepLegal: {},
  }
  