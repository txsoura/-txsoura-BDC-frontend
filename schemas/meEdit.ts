import * as Yup from 'yup';

const meEditSchema = Yup.object().shape({
    name: Yup.string().required('Este campo, é obrigatório').max(255, 'Este campo deve ter no máximo 255 caracteres'),
    email: Yup.string().email('Este campo, deve ser um email válido').required('Este campo, é obrigatório').max(255, 'Este campo, deve ter no máximo 255 caracteres'),
});

export default meEditSchema;
