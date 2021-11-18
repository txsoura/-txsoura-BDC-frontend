import * as Yup from 'yup';

const userEditSchema = Yup.object().shape({
    name: Yup.string().required('Este campo, é obrigatório').max(255, 'Este campo deve ter no máximo 255 caracteres'),
    role: Yup.string().ensure().required('Este campo, é obrigatório'),
});

export default userEditSchema;
