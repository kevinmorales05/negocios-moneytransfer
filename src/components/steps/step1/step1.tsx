import { useState } from "react";
import "../../../styles/singup.css";
import { StepsProps } from "../types";



export const StepOne: React.FC<StepsProps> = ({ register, errors, watch }) => {
  const [showPassword, setShowPassword] = useState(false);
  const passwordValue = watch("password");

  return (
    <div className="form-step">
      <h2>Dinos tu correo electrónico</h2>

      <label>Correo</label>
      <input
        type="email"
        {...register("email", { required: "El correo es obligatorio" })}
        placeholder="Email"
        className="form-input"
      />
      {errors.email && <span>{errors.email.message}</span>}

      <label>Confirmar correo</label>
      <input
        type="email"
        {...register("confirmEmail", {
          required: "Confirmar el correo es obligatorio",
        })}
        placeholder="Confirmar Email"
        className="form-input"
      />
      {errors.confirmEmail && <span>{errors.confirmEmail.message}</span>}

      <label>Contraseña</label>
      <div className="password-container">
        <input
          type={showPassword ? "text" : "password"}
          {...register("password", {
            required: "La contraseña es obligatoria",
            pattern: {
              value: /^(?!.*(\d{3,}))[A-Za-z\d]{8,}$/,
              message:
                "Debe tener al menos 8 caracteres, una mayúscula y un número. No se permiten caracteres especiales ni secuencias de números.",
            },
            validate: {
              hasUppercase: (value) =>
                /[A-Z]/.test(value) || "Debe contener al menos una mayúscula.",
              hasNumber: (value) =>
                /\d/.test(value) || "Debe contener al menos un número.",
            },
          })}
          placeholder="Password"
          className="form-input"
        />
        <button
          type="button"
          className="toggle-password"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>
      {errors.password && <span>{errors.password.message}</span>}

      <label>Confirmar Contraseña</label>
      <div className="password-container">
        <input
          type={showPassword ? "text" : "password"}
          {...register("confirmPassword", {
            required: "Confirmar la contraseña es obligatorio",
            validate: (value) =>
              value === passwordValue || "Las contraseñas no coinciden.",
          })}
          placeholder="Confirmar contraseña"
          className="form-input"
        />
        <button
          type="button"
          className="toggle-password"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>
      {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
    </div>
  );
};
