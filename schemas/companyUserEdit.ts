import * as Yup from 'yup';

const companyUserEditSchema = Yup.object().shape({
  role: Yup.string().ensure().required('Este campo, é obrigatório'),
});

export default companyUserEditSchema;
