import * as Yup from 'yup';

const companyCreateSchema = Yup.object().shape({
  name: Yup.string()
    .required('Este campo, é obrigatório')
    .max(255, 'Este campo deve ter no máximo 255 caracteres'),
  type: Yup.string().ensure().required('Este campo, é obrigatório'),
  tax: Yup.number()
    .required('Este campo, é obrigatório')
    .positive('Este campo, não pode receber números abaixo de 0')
    .integer('Este campo não pode incluir um ponto decimal'),
  workspace: Yup.string()
    .required('Este campo, é obrigatório')
    .max(30, 'Este campo deve ter no máximo 30 caracteres'),
  email: Yup.string()
    .email('Este campo, deve ser um email válido')
    .required('Este campo, é obrigatório')
    .max(255, 'Este campo, deve ter no máximo 255 caracteres'),
});

export default companyCreateSchema;
