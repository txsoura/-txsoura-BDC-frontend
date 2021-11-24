import * as Yup from 'yup';

const mePasswordEditSchema = Yup.object().shape({
  current_password: Yup.string()
    .required('Este campo, é obrigatório')
    .min(8, 'Este campo deve ter no mínimo 8 caracteres')
    .max(255, 'Este campo deve ter no máximo 255 caracteres'),
  password: Yup.string()
    .required('Este campo, é obrigatório')
    .min(8, 'Este campo deve ter no mínimo 8 caracteres')
    .max(255, 'Este campo deve ter no máximo 255 caracteres'),
  password_confirmation: Yup.string()
    .required('Este campo, é obrigatório')
    .min(8, 'Este campo deve ter no mínimo 8 caracteres')
    .max(255, 'Este campo deve ter no máximo 255 caracteres'),
});

export default mePasswordEditSchema;
