import React from "react";
import "../../../styles/singup.css";
import { StepsProps } from "../types";
import { businessLines } from "../businesslines";



export const StepTwo: React.FC<StepsProps> = ({ register, errors }) => (
  <div className="form-step">
    <h2>Información de la Empresa</h2>
    <label>Razón Social</label>
    <input
      type="text"
      {...register("businessname", {
        required: "La razón social es obligatoria",
      })}
      placeholder="Razón Social"
      className="form-input"
    />
    {errors.businessname && <span>{errors.businessname.message}</span>}

    <label>Número de serie de la Firma Electrónica Avanzada</label>
    <input
      type="text"
      {...register("serienumber", {
        required: "El número de serie es obligatorio",
        minLength: {
          value: 16,
          message: "El número de serie debe tener exactamente 16 caracteres",
        },
        maxLength: {
          value: 16,
          message: "El número de serie debe tener exactamente 16 caracteres",
        },
        pattern: {
          value: /^[0-9A-Fa-f]{16}$/, // Solo permite 16 caracteres hexadecimales (0-9 y A-F)
          message:
            "Formato inválido. Debe contener solo caracteres hexadecimales (0-9, A-F)",
        },
      })}
      placeholder="Número de Serie"
      className="form-input"
    />
    {errors.serienumber && <span>{errors.serienumber.message}</span>}

    <label>RFC con homoclave</label>
    <input
      type="text"
      {...register("rfc", {
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
      placeholder="RFC"
      className="form-input"
    />
    {errors.rfc && <span>{errors.rfc.message}</span>}
    <label htmlFor="">Número de identificación fiscal (si aplica)</label>
    <input
      type="text"
      {...register("numerofiscal", {
        required: false, // No es obligatorio
        pattern: {
          value: /^[A-Z&Ñ]{3}\d{6}[A-Z0-9]{3}$/, // RFC de persona moral: 3 letras + 6 números + 3 alfanuméricos
          message:
            "Formato inválido. Debe tener 12 caracteres: 3 letras, 6 números y 3 alfanuméricos.",
        },
        minLength: {
          value: 12,
          message:
            "El número de identificación fiscal debe tener 12 caracteres.",
        },
        maxLength: {
          value: 12,
          message:
            "El número de identificación fiscal debe tener 12 caracteres.",
        },
      })}
      placeholder="Número de identificación fiscal"
      className="form-input"
    />
    {errors.numerofiscal && <span>{errors.numerofiscal.message}</span>}

    <label htmlFor=""> Giro Mercantil/Actividad económica </label>
    <select
      id="businessline"
      {...register("businessLine", { required: "Seleccione una opción" })}
      className="form-input"
    >
      <option value="">Seleccione una opción</option>
      {businessLines.map((item) => (
        <option key={item.businessLineId} value={item.businessLineId}>
          {item.category}
        </option>
      ))}
    </select>
    {errors.businessLine && <span>La actividad económica es obligatoria</span>}

    <label>Fecha de constitución</label>
    <input
      type="date"
      {...register("stablishmentDate", {
        required: "La fecha de constitución es obligatoria",
      })}
      className="form-input"
    />
    {errors.stablishmentDate && (
      <span>{errors.stablishmentDate.message}</span>
    )}
    <label style={{ display: "block", fontWeight: "medium" }}>Teléfono Móvil de contacto</label>
          <input
            type="text"
            {...register("mobilePhone", {
              required: "El teléfono es obligatorio",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Debe tener exactamente 10 dígitos numéricos",
              },
            })}
            placeholder="Ej. 5512345678"
            style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
          />
          {errors.mobilePhone && (
            <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>{errors.mobilePhone.message}</p>
          )}
  </div>
);
