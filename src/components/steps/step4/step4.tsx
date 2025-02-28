import "../../../styles/singup.css";
import { StepsProps } from "../types";

export const StepFour: React.FC<StepsProps> = ({ register, errors }) => (
  <div className="form-step">
    <h2>Perfil Transaccional</h2>
    <label>Origen de Recursos</label>
    <select
      {...register("keyResourceOrigin", { required: true })}
      className="form-input"
    >
      <option value="">Seleccione...</option>
      <option value="10">Aumento de Capital</option>
      <option value="11">Dividendos</option>
      <option value="12">Inversiones</option>
      <option value="13">Venta de Productos</option>
      <option value="14">Venta de Servicios</option>
      <option value="15">Patrimonio de los socios</option>
      <option value="16">Aportación de los socios</option>
    </select>
    {errors.keyResourceOrigin && <span>Campo obligatorio</span>}

    <label>Destino de Recursos</label>
    <select
      {...register("keyResourceDestination", { required: true })}
      className="form-input"
    >
      <option value="">Seleccione...</option>
      <option value="9">Inversiones</option>
      <option value="10">Reinversión en el negocio</option>
      <option value="11">Gasto corriente</option>
      <option value="12">Gastos fijos</option>
      <option value="13">Pago a proveedores</option>
    </select>
    {errors.keyResourceDestination && <span>Campo obligatorio</span>}
    
    <label>Número de Retiros Mensuales</label>
    <select
      {...register("keyMonthlyWithdrawalTransfers", { required: true })}
      className="form-input"
    >
      <option value="">Seleccione...</option>
      <option value="5">1-25</option>
      <option value="6">26-50</option>
      <option value="7">51-75</option>
      <option value="8">más de 75</option>
    </select>
    {errors.keyMonthlyWithdrawalTransfers && <span>Campo obligatorio</span>}

    <label>Monto de Retiros Mensual</label>
    <select
      {...register("keyMonthlyWithdrawalAmounts", { required: true })}
      className="form-input"
    >
      <option value="">Seleccione...</option>
      <option value="8">$1.00 a $100,000.00</option>
      <option value="5">$100,001.00 a $200,000.00</option>
      <option value="6">$200,001.00 a $300,000.00</option>
      <option value="7">Más de $300,000.00</option>
    </select>
    {errors.keyMonthlyWithdrawalAmounts && <span>Ingrese un monto válido</span>}

    <label>Número de Depósitos</label>
    <select
      {...register("keyMonthlyDepositTransfers", { required: true })}
      className="form-input"
    >
      <option value="">Seleccione...</option>
      <option value="5">1-25</option>
      <option value="6">26-50</option>
      <option value="7">51-75</option>
      <option value="8">más de 75</option>
    </select>
    {errors.keyMonthlyDepositTransfers && <span>Campo obligatorio</span>}

    <label>Monto de Depósitos</label>
    <select
      {...register("keyMonthlyDepositAmounts", { required: true })}
      className="form-input"
    >
      <option value="">Seleccione...</option>
      <option value="5">$1.00 a $100,000.00</option>
      <option value="6">$100,001.00 a $200,000.00</option>
      <option value="7">$200,001.00 a $300,000.00</option>
      <option value="8">Más de $300,000.00</option>
    </select>
    {errors.keyMonthlyDepositAmounts && <span>Ingrese un monto válido</span>}

    <label>Ingresos mensuales</label>
    <input
      type="number"
      {...register("monthlyincome", { required: true, min: 1 })}
      placeholder="2400"
      className="form-input"
    />
    {errors.monthlyincome && <span>Campo obligatorio</span>}
    <label>Egresos mensuales</label>
    <input
      type="number"
      {...register("monthlyexpend", { required: true, min: 1 })}
      placeholder="2400"
      className="form-input"
    />
    {errors.monthlyexpend && <span>Campo obligatorio</span>}
  </div>
);
