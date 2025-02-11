import "../../../styles/singup.css";

export const StepFour = ({ register, errors }) => (
  <div className="form-step">
    <h2>Perfil Transaccional</h2>

    <label>Número de Retiros</label>
    <select
      {...register("numRetiros", { required: true })}
      className="form-input"
    >
      <option value="">Seleccione...</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    {errors.numRetiros && <span>Campo obligatorio</span>}

    <label>Monto de Retiros</label>
    <select
      {...register("montoRetiros", { required: true })}
      className="form-input"
    >
      <option value="">Seleccione...</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    {errors.montoRetiros && <span>Ingrese un monto válido</span>}

    <label>Número de Depósitos</label>
    <select
      {...register("numDeposito", { required: true })}
      className="form-input"
    >
      <option value="">Seleccione...</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    {errors.numDeposito && <span>Campo obligatorio</span>}

    <label>Monto de Depósitos</label>
    <select
      {...register("montoDepositos", { required: true })}
      className="form-input"
    >
      <option value="">Seleccione...</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    {errors.montoDepositos && <span>Ingrese un monto válido</span>}

    <label>Origen de Recursos</label>
    <select
      {...register("origenRecursos", { required: true })}
      className="form-input"
    >
      <option value="">Seleccione...</option>
      <option value="salario">Salario</option>
      <option value="inversiones">Inversiones</option>
      <option value="otros">Otros</option>
    </select>
    {errors.origenRecursos && <span>Campo obligatorio</span>}

    <label>Destino de Recursos</label>
    <select
      {...register("destinoRecursos", { required: true })}
      className="form-input"
    >
      <option value="">Seleccione...</option>
      <option value="ahorro">Ahorro</option>
      <option value="gastos">Gastos</option>
      <option value="inversion">Inversión</option>
    </select>
    {errors.destinoRecursos && <span>Campo obligatorio</span>}
    <label>Ingresos mensuales</label>
    <input
      type="number"
      {...register("ingresomensual", { required: true, min: 1 })}
      placeholder="2400"
      className="form-input"
    />
    {errors.ingresomensual && <span>Campo obligatorio</span>}
    <label>Egresos mensuales</label>
    <input
      type="number"
      {...register("egresomensual", { required: true, min: 1 })}
      placeholder="2400"
      className="form-input"
    />
    {errors.egresomensual && <span>Campo obligatorio</span>}
  </div>
);
