import "../../../styles/singup.css";

export const StepFive = ({ register, errors }) => (
  <div className="form-step">
    <h2>Representante Legal</h2>
    <label>Nombre(s)</label>
    <input
      type="text"
      {...register("nombre", { required: true })}
      placeholder="Nombre"
      className="form-input"
    />
    {errors.nombre && <span>El nombre es obligatorio</span>}

    <label>Apellido Paterno</label>
    <input
      type="text"
      {...register("apellidoPaterno", { required: true })}
      placeholder="Apellido Paterno"
      className="form-input"
    />
    {errors.apellidoPaterno && <span>Campo obligatorio</span>}

    <label>Apellido Materno</label>
    <input
      type="text"
      {...register("apellidoMaterno", { required: true })}
      placeholder="Apellido Materno"
      className="form-input"
    />
    {errors.apellidoMaterno && <span>Campo obligatorio</span>}

    <label>Dirección (Línea 1)</label>
    <input
      type="text"
      {...register("direccionLinea1", { required: true })}
      placeholder="Dirección Línea 1"
      className="form-input"
    />
    {errors.direccionLinea1 && <span>Campo obligatorio</span>}

    <label>Dirección (Línea 2)</label>
    <input
      type="text"
      {...register("direccionLinea2")}
      placeholder="Dirección Línea 2"
      className="form-input"
    />

    <label>Teléfono</label>
    <input
      type="tel"
      {...register("telefonorep", { required: true })}
      placeholder="Teléfono"
      className="form-input"
    />
    {errors.telefonorep && <span>Campo obligatorio</span>}

    <label>Correo Electrónico</label>
    <input
      type="email"
      {...register("correorep", { required: true })}
      placeholder="Correo Electrónico"
      className="form-input"
    />
    {errors.correorep && <span>Campo obligatorio</span>}

    <label>Puesto</label>
    <input
      type="text"
      {...register("puesto", { required: true })}
      placeholder="Puesto"
      className="form-input"
    />
    {errors.puesto && <span>Campo obligatorio</span>}

    <label>Género</label>
    <select {...register("genero", { required: true })} className="form-input">
      <option value="">Seleccione...</option>
      <option value="masculino">Masculino</option>
      <option value="femenino">Femenino</option>
      <option value="otro">Otro</option>
    </select>
    {errors.genero && <span>Campo obligatorio</span>}

    <label>Fecha de Nacimiento</label>
    <input
      type="date"
      {...register("fechaNacimiento", { required: true })}
      className="form-input"
    />
    {errors.fechaNacimiento && <span>Campo obligatorio</span>}

    <label>Documento de Identificación (PDF)</label>
    <input
      type="file"
      {...register("documentoIdentificacion", { required: true })}
      accept="application/pdf"
      className="form-input"
    />
    {errors.documentoIdentificacion && <span>Debe subir un archivo PDF</span>}
  </div>
);
