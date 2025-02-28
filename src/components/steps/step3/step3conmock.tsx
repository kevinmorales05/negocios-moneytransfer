import { useState, useEffect } from "react";
import "../../../styles/singup.css";
import { getAddressByZipCode } from "@/services/aurumcore/onboarding";
import { ColoniaData, StepsProps } from "../types";

export const StepThreeMock: React.FC<StepsProps> = ({
  register,
  errors,
  setValue,
  watch,
  token,
}) => {
  const [colonias, setColonias] = useState<ColoniaData[]>([]);
  const [loading, setLoading] = useState(false);
  const postalCode = watch("addressZip");

  useEffect(() => {
    const fetchLocationData = async () => {
      if (!postalCode || postalCode.length !== 5) return;

      setLoading(true);

      //consumir servicio aurum core address
      if (token) {
        try {
          const dataAddress = await getAddressByZipCode(postalCode, token);
          console.log("response get address ", dataAddress);
          console.log("response get address data ", dataAddress.data);
          if (dataAddress.responseCode === "0" && dataAddress.data.length > 0) {
            const locationData = dataAddress.data[0];

            // Set values in the form using setValue, ensuring it's safe to use
            if (setValue) {
              setValue("addressStateName", locationData.nameState);
              setValue("addressState", locationData.idState);
              setValue("addressCityName", locationData.nameCity);
              setValue("addressCity", locationData.idCity);
              setValue("addressCountry", "187"); // Fixed for Mexico
              setValue("addressCountryName", "México");
            }
            setColonias(dataAddress.data);
          }
          setLoading(false);
        } catch (error) {
          console.log("error consulting the dataAddress ", error);
        }
      }
      console.log("token not available!");
    };

    fetchLocationData();
  }, [postalCode, setValue, token]);

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
        {...register("addressLine2", { required: "La calle es obligatoria" })}
        placeholder="Calle secundaria"
        className="form-input"
      />
      {errors.addressLine2 && <span>{errors.addressLine2.message}</span>}

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
        {...register("addressStateName")}
        className="form-input"
        readOnly
      />
      <input type="hidden" {...register("addressState")} />

      <label>Ciudad</label>
      <input
        type="text"
        {...register("addressCityName")}
        className="form-input"
        readOnly
      />
      <input type="hidden" {...register("addressCity")} />

      <label>Colonia</label>
      <select {...register("colonia")} className="form-input">
        <option value="">Seleccione una colonia</option>
        {colonias.map((colonia, index) => (
          <option key={index} value={colonia.idSuburb}>
            {colonia.nameSuburb}
          </option>
        ))}
      </select>

      <label>País</label>
      <input
        type="text"
        {...register("addressCountryName")}
        className="form-input"
        readOnly
      />
    </div>
  );
};
