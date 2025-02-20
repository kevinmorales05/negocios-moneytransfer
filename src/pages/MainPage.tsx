import "../styles/MainPage.css"; // Asegúrate de agregar este archivo de estilos.
import Header from "@/components/components/header/Header";

const MainPage = () => {

  return (
    <div className="main-container">
      <Header />
      <section className="hero">
        <h1>Bienvenido a Kuhnipay Negocios</h1>
        <p>Transformamos tus sueños financieros en realidad.</p>
      </section>
    </div>
  );
};

export default MainPage;
