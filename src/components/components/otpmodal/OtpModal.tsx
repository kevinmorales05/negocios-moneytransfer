import React from "react";
import { useForm } from "react-hook-form";
import './OtpModal.css';

interface OtpModalProps {
  showModal: boolean;
  onClose: () => void;
  onSubmit: (data: { otp: string }) => void;
  errorMessage?: string;
  onResend: () => void;
}

const OtpModal: React.FC<OtpModalProps> = ({ showModal, onClose, onSubmit, errorMessage, onResend }) => {
  const { register, handleSubmit, reset } = useForm<{ otp: string }>();

  const handleOtpSubmit = (data: { otp: string }) => {

    onSubmit(data);
    reset(); // Limpiar el formulario después de enviar
  };

  if (!showModal) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Verificación de OTP</h3>
        <form onSubmit={handleSubmit(handleOtpSubmit)}>
          <input
            type="text"
            {...register("otp", { required: true })}
            placeholder="Ingrese el OTP"
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="modal-buttons">
            <button type="submit" className="confirm-btn">Enviar OTP</button>
            <button type="button" onClick={onResend} className="resend-btn">Reenviar OTP</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpModal;
