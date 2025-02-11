import "../../../styles/singup.css";

export const StepThree = ({ register, errors }) => (
  <div className="form-step">
    <h2>Domicilio</h2>
    <label>Calle</label>
    <input
      type="text"
      {...register("calle", { required: "La calle es obligatoria" })}
      placeholder="Calle"
      className="form-input"
    />
    {errors.calle && <span>{errors.calle.message}</span>}

    <label>Número interior</label>
    <input
      type="text"
      {...register("numinterior", {
        required: "El número interior es obligatorio",
      })}
      placeholder="Número Interior"
      className="form-input"
    />
    {errors.numinterior && <span>{errors.numinterior.message}</span>}

    <label>Número exterior</label>
    <input
      type="text"
      {...register("numexterior", {
        required: "El número interior es obligatorio",
      })}
      placeholder="Número Interior"
      className="form-input"
    />
    {errors.numexterior && <span>{errors.numexterior.message}</span>}
    <label htmlFor="">Colonia</label>
    <input
      type="text"
      {...register("colonia", { required: true })}
      placeholder="Full Name"
      className="form-input"
    />
    <label>Código Postal</label>
    <input
      type="text"
      {...register("zipcode", { required: "El código postal es obligatorio" })}
      placeholder="Código Postal"
      className="form-input"
    />
    {errors.zipcode && <span>{errors.zipcode.message}</span>}

    <label>Estado</label>
    <input
      type="text"
      {...register("estado", { required: "El estado es obligatorio" })}
      placeholder="Estado"
      className="form-input"
    />
    {errors.estado && <span>{errors.estado.message}</span>}
    <label htmlFor="">Ciudad</label>
    <input
      type="text"
      {...register("ciudad", { required: true })}
      placeholder="Full Name"
      className="form-input"
    />
    {errors.ciudad && <span>La ciudad es obligatoria</span>}

    <label>País</label>
    <input
      type="text"
      {...register("pais", { required: "El país es obligatorio" })}
      placeholder="País"
      className="form-input"
    />
    {errors.pais && <span>{errors.pais.message}</span>}
    <label htmlFor="">Teléfono del domicilio</label>
    <input
      type="text"
      {...register("telefono", { required: true })}
      placeholder="Full Name"
      className="form-input"
    />
    {errors.telefono && <span>El teléfono es obligatorio </span>}
  </div>
);
