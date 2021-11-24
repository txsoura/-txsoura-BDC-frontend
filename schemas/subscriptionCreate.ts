import * as Yup from 'yup';

const today = new Date().toUTCString();

const subscriptionCreateSchema = Yup.object().shape({
  title: Yup.string()
    .required('Este campo, é obrigatório')
    .max(255, 'Este campo deve ter no máximo 255 caracteres'),
  billing_method: Yup.string().ensure().required('Este campo, é obrigatório'),
  valid_until: Yup.date()
    .required('Este campo, é obrigatório')
    .min(today, 'Este campo, deve receber uma data maior que hoje'),
  amount: Yup.number()
    .required('Este campo, é obrigatório')
    .positive('Este campo, não pode receber valores abaixo de 0'),
  company_id: Yup.string().ensure().required('Este campo, é obrigatório'),
});

export default subscriptionCreateSchema;
