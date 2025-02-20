import React, { useState } from "react";
import { useForm } from "react-hook-form";
import OtpModal from '../otpmodal/OtpModal';
import './SendMoney.css';

interface Account {
  nickname: string;
  accountNumber: string;
  beneficiary: string;
}

interface SendMoneyForm {
  amount: number;
  concept: string;
  reference: string;
  account: string;
}

const SendMoney: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<SendMoneyForm>();
  const { register: registerNewAccount, handleSubmit: handleSubmitNewAccount, reset: resetNewAccount } = useForm<Account>();

  const [accounts, setAccounts] = useState<Account[]>([
    { nickname: "Mi Cuenta", accountNumber: "123456789", beneficiary: "Kevin Morales" },
  ]);

  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showOtpModal, setShowOtpModal] = useState<boolean>(false);
  const [otpError, setOtpError] = useState<string>("");

  const onSubmit = (data: SendMoneyForm) => {
    console.log("Enviando dinero:", data);
    // Aquí puedes agregar la lógica para enviar el OTP
    setShowOtpModal(true); // Mostrar modal de OTP
    reset();
  };

  const onAddAccount = (data: Account) => {
    setAccounts([...accounts, data]);
    setSelectedAccount(data.accountNumber);
    resetNewAccount();
    setShowModal(false);
  };

  const onOtpSubmit = (data: { otp: string }) => {
    // Lógica para verificar el OTP
    if (data.otp === "123456") { // Cambia esta lógica según tu implementación
      console.log("Transacción realizada exitosamente");
      setShowOtpModal(false);
      setOtpError("");
      // Aquí puedes realizar la transacción
    } else {
      setOtpError("El OTP ingresado no es correcto. Inténtalo de nuevo.");
    }
  };

  const resendOtp = () => {
    console.log("Reenviando OTP...");
    setOtpError("");
    // Aquí puedes agregar la lógica para reenviar el OTP
  };

  return (
    <div className="send-money-container">
      <h2>Enviar Dinero</h2>
      <form className="send-money-form" onSubmit={handleSubmit(onSubmit)}>
        <label>Monto:</label>
        <input type="number" {...register("amount", { required: true, min: 1 })} placeholder="Ingrese el monto" />

        <label>Concepto:</label>
        <input type="text" {...register("concept", { required: true })} placeholder="Concepto del pago" />

        <label>Número de Referencia:</label>
        <input type="text" {...register("reference", { required: true })} placeholder="Referencia" />

        <label>Seleccionar Cuenta:</label>
        <select {...register("account")} value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)}>
          <option value="">Selecciona una cuenta</option>
          {accounts.map((acc, index) => (
            <option key={index} value={acc.accountNumber}>
              {acc.nickname} - {acc.accountNumber}
            </option>
          ))}
        </select>

        <button type="button" className="add-account-btn" onClick={() => setShowModal(true)}>+ Agregar Nueva Cuenta</button>
        <button type="submit" className="submit-btn">Enviar Dinero</button>
      </form>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Agregar Nueva Cuenta</h3>
            <form onSubmit={handleSubmitNewAccount(onAddAccount)}>
              <input type="text" {...registerNewAccount("nickname", { required: true })} placeholder="Nickname" />
              <input type="text" {...registerNewAccount("accountNumber", { required: true })} placeholder="Número de Cuenta" />
              <input type="text" {...registerNewAccount("beneficiary", { required: true })} placeholder="Nombre del Beneficiario" />

              <div className="modal-buttons">
                <button type="submit" className="save-btn">Guardar</button>
                <button type="button" onClick={() => setShowModal(false)} className="cancel-btn">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <OtpModal
        showModal={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        onSubmit={onOtpSubmit}
        errorMessage={otpError}
        onResend={resendOtp}
      />
    </div>
  );
};

export default SendMoney;
