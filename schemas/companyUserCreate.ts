import * as Yup from 'yup';

const companyUserCreateSchema = Yup.object().shape({
    user_id: Yup.string().ensure().required('Este campo, é obrigatório'),
    role: Yup.string().ensure().required('Este campo, é obrigatório'),
});

export default companyUserCreateSchema;
