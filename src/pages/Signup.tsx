import "../styles/singup.css"; // Suponiendo que agregarás estilos en este archivo.
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { StepOne } from "../components/steps/step1/step1";
import { StepTwo } from "../components/steps/step2/step2";
import { StepThree } from "../components/steps/step3/step3";
import { StepFour } from "../components/steps/step4/step4";
import { StepFive } from "../components/steps/step5/step5";
import StepAccionistas from "../components/steps/step6/step6";
import { StepCargaDocumentos } from "../components/steps/step7/step7";
import {
  AuthDataInterface,
  CoordinatesInterface,
  LogoutRequest,
} from "../types/basic";
import {
  BusinessInfo,
  preSingUp,
  registerUser,
  simpleLogin,
  updateUserInfo,
  validateOTP,
} from "../services/aurumcore/onboarding";
import ModalComponent from "../components/components/ModalComponent";
import {
  AddresDataInterface,
  Beneficiary,
  IndicatorRequest,
  IndicatorValue,
  PersonalDataInterface,
  registerAddress,
  registerBeneficiaries,
  RegisterBeneficiariesRequest,
  registerPersonalInfo,
  RegisterProfilePayload,
  registerTransactionalProfile,
  registerUserAccount,
  TransactionProfile,
  updateIndicator,
} from "@/services/kuhnipay/onboardingkuhnipay";
import { delay, generateUniqueId, getGeolocation } from "@/utils/functions";
import { logoutUser } from "@/services/kuhnipay/auth";
import { Loader } from "@chakra-ui/react";
import { StepThreeMock } from "@/components/steps/step3/step3conmock";
import { StepFiveMock } from "@/components/steps/step5/step5dynamic";
import { baseCompany, Empresa } from "@/types/onboarding";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    trigger,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      accionistas: [
        { nombre: "", rfc: "", porcentaje: "", capital: "", pep: "" },
      ],
    },
  });
  const [token, setToken] = useState("");

  const [coordinates, setCoordinates] = useState<CoordinatesInterface>({
    latitude: 90,
    longitude: 90,
  });

  const [userInfo, setUserInfo] = useState<Empresa>(baseCompany); //data to use
  const [deviceIDcreated, setDeviceIDcreated] = useState<string>("");
  // user device id
  //loading modal
  const [loading, setLoading] = useState(false);
  //open modal
  const [isOpen, setIsOpen] = useState(false);
  //onclose modal
  const closeModal = () => setIsOpen(false); //medio correo o sms
  const [medio, setMedio] = useState("correo");
  // correo o telefono
  const [destino, setDestino] = useState("ejemplo@gmail.com");
  //titulo modal
  const [titleText, setTitleText] = useState("Valida tu correo");

  //modal to activate account SMS
  const [isOpenSMS, setIsOpenSMS] = useState(false);
  //onclose modal
  const closeModalSMS = () => setIsOpenSMS(false); //medio correo o sms
  const [medio2, setMedio2] = useState("teléfono");
  // correo o telefono
  const [destino2, setDestino2] = useState("5432345678");
  //titulo modal
  const [titleText2, setTitleText2] = useState("Valida tu teléfono");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "accionistas",
  });

  const accionistas = watch("accionistas");
  //get geolocation
  useEffect(() => {
    getGeolocation()
      .then((coords) => {
        setCoordinates(coords);
        console.log("this are the coordinates ", coords);
      })
      .catch((error) => console.error(error.message));
  }, []);

  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps: number = 7;

  //valida los campos cada vez que salta a otro paso
  const nextStep = async () => {
    const valid = await trigger(); // Valida todos los campos del formulario
    const datosParciales = getValues();
    console.log("datos parciales del formulario ", datosParciales);
    if (step === 6) {
      if (!validarPorcentaje()) {
        alert("El porcentaje total debe ser 100%");
        return;
      }
    }

    console.log("validando campos ", valid);
    if (valid) {
      setStep((prev) => (prev < totalSteps ? prev + 1 : prev));
    }
  };
  //permite navegar hacia atrás
  const prevStep = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  //valida el porcentaje de los accionistas
  const validarPorcentaje = () => {
    const total = accionistas.reduce(
      (sum, acc) => sum + Number(acc.porcentaje || 0),
      0
    );
    return total === 100;
  };

  const onSubmit = async (data: Empresa) => {
    console.log("informacion a procesar", data);
    setUserInfo(data);
    //setIsOpen(true);
    const deviceID = generateUniqueId();
    setDeviceIDcreated(deviceID);
    try {
      const user: AuthDataInterface = {
        email: data.email,
        password: data.password,
      };
      const response = await preSingUp(user, coordinates);
      console.log("Response from preloginAction", JSON.stringify(response));
      console.log("Token to process ", response.access_token);
      setToken(response.access_token);
      //register personalizaed account
      try {
        const responseregisterkuhni = await registerUserAccount(
          { email: data.email, password: data.password },
          deviceID,
          coordinates.latitude.toString(),
          coordinates.longitude.toString(),
          response.access_token
        );
        console.log(
          "this is the response register kuhnipay ",
          responseregisterkuhni
        );
        //register personal info kuhni
        try {
          const personalInfo: PersonalDataInterface = {
            name: data.name,
            middleName: "",
            lastName: data.lastName,
            secondLastName: data.secondLastName,
            birthDate: data.stablishmentDate,
            gender: data.genero,
            curp: data.curp,
            rfc: data.rfc,
            phone: data.mobilePhone,
            accessToken: response.access_token,
          };
          const responsepersonalinfo = await registerPersonalInfo(
            personalInfo,
            deviceID,
            coordinates.latitude.toString(),
            coordinates.longitude.toString(),
            response.access_token
          );
          console.log("response personal info service ", responsepersonalinfo);
          //register addres kuhni
          try {
            const addressInfo: AddresDataInterface = {
              street: data.addressLine1,
              internalNumber: data.addressInteriorNumber,
              externalNumber: data.addressExteriorNumber,
              postalCode: data.addressZip,
              cityName: data.addressCity,
              stateName: data.addressStateCode,
              suburbName: data.colonia,
            };
            const responseraddress = await registerAddress(
              addressInfo,
              deviceID,
              coordinates.latitude.toString(),
              coordinates.longitude.toString(),
              response.access_token
            );
            console.log("response address info service ", responseraddress);
            const beneficiariesFormat: Beneficiary[] = [];

            data.accionistas.map((accionista) => {
              const newBeneficiary: Beneficiary = {
                fullName: accionista.nombre,
                percentage: accionista.porcentaje,
              };
              beneficiariesFormat.push(newBeneficiary);
            });
            //register beneficiaries
            try {
              const dataBeneficiaries: RegisterBeneficiariesRequest = {
                appVersion: "1.0.0",
                latitude: coordinates.latitude.toString(),
                longitude: coordinates.longitude.toString(),
                deviceId: deviceID,
                msisdn: data.telefono,
                beneficiariesData: beneficiariesFormat,
              };
              const responsebeneficiaries = await registerBeneficiaries(
                dataBeneficiaries,
                response.access_token
              );
              console.log(
                "response of adding beneficiaries ",
                responsebeneficiaries
              );
              try {
                //register transactional profile
                const transactionalprofile: TransactionProfile = {
                  keyResourceOrigin: data.keyResourceOrigin,
                  keyResourceDestination: data.keyResourceDestination,
                  accountUse: "Cuenta de Ahorro",
                  keyMonthlyDepositTransfers: data.keyMonthlyDepositTransfers,
                  keyMonthlyDepositAmounts: data.keyMonthlyDepositAmounts,
                  keyMonthlyWithdrawalTransfers:
                    data.keyMonthlyWithdrawalTransfers,
                  keyMonthlyWithdrawalAmounts: data.keyMonthlyWithdrawalAmounts,
                };
                const registerProfile: RegisterProfilePayload = {
                  appVersion: "1.0.0",
                  latitude: coordinates.latitude.toString(),
                  longitude: coordinates.longitude.toString(),
                  deviceId: deviceID,
                  transactionProfile: transactionalprofile,
                };
                const responsetransactionalProfile =
                  await registerTransactionalProfile(
                    registerProfile,
                    response.access_token
                  );
                console.log(
                  "response register transaction profile! ",
                  responsetransactionalProfile
                );
                //register User in Aurum Core
                try {
                  const userData: AuthDataInterface = {
                    email: data.email,
                    password: data.password,
                  };
                  const responseaurumregister = await registerUser(
                    userData,
                    response.access_token
                  );
                  console.log(
                    "Response de aurum registro ",
                    responseaurumregister
                  );
                  //update indicator ACCOUNT_CREATION
                  try {
                    const indicatorRequest: IndicatorRequest = {
                      appVersion: "1.0.0",
                      latitude: coordinates.latitude.toString(),
                      longitude: coordinates.longitude.toString(),
                      deviceId: deviceID,
                      indicatorName: IndicatorValue.ACCOUNT_CREATION,
                      indicatorValue: true,
                    };
                    const responseRegistrokuhni = await updateIndicator(
                      indicatorRequest,
                      response.access_token
                    );
                    console.log(
                      "response account creation ",
                      responseRegistrokuhni
                    );
                    //open modal to validate OTP
                    setIsOpen(true);
                  } catch (error) {
                    console.log("Error indicator register account", error);
                  }
                } catch (error) {
                  console.log("Error registring user in aurumcore ", error);
                }
              } catch (error) {
                console.log(
                  "Error registring transacctional profile in kuhni ",
                  error
                );
              }
            } catch (error) {
              console.log("Error registring beneficiaries in kuhni ", error);
            }
          } catch (error) {
            console.log("Error registring address info in kuhni ", error);
          }
        } catch (error) {
          console.log("Error registring personal info in kuhni ", error);
        }
      } catch (error) {
        console.log("Error registring the user in kuhni ", error);
      }
      try {
        const response2 = await registerUser(user, response.access_token);
        console.log("Response from preloginAction", JSON.stringify(response));
        console.log("Register User ", response2);
        if (response2.responseCode === "0") {
          console.log("Account created successfully");
          try {
            const response3 = await simpleLogin(user, coordinates);
            console.log("Response from simpleLogin", JSON.stringify(response3));
            console.log(
              "Token to process simple login token ",
              response3.access_token
            );
            //seteo token para validar OTP
            setToken(response3.access_token);
            //show modal
            setIsOpen(true);
          } catch (error) {
            console.log("Error relogin the user");
          }
        } else {
          console.log("Error creating your account!");
        }
      } catch (error) {
        console.log("this is the error registering a new user ", error);
      }
    } catch (error: any) {
      console.log("this is the response code, errror ", error);
    }
  };
  const sendOTP = async (data) => {
    console.log("data disponible desde validación de otp, otp", data);
    setLoading(true);

    try {
      //login to update the session token
      const newUserinfo: AuthDataInterface = {
        email: userInfo ? userInfo.email : "",
        password: userInfo ? userInfo.password : "",
      };
      const responselogin = await simpleLogin(newUserinfo, coordinates);
      console.log("new session token ", responselogin.sessionToken);
      setToken(responselogin.sessionToken);
      try {
        //validate email to create account and preactivate
        const response = await validateOTP(
          data.otp,
          token ? responselogin.sessionToken : ""
        );
        console.log("Response from preloginAction", JSON.stringify(response));
        console.log("Resultado validacion de otp ", response.responseMessage);
        //validate indicator IDENTITY_VALIDATION
        try {
          const indicatorRequest: IndicatorRequest = {
            appVersion: "1.0.0",
            latitude: coordinates.latitude.toString(),
            longitude: coordinates.longitude.toString(),
            deviceId: deviceIDcreated,
            indicatorName: IndicatorValue.IDENTITY_VALIDATION,
            indicatorValue: true,
          };
          const responseRegistrokuhni = await updateIndicator(
            indicatorRequest,
            response.access_token
          );
          console.log("response identity validation ", responseRegistrokuhni);
          try {
            //update validate otp by email
            const indicatorRequest2: IndicatorRequest = {
              appVersion: "1.0.0",
              latitude: coordinates.latitude.toString(),
              longitude: coordinates.longitude.toString(),
              deviceId: deviceIDcreated,
              indicatorName: IndicatorValue.OTP_VALIDATED_BY_EMAIL,
              indicatorValue: true,
            };
            const responseRegistrokuhni = await updateIndicator(
              indicatorRequest2,
              response.access_token
            );
            console.log(
              "response otp validated by email ",
              responseRegistrokuhni
            );
            try {
              //update indicator terms and conditions
              const indicatorRequest3: IndicatorRequest = {
                appVersion: "1.0.0",
                latitude: coordinates.latitude.toString(),
                longitude: coordinates.longitude.toString(),
                deviceId: deviceIDcreated,
                indicatorName: IndicatorValue.TERMS_AND_CONDITIONS,
                indicatorValue: true,
              };
              const responseRegistrokuhni = await updateIndicator(
                indicatorRequest3,
                response.access_token
              );
              console.log(
                "response accept validate terms and conditions ",
                responseRegistrokuhni
              );
              //----- SUPER IMPORTANT ---- updateUserInfo AURUM CORE

              try {
                const userdata: BusinessInfo = {
                  businessName: userInfo?.businessname,
                  stablishmentDate: userInfo?.stablishmentDate,
                  msisdn: userInfo?.mobilePhone,
                  addressLine1: userInfo?.addressLine1,
                  addressLine2: userInfo?.addressLine2,
                  addressExteriorNumber: userInfo?.addressExteriorNumber,
                  addressInteriorNumber: userInfo?.addressInteriorNumber,
                  addressIntersections: "",
                  addressSuburb: userInfo?.colonia,
                  addressCity: userInfo?.addressCity,
                  addressState: userInfo?.addressState,
                  addressCountry: userInfo?.addressCountry,
                  addressZip: userInfo?.addressZip,
                  mobilePhone: userInfo?.mobilePhone,
                  leasedLine: userInfo?.mobilePhone,
                  businessLine: userInfo.businessLine,
                  docType: "1",
                  docNumber: "12123222",
                  rfc: userInfo?.rfc,
                  curp: userInfo?.curp,
                  federalInstrumentDocument: "",
                  publicInstrumentDocument: "",
                  taxIdentificationCardImage: "",
                  advancedElectronicSignatureProofImage: "",
                  advancedElectronicSignatureSerialNumber: "",
                  otpMsisdn: "",
                  name: userInfo.businessname,
                  lastName: "",
                  risk: {
                    level: 0,
                  },
                };
                const responseUpdateInfo = await updateUserInfo(
                  userdata,
                  response.access_token
                );
                console.log(
                  "update info result ---send otp ",
                  responseUpdateInfo
                );
                setLoading(false);
                setIsOpen(false);
                closeModal();
                //open modal to validate OTP for SMS and activate account in STP
                setIsOpenSMS(true);
              } catch (error) {}
            } catch (error) {
              console.log("update indicator terms and conditions ", error);
            }
          } catch (error) {
            console.log(
              "error updating indicator OTP_VALIDATED_BY_EMAIL ",
              error
            );
          }
        } catch (error) {
          console.log("Error indicator identity validation", error);
        }
        setIsOpen(false);
      } catch (error) {
        console.error("Error en la conexión", error);
      }
    } catch (error) {
      console.log("Response from simple login", error);
    }
  };
  const sendOTPSMSM = async (data) => {
    console.log("data disponible desde validación de otp", data);
    setLoading(true);
    setIsOpen(false);

    try {
      const response = await validateOTP(data.otp, token);
      console.log("Response from preloginAction", JSON.stringify(response));
      console.log("Resultado validacion de otp ", response.responseMessage);

      try {
        //account validation
        const indicatorRequest: IndicatorRequest = {
          appVersion: "1.0.0",
          latitude: coordinates.latitude.toString(),
          longitude: coordinates.longitude.toString(),
          deviceId: deviceIDcreated,
          indicatorName: IndicatorValue.ACCOUNT_ACTIVATION,
          indicatorValue: true,
        };
        const responseRegistrokuhni = await updateIndicator(
          indicatorRequest,
          response.access_token
        );
        console.log("response account activation ", responseRegistrokuhni);
        ///1. subir documentos to S3

        ///2. upload documents to a database

        //3. logout
        try {
          const logoutrequest: LogoutRequest = {
            appVersion: "1.0.0",
            latitude: coordinates.latitude.toString(),
            longitude: coordinates.longitude.toString(),
            deviceId: deviceIDcreated,
            userToken: token,
            username: userInfo ? userInfo?.email : "",
          };
          const logoutResponse = await logoutUser(logoutrequest, token);
          console.log("response logout ", logoutResponse);
        } catch (error) {
          console.log("error login out ", error);
        }
      } catch (error) {
        console.log("Error indicator identity validation", error);
      }
    } catch (error) {
      console.error("Error en la conexión", error);
    }
    setLoading(false);
  };

  // const onSubmit = async (data) => {
  //   setLoading(true);
  //   console.log("data from forms", data);
  //   await delay(5000); // Espera 5 segundos antes de hacer la solicitud
  //   setLoading(false);
  //   setUserInfo(data);
  //   setIsOpen(true);
  // };
  // const sendOTP = async () => {
  //   closeModal();
  //   setLoading(true);
  //   await delay(5000); // Espera 5 segundos antes de hacer la solicitud

  //   setLoading(false);
  //   setIsOpenSMS(true);
  // };
  // const sendOTPSMSM = async () => {
  //   closeModalSMS();
  //   setLoading(true);
  //   await delay(5000); // Espera 5 segundos antes de hacer la solicitud

  //   setLoading(false);
  //   navigate("/success");
  // };
  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        <h2>Sign Up</h2>
        {step === 1 && (
          <StepOne register={register} errors={errors} watch={watch} />
        )}
        {step === 2 && <StepTwo register={register} errors={errors} />}

        {step === 3 && (
          <StepThreeMock
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
        )}
        {step === 4 && <StepFour register={register} errors={errors} />}

        {step === 5 && (
          <StepFiveMock
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
        )}

        {step === 6 && (
          <StepAccionistas
            register={register}
            errors={errors}
            fields={fields}
            append={append}
            remove={remove}
            watch={watch}
          />
        )}
        {step === 7 && (
          <StepCargaDocumentos register={register} errors={errors} />
        )}
        <div className="form-navigation">
          {step > 1 && (
            <button type="button" className="nav-button" onClick={prevStep}>
              Anterior
            </button>
          )}
          {step < totalSteps && (
            <button type="button" className="nav-button" onClick={nextStep}>
              Siguiente
            </button>
          )}
          {step === totalSteps && (
            <button type="submit" className="submit-button">
              Enviar
            </button>
          )}
        </div>
      </form>
      {loading ? (
        <>
          <Loader color="pink" size="300px" />
        </>
      ) : (
        <></>
      )}

      <ModalComponent
        isOpen={isOpen}
        onClose={closeModal}
        token={token}
        sendOTP={sendOTP}
        titleText={titleText}
        destino={destino}
        medio={medio}
      />
      <ModalComponent
        isOpen={isOpenSMS}
        onClose={closeModalSMS}
        token={token}
        sendOTP={sendOTPSMSM}
        titleText={titleText2}
        destino={destino2}
        medio={medio2}
      />
    </div>
  );
};

export default Signup;
