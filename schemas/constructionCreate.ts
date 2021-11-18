import * as Yup from 'yup';

const constructionCreateSchema = Yup.object().shape({
    name: Yup.string().required('Este campo, é obrigatório').max(255, 'Este campo deve ter no máximo 255 caracteres'),
    date_start: Yup.date().required('Este campo, é obrigatório'),
    date_end: Yup.date().required('Este campo, é obrigatório'),
    budget: Yup.number().required('Este campo, é obrigatório').positive('Este campo, não pode receber valores abaixo de 0'),
});

export default constructionCreateSchema;
