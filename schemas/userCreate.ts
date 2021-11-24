import * as Yup from 'yup';

const userCreateSchema = Yup.object().shape({
  name: Yup.string()
    .required('Este campo, é obrigatório')
    .max(255, 'Este campo deve ter no máximo 255 caracteres'),
  email: Yup.string()
    .email('Este campo, deve ser um email válido')
    .required('Este campo, é obrigatório')
    .max(255, 'Este campo, deve ter no máximo 255 caracteres'),
  role: Yup.string().ensure().required('Este campo, é obrigatório'),
});

export default userCreateSchema;
