import { useState } from "react";
import { useForm } from "react-hook-form";
import "./ModalComponent.css"; 

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  token: string;
  titleText: string;
  destino: string;
  medio: string;
  sendOTP: any;
}

export default function ModalComponent({
  isOpen,
  onClose,
  token,
  titleText,
  destino,
  medio,
  sendOTP,
}: ModalComponentProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{titleText}</h2>
          <button onClick={onClose} className="modal-close-button">
            ×
          </button>
        </div>
        <div className="modal-body">
          <label>
            Hemos enviado un código al {medio} {destino}
          </label>
          <input
            type="text"
            {...register("otp", { required: "El OTP es requerido" })}
            className="modal-input"
          />
          {errors.otp && <p className="error-message">{errors.otp.message}</p>}
        </div>
        <div className="modal-footer">
          <button onClick={onClose} disabled={loading} className="modal-cancel-button">
            Cancelar
          </button>
          <button
            onClick={handleSubmit(sendOTP)}
            disabled={loading}
            className="modal-submit-button"
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </div>
    </div>
  );
}
