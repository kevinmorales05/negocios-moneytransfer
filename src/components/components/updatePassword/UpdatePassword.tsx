import React, { useState } from "react";
import { useForm } from "react-hook-form";
import OtpModal from "../otpmodal/OtpModal"; // Asegúrate de importar el componente OtpModal
import "./UpdatePassword.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authSafeHook";

interface UpdatePasswordForm {
  newPassword: string;
  confirmPassword: string;
}

const UpdatePassword: React.FC = () => {
  const { register, handleSubmit, setError, reset } =
    useForm<UpdatePasswordForm>();
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [errorMessage] = useState("");
  const navigate = useNavigate();
  const { logout } = useAuth();

  const onSubmit = (data: UpdatePasswordForm) => {
    if (data.newPassword !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Las contraseñas no coinciden.",
      });
      return;
    }

    setShowOtpModal(true);
  };

  const handleOtpSubmit = (otpData: { otp: string }) => {
    // Aquí puedes manejar la lógica de validación del OTP
    console.log("OTP enviado:", otpData.otp);
    // Si la validación del OTP es correcta, puedes actualizar la contraseña aquí
    console.log("Contraseña actualizada.");
    logout(); //close session
    navigate("/login");

    reset(); // Limpiar el formulario después de actualizar
    setShowOtpModal(false);
  };

  return (
    <div className="update-password-container">
      <h2>Actualizar Contraseña</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Nueva Contraseña:</label>
        <input
          type="password"
          {...register("newPassword", { required: true })}
          placeholder="Ingrese nueva contraseña"
        />

        <label>Confirmar Contraseña:</label>
        <input
          type="password"
          {...register("confirmPassword", { required: true })}
          placeholder="Confirme su contraseña"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit" className="update-btn">
          Actualizar Contraseña
        </button>
      </form>

      <OtpModal
        showModal={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        onSubmit={handleOtpSubmit}
        errorMessage={errorMessage}
        onResend={() => console.log("OTP reenviado")}
      />
    </div>
  );
};

export default UpdatePassword;
