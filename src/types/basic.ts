export interface CoordinatesInterface {
    latitude: number,
    longitude: number
  }

  export interface AuthDataInterface {
    addressCity?: string;
    addressCountry?: string;
    addressExteriorNumber?: string;
    addressInteriorNumber?: string;
    addressLine1?: string;
    addressLine2?: string;
    addressState?: string;
    addressStreet?: string;
    addressSuburb?: string;
    addressZip?: string;
    birthState?: string;
    branchId?: string;
    curp?: string;
    dateOfBirth?: string;
    docNumber?: string;
    docType?: number;
    email?: string;
    gender?: number;
    isLogged?: boolean;
    isPreRegistered?: boolean;
    lastName?: string;
    leasedLine?: string;
    middleName?: string;
    mobilePhone?: string;
    msisdn?: string;
    name?: string;
    noticePrivacy?: boolean;
    password?: string;
    rfc?: string;
    secondLastName?: string;
    termsAndConditionsId?: string;
    authToken?: string;
    businessLine?: string;
    transactionalProfile?: CasherUserTransactionalProfile;
    accountType?: "Normal" | "Premium";
    deviceId? :string;
    premiumAccountCode?: string;
    beneficiaries?: CasherUserRegisterBeneficiaries[]
    referencedClients?: CasherUserPersonalInfo[], 
    nationality?: string;
    expiredLogin?: boolean;
    errorOnboarding?: "AurumUserAlreadyRegistered" | "CurpNotMatch";
  }
  export interface CasherUserTransactionalProfile {
    keyResourceOrigin: number,
    keyResourceDestination: number,
    accountUse: string,
    keyMonthlyDepositTransfers: number,
    keyMonthlyDepositAmounts: number,
    keyMonthlyWithdrawalTransfers: number,
    keyMonthlyWithdrawalAmounts: number
 }
 export interface CasherUserAccountType {
    type: 1 | 2;
 }
 export interface CasherUserAccountData {
    accountEmail: string
    accountPassword: string
    accountPasswordUpdate: string
 }
 export interface CasherUserRegisterBeneficiaries {
    fullName: string;
    percentage: number
 }

 export interface CasherUserPersonalInfo {
    name: string;
    middleName: string;
    lastName: string;
    secondLastName: string;
    birthDate: string;
    gender: number;
    curp: string;
    rfc: string;
    phone: string;
 }