import { useNavigate } from "react-router-dom";
import "../styles/success.css"; // Importa el archivo CSS

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <div className="success-box">
        <h1>¡Cuenta creada con éxito!</h1>
        <p>Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión.</p>
        <button onClick={() => navigate("/login")}>Iniciar sesión</button>
      </div>
    </div>
  );
};

export default SuccessPage;
