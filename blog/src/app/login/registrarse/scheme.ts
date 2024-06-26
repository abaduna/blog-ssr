import * as  Yup from "yup"


export const loginSchema = Yup.object({
    user: Yup.string().required('Campo requerido'),
    password: Yup.string()
      .min(2, "El campo password debe tener al menos 3 caracteres")
      .required("El campo password es obligatorio"),
  });