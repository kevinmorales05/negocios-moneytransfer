import React, { useState } from "react";
import { useForm } from "react-hook-form";
import UpdatePassword from "../updatePassword/UpdatePassword"; // Asegúrate de importar el componente UpdatePassword
import "./UserProfile.css";

interface User {
  name: string;
  phone: string;
  email: string;
  accountNumber: string;
  address: string;
  info: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User>({
    name: "Traxwire",
    phone: "554 456-7890",
    email: "victor@traxwire.com",
    accountNumber: "64653987654321",
    address: "1234 Main St, Orem, UT",
    info: "Cliente VIP desde 2022",
  });

  const [editingField, setEditingField] = useState<string | null>(null);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const handleEdit = (field: keyof User) => {
    setEditingField(field);
    reset({ [field]: user[field] });
  };

  const onSubmit = (data: Record<string, string>) => {
    console.log(data);
    if (editingField) {
      setUser({ ...user, [editingField]: data[editingField] });
    }
    setEditingField(null);
  };

  return (
    <div className="profile-container">
      <h2>Perfil del Cliente</h2>
      {showUpdatePassword ? (
        <>
          <UpdatePassword />
        </>
      ) : (
        <>
          <div className="profile-section">
            {Object.keys(user).map((key) => (
              <div key={key} className="profile-item">
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
                {user[key as keyof User]}
                <button onClick={() => handleEdit(key as keyof User)}>
                  Editar
                </button>
              </div>
            ))}
            <div className="profile-item">
              <button onClick={() => setShowUpdatePassword(true)}>
                Actualizar Contraseña
              </button>
            </div>
          </div>

          {editingField && (
            <div className="modal">
              <div className="modal-content">
                <h3>
                  Editar{" "}
                  {editingField.charAt(0).toUpperCase() + editingField.slice(1)}
                </h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    type="text"
                    {...register(editingField, { required: true })}
                  />
                  <div className="modal-buttons">
                    <button type="submit">Guardar</button>
                    <button type="button" onClick={() => setEditingField(null)}>
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserProfile;
