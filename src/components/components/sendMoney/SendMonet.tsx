import { useState } from "react";
import { useForm } from "react-hook-form";
import './SendMoney.css'

const SendMoney = () => {
  const { register, handleSubmit, reset } = useForm();
  const { register: registerNewAccount, handleSubmit: handleSubmitNewAccount, reset: resetNewAccount } = useForm();

  const [accounts, setAccounts] = useState([
    { nickname: "Mi Cuenta", accountNumber: "123456789", beneficiary: "Kevin Morales" },
  ]);

  const [selectedAccount, setSelectedAccount] = useState("");
  const [showModal, setShowModal] = useState(false);

  const onSubmit = (data) => {
    console.log("Enviando dinero:", data);
    reset();
  };

  const onAddAccount = (data) => {
    setAccounts([...accounts, data]);
    setSelectedAccount(data.accountNumber);
    resetNewAccount();
    setShowModal(false);
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
    </div>
  );
};

export default SendMoney;
