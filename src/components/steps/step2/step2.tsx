import "../../../styles/singup.css";

const businessLines = [
  {
    businessLineId: "8211013",
    category: "INVERSIONISTA",
  },
  {
    businessLineId: "8991011",
    category: "QUEHACERES DEL HOGAR",
  },
  {
    businessLineId: "8219059",
    category: "MONTEPIO",
  },
  {
    businessLineId: "3997014",
    category: "FABRICACION DE ARMAS",
  },
  {
    businessLineId: "8800002",
    category: "JUEGOS DE FERIA Y APUESTAS",
  },
  {
    businessLineId: "8314015",
    category: "ADMINISTRACION DE INMUEBLES",
  },
  {
    businessLineId: "8721012",
    category: "BARES Y CANTINAS",
  },
  {
    businessLineId: "8428014",
    category: "SERVICIOS DE AGENCIAS DE COLOCACION Y SELECCION DE PERSONAL",
  },
  {
    businessLineId: "8833015",
    category:
      "FEDERACIONES Y ASOCIACIONES DEPORTIVAS Y OTRAS CON FINES RECREATIVOS",
  },
  {
    businessLineId: "9506009",
    category: "ESTUDIANTE, DESEMPLEADO, JUBILADO, PENSIONADO, DISCAPACITADO",
  },
  {
    businessLineId: "6999900 ",
    category: "USUARIOS MENORES COMERCIO",
  },
  {
    businessLineId: "6225024",
    category: "COMPRAVENTA DE OTRAS JOYAS",
  },
  {
    businessLineId: "6911045",
    category: "COMPRAVENTA DE CASAS Y OTROS INMUEBLES",
  },
  {
    businessLineId: "8711021",
    category: "RESTAURANTE",
  },
  {
    businessLineId: "9411018",
    category: "GOBIERNO FEDERAL",
  },
  {
    businessLineId: "8219041",
    category: "CAJA DE AHORROS",
  },
  {
    businessLineId: "8311011",
    category: "ALQUILER DE TERRENOS LOCALES Y EDIFICIOS ",
  },
  {
    businessLineId: "6999083",
    category: "CREDITOS PERSONALES AL CONSUMO",
  },
  {
    businessLineId: "6992011",
    category: "AGENCIAS DE RIFAS Y SORTEOS (QUINIELAS Y LOTERIA)",
  },
  {
    businessLineId: "8131013",
    category: "ALMACENES DE DEPOSITO ",
  },
  {
    businessLineId: "6100002",
    category: "COMPRAVENTA DE ALIMENTOS, BEBIDAS Y PRODUCTOS DE TABACO",
  },
  {
    businessLineId: "8132029",
    category: "UNIONES DE CREDITO ",
  },
  {
    businessLineId: "6900002",
    category: "COMPRAVENTA DE DIAMANTES",
  },
  {
    businessLineId: "8123052",
    category: "SOCIEDADES DE AHORRO Y PRESTAMO",
  },
  {
    businessLineId: "8211039",
    category: "CASAS DE BOLSA ",
  },
  {
    businessLineId: "8832017",
    category: "GALERIAS DE ARTES GRAFICAS Y MUSEOS",
  },
  {
    businessLineId: "28",
    category: "SERVICIO - PASARELA DE PAGOS",
  },
  {
    businessLineId: "9311010",
    category: "ASOCIACIONES Y CONFEDERACIONES",
  },
  {
    businessLineId: "9319014",
    category: "ORGANIZACIONES CIVICAS, POLITICAS, RELIGIOSAS",
  },
  {
    businessLineId: "9503005",
    category:
      "TRANSMISORES DE DINERO O DISPERSORES/CAMBISTAS O CENTROS CAMBIARIOS/CASAS DE EMPEÑO",
  },
  {
    businessLineId: "8219114",
    category: "ADMINISTRADORAS DE TARJETA DE CREDITO",
  },
  {
    businessLineId: "8219075",
    category: "FACTORING",
  },
  {
    businessLineId: "9411026",
    category: "GOBIERNO ESTATAL",
  },
  {
    businessLineId: "4111027",
    category: "CONSTRUCCION DE INMUEBLES",
  },
  {
    businessLineId: "9221011",
    category: "CENTRO DE BENEFICENCIA",
  },
  {
    businessLineId: "6513015",
    category: "COMPRAVENTA DE GASOLINA Y DIESEL",
  },
  {
    businessLineId: "6811013",
    category: "COMPRAVENTA DE AUTOMOVILES Y CAMIONES ",
  },
  {
    businessLineId: "6991013",
    category: "COMPRAVENTA DE ARMAS DE FUEGO",
  },
  {
    businessLineId: "6325014",
    category: "COMPRAVENTA DE ANTIGÜEDADES",
  },
  {
    businessLineId: "7513014",
    category: "AGENCIA ADUANAL",
  },
  {
    businessLineId: "8123060",
    category: "SOCIEDADES DE AHORRO Y CREDITO POPULAR",
  },
  {
    businessLineId: "8400003",
    category: "NOTARÍAS PÚBLICAS",
  },
  {
    businessLineId: "8426018",
    category: "COMISIONISTA",
  },
  {
    businessLineId: "6800003",
    category: "SERVICIOS DE BLINDAJE",
  },
  {
    businessLineId: "8219025",
    category: "CASA DE CAMBIO",
  },
  {
    businessLineId: "8219067",
    category: "PRESTAMISTA",
  },
  {
    businessLineId: "9411998",
    category: "EMPLEADO PUBLICO  ",
  },
  {
    businessLineId: "8313017",
    category: "SERVICIO DE CORREDORES DE BIENES RAICES",
  },
  {
    businessLineId: "8944098",
    category: "EMPLEADO PRIVADO",
  },
  {
    businessLineId: "8429046",
    category: "EMPRESAS TRANSPORTADORAS DE VALORES",
  },
  {
    businessLineId: "9411034",
    category: "GOBIERNO MUNICIPAL",
  },
];

export const StepTwo = ({ register, errors }) => (
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
      {...register("businessline", { required: "Seleccione una opción" })}
      className="form-input"
    >
      <option value="">Seleccione una opción</option>
      {businessLines.map((item) => (
        <option key={item.businessLineId} value={item.businessLineId}>
          {item.category}
        </option>
      ))}
    </select>
    {errors.businessline && <span>La actividad económica es obligatoria</span>}

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
