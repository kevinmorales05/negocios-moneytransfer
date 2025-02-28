import { useEffect, useState } from "react";
import "../../../styles/singup.css";
import { getAddressByZipCode } from "@/services/aurumcore/onboarding";

export const StepFiveMock = ({ register, errors, setValue, watch, token }) => {
    const [colonias, setColonias] = useState([]);
    const [loading, setLoading] = useState(false);
    const postalCode = watch("repaddressZip");
  
  
    useEffect(() => {
      const fetchLocationData = async () => {
        if (!postalCode || postalCode.length !== 5) return;
  
        setLoading(true);
        //para hacer pruebas sencillas usar esto
        // setTimeout(() => {
        //   const mockResponse = {
        //     responseCode: "0",
        //     responseMessage: "Proceso completo y exitoso.",
        //     responseSubject: "Éxito",
        //     messageType: 1,
        //     transId: "12502271611210072",
        //     data: [
        //       {
        //         idState: "15",
        //         nameState: "MEXICO",
        //         idCity: "15-025",
        //         nameCity: "Chalco",
        //         idSuburb: "15-025-4455",
        //         nameSuburb: "Independencia Chimalpa",
        //         postalCode: "56625",
        //       },
        //       {
        //         idState: "15",
        //         nameState: "MEXICO",
        //         idCity: "15-025",
        //         nameCity: "Chalco",
        //         idSuburb: "15-025-4456",
        //         nameSuburb: "San Lorenzo Chimalpa",
        //         postalCode: "56625",
        //       },
        //       {
        //         idState: "15",
        //         nameState: "MEXICO",
        //         idCity: "15-025",
        //         nameCity: "Chalco",
        //         idSuburb: "15-025-4457",
        //         nameSuburb: "San Martín Xico Nuevo",
        //         postalCode: "56625",
        //       },
        //       {
        //         idState: "15",
        //         nameState: "MEXICO",
        //         idCity: "15-025",
        //         nameCity: "Chalco",
        //         idSuburb: "15-025-4458",
        //         nameSuburb: "San Mateo Huitzilzingo",
        //         postalCode: "56625",
        //       },
        //       {
        //         idState: "15",
        //         nameState: "MEXICO",
        //         idCity: "15-025",
        //         nameCity: "Chalco",
        //         idSuburb: "15-025-9118",
        //         nameSuburb: "Guadalupe",
        //         postalCode: "56625",
        //       },
        //     ],
        //     accountholderId: null,
        //   };
        //   const locationData = mockResponse.data[0];

        //   if (mockResponse.responseCode === "0" && mockResponse.data.length > 0) {
        //   const locationData = mockResponse.data[0];

        //   setValue("repaddressStateName", locationData.nameState);
        //   setValue("repaddressState", locationData.idState);
        //   setValue("repaddressCityName", locationData.nameCity);
        //   setValue("repaddressCity", locationData.idCity);
        //   setValue("repaddressCountry", "187"); // Fijo para México
        //   setValue("repaddressCountryName", "México");
        //   setColonias(mockResponse.data);
          
        //   // setColonias([
        //   //   { codigo: locationData.idSuburb, nombre: locationData.nameSuburb },
        //   // ]);
        // }
        // setLoading(false);
        //   setLoading(false);
        // }, 1000); // Simula un retraso de 1 segundo

         try {
                const dataAddress = await getAddressByZipCode(postalCode, token);
                console.log("response get address ", dataAddress);
                console.log("response get address data ", dataAddress.data);
                if (dataAddress.responseCode === "0" && dataAddress.data.length > 0) {
                  const locationData = dataAddress.data[0];
        
                  setValue("repaddressStateName", locationData.nameState);
                  setValue("repaddressState", locationData.idState);
                  setValue("repaddressCityName", locationData.nameCity);
                  setValue("repaddressCity", locationData.idCity);
                  setValue("repaddressCountry", "187"); // Fijo para México
                  setValue("repaddressCountryName", "México");
                  setColonias(dataAddress.data);
                }
                setLoading(false);
              } catch (error) {
                console.log("error consulting the dataAddress ", error);
              }
      };
  
      fetchLocationData();
    }, [postalCode, setValue]);
  
  return(
  <div className="form-step">
    <h2>Representante Legal</h2>
    <label>Nombre(s)</label>
    <input
      type="text"
      {...register("name", { required: true })}
      placeholder="Nombre"
      className="form-input"
    />
    {errors.name && <span>El nombre es obligatorio</span>}

    <label>Apellido Paterno</label>
    <input
      type="text"
      {...register("lastName", { required: true })}
      placeholder="Apellido Paterno"
      className="form-input"
    />
    {errors.lastName && <span>Campo obligatorio</span>}

    <label>Apellido Materno</label>
    <input
      type="text"
      {...register("secondLastName", { required: true })}
      placeholder="Apellido Materno"
      className="form-input"
    />
    {errors.secondLastName && <span>Campo obligatorio</span>}
    <label>RFC con homoclave</label>
    <input
      type="text"
      {...register("reprfc", {
        required: "El RFC es obligatorio",
        minLength: {
          value: 12,
          message: "El RFC debe tener exactamente 12 caracteres",
        },
        maxLength: {
          value: 12,
          message: "El RFC debe tener exactamente 12 caracteres",
        },
        pattern: {
          value: /^[A-Z&Ñ]{3}\d{6}[A-Z0-9]{3}$/, // Expresión regular para validar RFC de persona moral
          message: "Formato de RFC inválido",
        },
      })}
      placeholder="RFC con homoclabe"
      className="form-input"
    />
    {errors.reprfc && <span>{errors.reprfc.message}</span>}
    <label>CURP</label>
    <input
      type="text"
      {...register("curp", {
        required: "El CURP es obligatorio",
        minLength: {
          value: 18,
          message: "El CURP debe tener exactamente 18 caracteres",
        },
        maxLength: {
          value: 18,
          message: "El CURP debe tener exactamente 18 caracteres",
        },
        pattern: {
          value: /^[A-Z&Ñ]{4}\d{6}[HM][A-Z]{2}[B-DF-HJ-NP-TV-Z]{3}[A-Z\d]\d$/, // CURP de persona física
          message: "Formato de CURP inválido",
        },
      })}
      placeholder="CURP"
      className="form-input"
      onInput={(e) => (e.target.value = e.target.value.toUpperCase())} // Convierte a mayúsculas automáticamente
    />
    {errors.curp && <span>{errors.curp.message}</span>}

    <label>Código Postal</label>
      <input
        type="text"
        {...register("repaddressZip", {
          required: "El código postal es obligatorio",
          minLength: { value: 5, message: "Debe tener 5 dígitos" },
          maxLength: { value: 5, message: "Debe tener 5 dígitos" },
          pattern: { value: /^[0-9]{5}$/, message: "Código postal inválido" },
        })}
        placeholder="Código Postal"
        className="form-input"
      />
      {errors.repaddressZip && <span>{errors.repaddressZip.message}</span>}
      {loading && <p>Cargando datos...</p>}
      <label>Estado</label>
      <input
        type="text"
        {...register("repaddressStateName")}
        className="form-input"
        readOnly
      />
      <input type="hidden" {...register("repaddressState")} />{" "}
      {/* Código del estado */}
      <label>Ciudad</label>
      <input
        type="text"
        {...register("repaddressCityName")}
        className="form-input"
        readOnly
      />
      <input type="hidden" {...register("repaddressCity")} />{" "}
      {/* Código de la ciudad */}
      <label>Colonia</label>
      <select {...register("repcolonia")} className="form-input">
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
        {...register("repaddressCountryName")}
        className="form-input"
        readOnly
      />
      <input type="hidden" {...register("repaddressCountry")} />{" "}

    <label>Teléfono</label>
    <input
      type="number"
      {...register("reptelephone", { required: true })}
      placeholder="Teléfono"
      className="form-input"
    />
    {errors.reptelephone && <span>Campo obligatorio</span>}

    <label>Correo Electrónico</label>
    <input
      type="email"
      {...register("repemail", { required: true })}
      placeholder="Correo Electrónico"
      className="form-input"
    />
    {errors.repemail && <span>Campo obligatorio</span>}

    <label>Puesto</label>
    <input
      type="text"
      {...register("charge", { required: true })}
      placeholder="Puesto"
      className="form-input"
    />
    {errors.puesto && <span>Campo obligatorio</span>}

    <label>Género</label>
    <select {...register("genero", { required: true })} className="form-input">
      <option value="">Seleccione...</option>
      <option value="1">Masculino</option>
      <option value="2">Femenino</option>
      <option value="3">Otro</option>
    </select>
    {errors.genero && <span>Campo obligatorio</span>}

    <label>Fecha de Nacimiento</label>
    <input
      type="date"
      {...register("repbrithday", { required: true })}
      className="form-input"
    />
    {errors.repbrithday && <span>Campo obligatorio</span>}

    <label>Documento de Identificación (PDF)</label>
    <input
      type="file"
      {...register("repdocumentoIdentificacion", { required: true })}
      accept="application/pdf"
      className="form-input"
    />
    {errors.repdocumentoIdentificacion && (
      <span>Debe subir un archivo PDF</span>
    )}
  </div>
)}
