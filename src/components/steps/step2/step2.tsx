import "../../../styles/singup.css";
export const StepTwo = ({ register, errors }) => (
  <div className="form-step">
    <h2>Información de la Empresa</h2>
    <label>Razón Social</label>
    <input
      type="text"
      {...register("razonsocial", {
        required: "La razón social es obligatoria",
      })}
      placeholder="Razón Social"
      className="form-input"
    />
    {errors.razonsocial && <span>{errors.razonsocial.message}</span>}

    <label>Número de serie de la Firma Electrónica Avanzada</label>
    <input
      type="text"
      {...register("numeroserie", {
        required: "El número de serie es obligatorio",
      })}
      placeholder="Número de Serie"
      className="form-input"
    />
    {errors.numeroserie && <span>{errors.numeroserie.message}</span>}

    <label>Nacionalidad</label>
    <input
      type="text"
      {...register("nacionalidad", {
        required: "La nacionalidad es obligatoria",
      })}
      placeholder="Nacionalidad"
      className="form-input"
    />
    {errors.nacionalidad && <span>{errors.nacionalidad.message}</span>}

    <label>Clave del RFC con homoclave</label>
    <input
      type="text"
      {...register("rfchomoclave", { required: "El RFC es obligatorio" })}
      placeholder="RFC"
      className="form-input"
    />
    {errors.rfchomoclave && <span>{errors.rfchomoclave.message}</span>}
    <label htmlFor=""> Número de identificación fiscal(si aplica) </label>
    <input
      type="text"
      {...register("numerofiscal", { required: false })}
      placeholder="Email"
      className="form-input"
    />
    {errors.numerofiscal && (
      <span>Revise su número de identificación fiscal</span>
    )}
    <label htmlFor=""> Giro Mercantil </label>
    <input
      type="text"
      {...register("giromercantil", { required: false })}
      placeholder="Email"
      className="form-input"
    />
    {errors.giromercantil && <span>La razón social es obligatoria</span>}

    <label>Fecha de constitución</label>
    <input
      type="date"
      {...register("fechaconstitucion", {
        required: "La fecha de constitución es obligatoria",
      })}
      className="form-input"
    />
    {errors.fechaconstitucion && (
      <span>{errors.fechaconstitucion.message}</span>
    )}
  </div>
);
