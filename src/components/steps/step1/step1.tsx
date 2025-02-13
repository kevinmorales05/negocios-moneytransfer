import "../../../styles/singup.css";
import { UseFormRegister, FieldErrors } from "react-hook-form";

export const StepOne = ({ register, errors }) => (
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
    <input
      type="password"
      {...register("password", { required: "La contraseña es obligatoria" })}
      placeholder="Password"
      className="form-input"
    />
    {errors.password && <span>{errors.password.message}</span>}

    <label>Confirmar Contraseña</label>
    <input
      type="password"
      {...register("confirmPassword", {
        required: "Confirmar la contraseña es obligatorio",
      })}
      placeholder="Confirmar contraseña"
      className="form-input"
    />
    {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
  </div>
);
