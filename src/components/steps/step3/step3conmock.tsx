import { useState, useEffect } from "react";
import "../../../styles/singup.css";

export const StepThreeMock = ({ register, errors, setValue, watch, token }) => {
  const [colonias, setColonias] = useState([]);
  const [loading, setLoading] = useState(false);
  const postalCode = watch("addressZip");

  useEffect(() => {
    const fetchLocationData = async () => {
      if (!postalCode || postalCode.length !== 5) return;

      setLoading(true);
      setTimeout(() => {
        const mockResponse = {
          responseCode: "0",
          responseMessage: "Proceso completo y exitoso.",
          responseSubject: "Éxito",
          messageType: 1,
          transId: "12502271611210072",
          data: [
            {
              idState: "15",
              nameState: "MEXICO",
              idCity: "15-025",
              nameCity: "Chalco",
              idSuburb: "15-025-4455",
              nameSuburb: "Independencia Chimalpa",
              postalCode: "56625",
            },
            {
              idState: "15",
              nameState: "MEXICO",
              idCity: "15-025",
              nameCity: "Chalco",
              idSuburb: "15-025-4456",
              nameSuburb: "San Lorenzo Chimalpa",
              postalCode: "56625",
            },
            {
              idState: "15",
              nameState: "MEXICO",
              idCity: "15-025",
              nameCity: "Chalco",
              idSuburb: "15-025-4457",
              nameSuburb: "San Martín Xico Nuevo",
              postalCode: "56625",
            },
            {
              idState: "15",
              nameState: "MEXICO",
              idCity: "15-025",
              nameCity: "Chalco",
              idSuburb: "15-025-4458",
              nameSuburb: "San Mateo Huitzilzingo",
              postalCode: "56625",
            },
            {
              idState: "15",
              nameState: "MEXICO",
              idCity: "15-025",
              nameCity: "Chalco",
              idSuburb: "15-025-9118",
              nameSuburb: "Guadalupe",
              postalCode: "56625",
            },
          ],
          accountholderId: null,
        };

        if (mockResponse.responseCode === "0" && mockResponse.data.length > 0) {
          const locationData = mockResponse.data[0];

          setValue("addressStateName", locationData.nameState);
          setValue("addressState", locationData.idState);
          setValue("addressCityName", locationData.nameCity);
          setValue("addressCity", locationData.idCity);
          setValue("addressCountry", "187"); // Fijo para México
          setValue("addressCountryName", "México");
          setColonias(mockResponse.data);
          
          // setColonias([
          //   { codigo: locationData.idSuburb, nombre: locationData.nameSuburb },
          // ]);
        }
        setLoading(false);
      }, 1000);
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
