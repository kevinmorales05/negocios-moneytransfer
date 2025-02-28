import { Accionista, Empresa } from "@/types/onboarding";
import {
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldError,
} from "react-hook-form";

export interface StepsProps {
  register: UseFormRegister<Empresa>;
  errors: {
    [key: string]: FieldError | any;
  };
  watch: UseFormWatch<FieldValues> | any;
  setValue?: UseFormSetValue<FieldValues> | any;
  token?: string | "";
  append?: (value: Accionista) => void | any;
  remove?: (index: number) => void | any;
  fields?: any[]; // Or define a specific type for fields based on your structure
}

export interface FormData {
  email?: string;
  confirmEmail?: string;
  password?: string;
  confirmPassword?: string;
  businessname?: string;
  serienumber?: string;
  rfc?: string;
  numerofiscal?: string;
  businessline?: string;
  stablishmentDate?: Date;
  mobilePhone?: string;
  addressStateName?: string;
}

export interface ColoniaData {
  idState: string;
  nameState: string;
  idCity: string;
  nameCity: string;
  idSuburb: string;
  nameSuburb: string;
  postalCode: string;
}
