import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import "../styles/styles.css";
import { useAuth } from "@/context/authSafeHook";
import { User } from "@/context/types";

// Define the type for the form inputs
interface LoginFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    //temporally before login integration
    const setDataLogin: User = {
      id: "1",
      name: "Kevin Morales",
      email: data.email,
    };
    login(setDataLogin, "token"); // Ensure `login` accepts these parameters
    navigate("/dashboard");
  };

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
          placeholder="**********"
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
