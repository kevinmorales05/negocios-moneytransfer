import "../../../styles/singup.css";

const StepAccionistas = ({ register, errors, fields, append, remove }) => {
  return (
    <div className="form-step">
      <h2>Estructura Accionaria</h2>
      <h2>Accionistas</h2>

      {fields.map((field, index) => (
        <div key={field.id} className="accionista-section">
          <label>Nombre Completo</label>
          <input
            type="text"
            {...register(`accionistas.${index}.nombre`, {
              required: "Campo obligatorio",
            })}
            placeholder="Nombre Completo"
            className="form-input"
          />
          {errors.accionistas?.[index]?.nombre && (
            <span>{errors.accionistas[index].nombre.message}</span>
          )}

          <label>RFC</label>
          <input
            type="text"
            {...register(`accionistas.${index}.rfc`, {
              required: "Campo obligatorio",
            })}
            placeholder="RFC"
            className="form-input"
          />
          {errors.accionistas?.[index]?.rfc && (
            <span>{errors.accionistas[index].rfc.message}</span>
          )}

          <label>% de Acciones</label>
          <input
            type="number"
            {...register(`accionistas.${index}.porcentaje`, {
              required: "Debe ser entre 1 y 100",
              min: { value: 1, message: "Mínimo 1%" },
              max: { value: 100, message: "Máximo 100%" },
            })}
            placeholder="% de Acciones"
            className="form-input"
          />
          {errors.accionistas?.[index]?.porcentaje && (
            <span>{errors.accionistas[index].porcentaje.message}</span>
          )}

          <label>Capital</label>
          <input
            type="number"
            {...register(`accionistas.${index}.capital`, {
              required: "Campo obligatorio",
            })}
            placeholder="Capital"
            className="form-input"
          />
          {errors.accionistas?.[index]?.capital && (
            <span>{errors.accionistas[index].capital.message}</span>
          )}

          <label>Es PEP</label>
          <select
            {...register(`accionistas.${index}.pep`, {
              required: "Campo obligatorio",
            })}
            className="form-input"
          >
            <option value="">Seleccione...</option>
            <option value="si">Sí</option>
            <option value="no">No</option>
          </select>
          {errors.accionistas?.[index]?.pep && (
            <span>{errors.accionistas[index].pep.message}</span>
          )}

          {fields.length > 1 && (
            <button type="button" onClick={() => remove(index)}>
              Eliminar
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            nombre: "",
            rfc: "",
            porcentaje: "",
            capital: "",
            pep: "",
          })
        }
      >
        + Agregar Accionista
      </button>
    </div>
  );
};

export default StepAccionistas;
