import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../styles/styles.css";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    login(data);
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
        <input
          className="input-field"
          type="email"
          {...register("email", { required: true })}
          placeholder="kevin@quantumpay.mx"
        />
        <input
          className="input-field"
          type="password"
          {...register("password", { required: true })}
          placeholder="**********"
        />
        <button className="login-button" type="submit">Login</button>
        <div className="login-links">
          <Link to="/forgot-password">Forgot Password?</Link>
          <Link to="/signup">Don't have an account? Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;