import "../../../styles/singup.css";

export const StepThree = ({ register, errors }) => (
  <div className="form-step">
    <h2>Domicilio de la Empresa</h2>
    <label>Calle Principal</label>
    <input
      type="text"
      {...register("addressLine1", { required: "La calle es obligatoria" })}
      placeholder="Calle principal"
      className="form-input"
    />
    {errors.addressLine1 && <span>{errors.addressLine1.message}</span>}

    <label>Calle Secundaria</label>
    <input
      type="text"
      {...register("addressLine2", { required: "La calle es obligatoria" })}
      placeholder="Calle secundaria"
      className="form-input"
    />
    {errors.addressLine2 && <span>{errors.addressLine2.message}</span>}
    <label>Número exterior</label>
    <input
      type="text"
      {...register("addressExteriorNumber", {
        required: "El número interior es obligatorio",
      })}
      placeholder="360"
      className="form-input"
    />
    {errors.addressExteriorNumber && (
      <span>{errors.addressExteriorNumber.message}</span>
    )}
    <label>Número interior</label>
    <input
      type="text"
      {...register("addressInteriorNumber", {
        required: "El número interior es obligatorio",
      })}
      placeholder="STE 200-C"
      className="form-input"
    />
    {errors.addressInteriorNumber && (
      <span>{errors.addressInteriorNumber.message}</span>
    )}
    <label>Código Postal</label>
    <input
      type="text"
      {...register("addressZip", {
        required: "El código postal es obligatorio",
      })}
      placeholder="Código Postal"
      className="form-input"
    />
    {errors.addressZip && <span>{errors.addressZip.message}</span>}
    <label>Estado</label>
    <input
      type="text"
      {...register("addressState", { required: "El estado es obligatorio" })}
      placeholder="Estado"
      className="form-input"
    />
    {errors.addressState && <span>{errors.addressState.message}</span>}
    <label htmlFor="">Colonia</label>
    <input
      type="text"
      {...register("colonia", { required: true })}
      placeholder="Full Name"
      className="form-input"
    />

    <label htmlFor="">Ciudad</label>
    <input
      type="text"
      {...register("addressCity", { required: true })}
      placeholder="Full Name"
      className="form-input"
    />
    {errors.addressCity && <span>La ciudad es obligatoria</span>}

    <label>País</label>
    <input
      type="text"
      {...register("addressCountry", { required: "El país es obligatorio" })}
      placeholder="País"
      className="form-input"
    />
    {errors.addressCountry && <span>{errors.addressCountry.message}</span>}
  </div>
);
