import { useState, useEffect } from "react";
import "../../../styles/singup.css";

export const StepThreeMock = ({ register, errors, setValue, watch }) => {
  const [colonias, setColonias] = useState([]);
  const [loading, setLoading] = useState(false);
  const postalCode = watch("addressZip");

  useEffect(() => {
    const fetchLocationData = async () => {
      if (!postalCode || postalCode.length !== 5) return;

      setLoading(true);
      setTimeout(() => {
        const mockResponse = {
          codigoPostal: "06700",
          estadoNombre: "Ciudad de México",
          estadoCodigo: "CDMX",
          ciudadNombre: "Cuauhtémoc",
          ciudadCodigo: "CUA",
          colonias: [
            { codigo: "001", nombre: "Roma Norte" },
            { codigo: "002", nombre: "Roma Sur" },
            { codigo: "003", nombre: "Hipódromo" },
          ],
        };

        setValue("addressState", mockResponse.estadoNombre);
        setValue("addressStateCode", mockResponse.estadoCodigo);
        setValue("addressCity", mockResponse.ciudadNombre);
        setValue("addressCityCode", mockResponse.ciudadCodigo);
        setValue("addressCountry", "México"); // Fijo para México
        setColonias(mockResponse.colonias);
        setLoading(false);
      }, 1000); // Simula un retraso de 1 segundo
    };

    fetchLocationData();
  }, [postalCode, setValue]);

  return (
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
        {...register("addressLine2")}
        placeholder="Calle secundaria"
        className="form-input"
      />
      <label>Número exterior</label>
      <input
        type="text"
        {...register("addressExteriorNumber", {
          required: "El número exterior es obligatorio",
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
          minLength: { value: 5, message: "Debe tener 5 dígitos" },
          maxLength: { value: 5, message: "Debe tener 5 dígitos" },
          pattern: { value: /^[0-9]{5}$/, message: "Código postal inválido" },
        })}
        placeholder="Código Postal"
        className="form-input"
      />
      {errors.addressZip && <span>{errors.addressZip.message}</span>}
      {loading && <p>Cargando datos...</p>}
      <label>Estado</label>
      <input
        type="text"
        {...register("addressState")}
        className="form-input"
        readOnly
      />
      <input type="hidden" {...register("addressStateCode")} />{" "}
      {/* Código del estado */}
      <label>Ciudad</label>
      <input
        type="text"
        {...register("addressCity")}
        className="form-input"
        readOnly
      />
      <input type="hidden" {...register("addressCityCode")} />{" "}
      {/* Código de la ciudad */}
      <label>Colonia</label>
      <select {...register("colonia")} className="form-input">
        <option value="">Seleccione una colonia</option>
        {colonias.map((colonia, index) => (
          <option key={index} value={colonia.codigo}>
            {colonia.nombre}
          </option>
        ))}
      </select>
      <label>País</label>
      <input
        type="text"
        {...register("addressCountry")}
        className="form-input"
        readOnly
      />
    </div>
  );
};
