import React, { useState } from "react";
import "../../../styles/singup.css";
import { StepsProps } from "../types";

const StepAccionistas: React.FC<StepsProps> = ({
  register,
  errors,
  fields,
  append,
  remove,
  watch,
}) => {
  const [tieneMasDeCuatro, setTieneMasDeCuatro] = useState<boolean>(false);

  const handleAddAccionista = () => {
    if (append) {
      append({
        nombre: "",
        apellido: "",
        rfc: "",
        porcentaje: "",
        capital: "",
        pep: "",
        esPEP: "",
        detallePEP: "",
      },);
    }
  };

  const handleRemoveAccionista = (index:number) => {
    if(remove) {
      remove(index)
    }
  };

  return (
    <div className="form-step">
      <h2>Estructura Accionaria</h2>
      <h2>Accionistas</h2>

      <label>¿Tiene más de 4 accionistas?</label>
      <select
        {...register("tieneMasDeCuatro", { required: true })}
        className="form-input"
        onChange={(e) => setTieneMasDeCuatro(e.target.value === "si")}
      >
        <option value="">Seleccione</option>
        <option value="si">Sí</option>
        <option value="no">No</option>
      </select>
      {errors.tieneMasDeCuatro && <span>Campo obligatorio</span>}
      {fields?.map((field, index) => (
        <div key={field.id} className="accionista-section">
          <label>Nombre</label>
          <input
            type="text"
            {...register(`accionistas.${index}.nombre`, {
              required: "Campo obligatorio",
            })}
            placeholder="Nombre"
            className="form-input"
          />
          {errors.accionistas?.[index]?.nombre && (
            <span>{errors.accionistas[index].nombre.message}</span>
          )}
          <label>Apellido</label>
          <input
            type="text"
            {...register(`accionistas.${index}.apellido`, {
              required: "Campo obligatorio",
            })}
            placeholder="Apellido"
            className="form-input"
          />
          {errors.accionistas?.[index]?.apellido && (
            <span>{errors.accionistas[index].apellido.message}</span>
          )}

          <label>RFC</label>
          <input
            type="text"
            {...register(`accionistas.${index}.rfc`, {
              required: "El RFC es obligatorio",
              pattern: {
                value: /^[A-ZÑ&]{3,4}\d{6}[A-Z\d]{3}$/, // Expresión regular para validar RFC
                message: "RFC inválido, verifique el formato",
              },
              maxLength: {
                value: 13,
                message: "El RFC no puede tener más de 13 caracteres",
              },
              minLength: {
                value: 12,
                message: "El RFC debe tener al menos 12 caracteres",
              },
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
            placeholder="100"
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
            placeholder="1000"
            className="form-input"
          />
          {errors.accionistas?.[index]?.capital && (
            <span>{errors.accionistas[index].capital.message}</span>
          )}

          <label>¿Es Persona Expuesta Políticamente (PEP)?</label>
          <select
            {...register(`accionistas.${index}.esPEP`, {
              required: "Campo obligatorio",
            })}
            className="form-input"
          >
            <option value="">Seleccione</option>
            <option value="si">Sí</option>
            <option value="no">No</option>
          </select>
          {errors.accionistas?.[index]?.esPEP && (
            <span>{errors.accionistas[index].esPEP.message}</span>
          )}

          {/* Si el usuario selecciona "Sí", mostramos el campo adicional */}
          {watch(`accionistas.${index}.esPEP`) === "si" && (
            <div>
              <label>
                En caso de haber desempeñado alguna función pública, política,
                diplomática o militar de alta jerarquía en los últimos 12 meses,
                por favor manifestarlo:
              </label>
              <select
                {...register(`accionistas.${index}.detallePEP`, {
                  required:
                    "Debe indicar si ha desempeñado una función pública",
                })}
                className="form-input"
              >
                <option value="">Seleccione</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
              {errors.accionistas?.[index]?.detallePEP && (
                <span>{errors.accionistas[index].detallePEP.message}</span>
              )}
            </div>
          )}

          {fields.length > 1 && (
            <button type="button" onClick={() => handleRemoveAccionista(index)}>
              Eliminar
            </button>
          )}
        </div>
      ))}
      {tieneMasDeCuatro ? (
        <></>
      ) : (
        <>
          {" "}
          <button
            type="button"
            onClick={handleAddAccionista}
          >
            + Agregar Accionista
          </button>
        </>
      )}
    </div>
  );
};

export default StepAccionistas;
