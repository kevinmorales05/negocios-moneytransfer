import "../../../styles/singup.css";

export const StepCargaDocumentos = ({ register, errors }) => (
  <div className="form-step">
    <h2>Carga de Documentos</h2>
    <label>
      Testimonio o copia certificada del instrumento que acredite su legal
      existencia, inscrito en el registro público (PDF)
    </label>
    <input
      type="file"
      {...register("documentoExistenciaCompania", { required: true })}
      accept="application/pdf"
      className="form-input"
    />
    {errors.documentoExistenciaCompania && (
      <span>Error al cargar el documento</span>
    )}
    <label>Cédula de identificación fiscal</label>
    <input
      type="file"
      {...register("identificacionCompania", { required: true })}
      accept="application/pdf"
      className="form-input"
    />
    {errors.identificacionCompania && <span>Error al cargar el documento</span>}
    <label>Comprobante de domicilio (PDF)</label>
    <input
      type="file"
      {...register("companiaComprobanteDomicilio", { required: true })}
      accept="application/pdf"
      className="form-input"
    />
    {errors.companiaComprobanteDomicilio && (
      <span>Error al cargar el documento</span>
    )}
    <label>
      Testimonio o copia certificada del instrumento expedido por fedatario
      público que contenga los poderes del representante o representantes
      legales (PDF)
    </label>
    <input
      type="file"
      {...register("documentoPoderRepLegal", { required: true })}
      accept="application/pdf"
      className="form-input"
    />
    {errors.documentoPoderRepLegal && <span>Error al cargar el documento</span>}
  </div>
);
