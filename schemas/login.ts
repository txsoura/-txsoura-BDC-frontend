import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Digite um e-mail válido')
    .required('Este campo, é obrigatório')
    .max(255, 'Este campo deve ter no máximo 255 caracteres'),
  password: Yup.string()
    .min(8, 'Este campo, deve ter no mínimo 8 caracteres')
    .required('Este campo, é obrigatório'),
});

export default loginSchema;
