import "../styles/singup.css"; // Suponiendo que agregarás estilos en este archivo.
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { StepOne } from "../components/steps/step1/step1";
import { StepTwo } from "../components/steps/step2/step2";
import { StepThree } from "../components/steps/step3/step3";
import { StepFour } from "../components/steps/step4/step4";
import { StepFive } from "../components/steps/step5/step5";
import StepAccionistas from "../components/steps/step6/step6";
import { StepCargaDocumentos } from "../components/steps/step7/step7";
import { AuthDataInterface, CoordinatesInterface } from "../types/basic";
import {
  preSingUp,
  registerUser,
  simpleLogin,
  validateOTP,
} from "../services/aurumcore/onboarding";
import ModalComponent from "../components/components/ModalComponent";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      accionistas: [
        { nombre: "", rfc: "", porcentaje: "", capital: "", pep: "" },
      ],
    },
  });
  const [token, setToken] = useState('');

  const [userInfo, setUserInfo] = useState(null);
  //loading modal
  const [loading, setLoading] = useState(false);
  //open modal
  const [isOpen, setIsOpen] = useState(false);
  //onclose modal
  const closeModal = () => setIsOpen(false);  //medio correo o sms
  const [medio, setMedio] = useState('correo');
  // correo o telefono
  const [destino, setDestino] = useState('ejemplo@gmail.com');
  //titulo modal
  const [titleText, setTitleText] = useState('Valida tu correo');

  //modal to activate account SMS
  const [isOpenSMS, setIsOpenSMS] = useState(false);
  //onclose modal
  const closeModalSMS = () => setIsOpenSMS(false);  //medio correo o sms
  const [medio2, setMedio2] = useState('teléfono');
  // correo o telefono
  const [destino2, setDestino2] = useState('5432345678');
  //titulo modal
  const [titleText2, setTitleText2] = useState('Valida tu teléfono');

  const { fields, append, remove } = useFieldArray({
    control,
    name: "accionistas",
  });

  const accionistas = watch("accionistas");

  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps: number = 7;

  //valida los campos cada vez que salta a otro paso
  const nextStep = async () => {
    const valid = await trigger(); // Valida todos los campos del formulario
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

  const onSubmit = async (data) => {
    console.log("informacion a procesar", data);
    setUserInfo(data);
    setIsOpen(true);
    // try {
    //   const user: AuthDataInterface = {
    //     email: "",
    //     password: "",
    //   };
    //   const coordinates: CoordinatesInterface = {
    //     latitude: 89,
    //     longitude: 30,
    //   };
    //   const response = await preSingUp(user, coordinates);
    //   console.log("Response from preloginAction", JSON.stringify(response));
    //   console.log("Token to process ", response.access_token);
    //   try {
    //     const response2 = await registerUser(user, response.access_token);
    //     console.log("Response from preloginAction", JSON.stringify(response));
    //     console.log("Register User ", response2);
    //     if (response2.responseCode === "0") {
    //       console.log("Account created successfully");
    //       try {
    //         const response3 = await simpleLogin(user, coordinates);
    //         console.log("Response from simpleLogin", JSON.stringify(response3));
    //         console.log("Token to process simple login token ", response3.access_token);
    //         //seteo token para validar OTP
    //         setToken(response3.access_token);
    //         //show modal
    //         setIsOpen(true);

    //       } catch (error) {
    //         console.log("Error relogin the user");
    //       }
    //     } else {
    //       console.log("Error creating your account!");
    //     }
    //   } catch (error) {
    //     console.log("this is the error registering a new user ", error);
    //   }
    // } catch (error: any) {
    //   console.log("this is the response code, errror ", error);
    // }
    // //1. realizar un login con credentials de signup
    // //2. realizar un registro de cuenta para obtener
    // if (!validarPorcentaje()) {
    //   alert("El porcentaje total debe ser 100%");
    //   return;
    // }
    //if everything is ok goes to the next step
    //navigate("/dashboard");
  };
  const sendOTP = async (data) => {
    console.log("data disponible desde validación de otp", data);
    setLoading(true);
    setIsOpen(false);
    try {
      const response = await validateOTP(data.otp, token);
            console.log("Response from preloginAction", JSON.stringify(response));
            console.log("Resultado validacion de otp ", response.responseMessage);
    } catch (error) {
      console.error("Error en la conexión", error);
    }
    setLoading(false);
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        <h2>Sign Up</h2>
        {step === 1 && <StepOne register={register} errors={errors} />}
        {step === 2 && <StepTwo register={register} errors={errors} />}

        {step === 3 && <StepThree register={register} errors={errors} />}
        {step === 4 && <StepFour register={register} errors={errors} />}

        {step === 5 && <StepFive register={register} errors={errors} />}

        {step === 6 && (
          <StepAccionistas
            register={register}
            errors={errors}
            fields={fields}
            append={append}
            remove={remove}
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
      <ModalComponent isOpen={isOpen} onClose={closeModal} token={token} sendOTP={sendOTP} titleText={titleText} destino={destino} medio={medio}/>
      <ModalComponent isOpen={isOpenSMS} onClose={closeModalSMS} token={token} sendOTP={sendOTP} titleText={titleText2} destino={destino2} medio={medio2}/>
    </div>
  );
};

export default Signup;
