import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../styles/singup.css"; // Suponiendo que agregarás estilos en este archivo.

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const onSubmit = (data) => {
    console.log(data);
    navigate("/dashboard");
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        <h2>Sign Up</h2>
        {step === 1 && (
          <div className="form-step">
            <h2>Dinos tu correo electrónico</h2>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
              className="form-input"
            />
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Password"
              className="form-input"
            />
          </div>
        )}
        {step === 2 && (
          <div className="form-step">
            <h2>Información de la Empresa</h2>
            <input
              type="text"
              {...register("fullName", { required: true })}
              placeholder="Full Name"
              className="form-input"
            />
            <input
              type="date"
              {...register("dob", { required: true })}
              placeholder="Date of Birth"
              className="form-input"
            />
          </div>
        )}
        {step === 3 && (
          <div className="form-step">
            <h2>Domicilio</h2>
            <input
              type="text"
              {...register("fullName", { required: true })}
              placeholder="Full Name"
              className="form-input"
            />
            <input
              type="date"
              {...register("dob", { required: true })}
              placeholder="Date of Birth"
              className="form-input"
            />
          </div>
        )}
        {step === 4 && (
          <div className="form-step">
            <h2>Perfil Transaccional</h2>
            <input
              type="text"
              {...register("fullName", { required: true })}
              placeholder="Full Name"
              className="form-input"
            />
            <input
              type="date"
              {...register("dob", { required: true })}
              placeholder="Date of Birth"
              className="form-input"
            />
          </div>
        )}
         {step === 5 && (
          <div className="form-step">
            <h2>Representante Legal</h2>
            <input
              type="text"
              {...register("fullName", { required: true })}
              placeholder="Full Name"
              className="form-input"
            />
            <input
              type="date"
              {...register("dob", { required: true })}
              placeholder="Date of Birth"
              className="form-input"
            />
          </div>
        )}
        {step === 6 && (
          <div className="form-step">
            <h2>Estructura Accionaria</h2>
            <input
              type="text"
              {...register("fullName", { required: true })}
              placeholder="Full Name"
              className="form-input"
            />
            <input
              type="date"
              {...register("dob", { required: true })}
              placeholder="Date of Birth"
              className="form-input"
            />
          </div>
        )}
        {step === 7 && (
          <div className="form-step">
            <h2>Propietario Real</h2>
            <input
              type="text"
              {...register("fullName", { required: true })}
              placeholder="Full Name"
              className="form-input"
            />
            <input
              type="date"
              {...register("dob", { required: true })}
              placeholder="Date of Birth"
              className="form-input"
            />
          </div>
        )}
        {step === 8 && (
          <div className="form-step">
            <h2>Carga de Documentos</h2>
            <input
              type="text"
              {...register("fullName", { required: true })}
              placeholder="Full Name"
              className="form-input"
            />
            <input
              type="date"
              {...register("dob", { required: true })}
              placeholder="Date of Birth"
              className="form-input"
            />
          </div>
        )}
        <div className="form-navigation">
          {step > 1 && (
            <button
              type="button"
              className="nav-button"
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
          )}
          {step < 8 && (
            <button
              type="button"
              className="nav-button"
              onClick={() => setStep(step + 1)}
            >
              Next
            </button>
          )}
          {step === 8 && (
            <button type="submit" className="submit-button">
              Register
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Signup;
