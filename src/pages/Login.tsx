import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import "../styles/styles.css";
import { useAuth } from "@/context/authSafeHook";
import { User } from "@/context/types";
import { preSingUp } from "@/services/aurumcore/onboarding";
import { AuthDataInterface, CoordinatesInterface } from "@/types/basic";
import {
  authenticateUser,
  AuthPayload,
  getUserProfile,
} from "@/services/kuhnipay/loggedservices";
import { getGeolocation } from "@/utils/functions";
import { useEffect, useState } from "react";

// Define the type for the form inputs
interface LoginFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [coordinates, setCoordinates] = useState<CoordinatesInterface>({
    latitude: 90,
    longitude: 90,
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    //temporally before login integration

    const dataToGenerateToken: AuthDataInterface = {
      email: data.email,
      password: data.password,
    };
    //prelogin to get a session token
    // try {
    //   const responseToken = await preSingUp(dataToGenerateToken, coordinates);
    //   if (responseToken) {
    //     console.log("token de respuesta ", responseToken.access_token);
    //     const payload: AuthPayload = {
    //       appVersion: "1.0.0",
    //       latitude: coordinates.latitude.toString(),
    //       longitude: coordinates.longitude.toString(),
    //       deviceId: "ZABBCCDDEEFFGG001-A100-B200-C3004",
    //       data: {
    //         password: data.password,
    //         scope:
    //           "use_otp update_info_scope use_accounts use_payments use_profile use_cards",
    //         username: data.email,
    //         zoneId: "GMT-6",
    //       },
    //     };
    //     //authentication of the user
    //     try {
    //       const responseSession = await authenticateUser(
    //         payload,
    //         responseToken.access_token
    //       );
    //       if (responseSession.access_token) {
    //         console.log(
    //           "the session was created ",
    //           responseSession.access_token
    //         );
    //         //obtener informacion del perfil

    //         const LoggedInfo = await getUserProfile(responseToken.access_token);
    //         console.log("logged result ", LoggedInfo);
    //         if (LoggedInfo.success) {
    //           const setDataLogin: User = {
    //             id: "1",
    //             name: LoggedInfo.result.data.businessName,
    //             email: data.email,
    //           };
    //           //seteo usuario con informacion basica
    //           login(setDataLogin, responseSession.access_token); // Ensure `login` accepts these parameters
    //           //move to the dashboard
    //           navigate("/dashboard");
    //         }
    //       }
    //     } catch (error) {
    //       console.log("Este es el error al momento de realizar login ", error);
    //     }
    //   }
    // } catch (error) {
    //   console.log("Error al momento de realizar el prelogin ", error);
    // }
    const setDataLogin: User = {
      id: "1",
      name: data.email,
      email: data.email,
    };
    //seteo usuario con informacion basica
    login(setDataLogin, "token de prueba");
    navigate("/dashboard");
  };

  //get geolocation
  useEffect(() => {
    getGeolocation()
      .then((coords) => {
        setCoordinates(coords);
        console.log("this are the coordinates ", coords);
      })
      .catch((error) => console.error(error.message));
  }, []);
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
        <input
          className="input-field"
          type="email"
          {...register("email", { required: "Email is required" })}
          placeholder="kevin@quantumpay.mx"
        />
        <input
          className="input-field"
          type="password"
          {...register("password", { required: "Password is required" })}
          placeholder="Escribe tu contraseña"
        />
        <button className="login-button" type="submit">
          Login
        </button>
        <div className="login-links">
          <Link to="/forgot-password">Forgot Password?</Link>
          <Link to="/signup">Don't have an account? Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
