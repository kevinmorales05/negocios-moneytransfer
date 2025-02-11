import "../styles/singup.css"; // Suponiendo que agregarás estilos en este archivo.
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { StepOne } from "../components/steps/step1/step1";
import { StepTwo } from "../components/steps/step2/step2";
import { StepThree } from "../components/steps/step3/step3";
import { StepFour } from "../components/steps/step4/step4";
import { StepFive } from "../components/steps/step5/step5";
import StepAccionistas from "../components/steps/step6/step6";
import { StepCargaDocumentos } from "../components/steps/step7/step7";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      accionistas: [
        { nombre: "", rfc: "", porcentaje: "", capital: "", pep: "" },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "accionistas",
  });

  const accionistas = watch("accionistas");

  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps: number = 7;

  //valida los campos cada vez que salta a otro paso
  const nextStep = async () => {
    const valid = await trigger(); // Valida todos los campos del formulario
    console.log('validando campos ', valid)
    if (valid) {
      setStep((prev) => (prev < totalSteps ? prev + 1 : prev));
    }
  };
  //permite navegar hacia atrás
  const prevStep = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const onSubmit = (data) => {
    console.log('informacion a procesar', data);
    if (!validarPorcentaje()) {
      alert("El porcentaje total debe ser 100%");
      return;
    }
    //if everything is ok goes to the next step
    //navigate("/dashboard");
  };
  //valida el porcentaje de los accionistas
  const validarPorcentaje = () => {
    const total = accionistas.reduce(
      (sum, acc) => sum + Number(acc.porcentaje || 0),
      0
    );
    return total === 100;
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        <h2>Sign Up</h2>
        {step === 1 && <StepOne register={register} errors={errors} />}
        {step === 2 && <StepTwo register={register} errors={errors} />}

        {step === 3 && <StepThree register={register} errors={errors} />}
        {step === 4 && <StepFour register={register} errors={errors} />}

        {step === 5 && <StepFive register={register} errors={errors} />}

        {step === 6 && (
          <StepAccionistas
            register={register}
            errors={errors}
            fields={fields}
            append={append}
            remove={remove}
          />
        )}
        {step === 7 && (
          <StepCargaDocumentos register={register} errors={errors} />
        )}
        <div className="form-navigation">
          {step > 1 && (
            <button type="button" className="nav-button" onClick={prevStep}>
              Anterior
            </button>
          )}
          {step < totalSteps && (
            <button type="button" className="nav-button" onClick={nextStep}>
              Siguiente
            </button>
          )}
          {step === totalSteps && (
            <button type="submit" className="submit-button">
              Enviar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Signup;
