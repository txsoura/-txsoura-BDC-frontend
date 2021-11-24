import * as Yup from 'yup';

const companyAddressEditSchema = Yup.object().shape({
  cellphone: Yup.number()
    .positive('Este campo, não pode receber números abaixo de 0')
    .integer('Este campo não pode incluir um ponto decimal')
    .nullable(true)
    .transform(val => (val === val ? val : null))
    .transform(v => (v === '' ? null : v)),

  street: Yup.string().max(255, 'Este campo deve ter no máximo 255 caracteres'),
  postcode: Yup.string().max(
    255,
    'Este campo deve ter no máximo 255 caracteres',
  ),
  number: Yup.string().max(255, 'Este campo deve ter no máximo 255 caracteres'),
  complement: Yup.string().max(
    255,
    'Este campo deve ter no máximo 255 caracteres',
  ),
  city: Yup.string().max(255, 'Este campo deve ter no máximo 255 caracteres'),
  state: Yup.string().max(255, 'Este campo deve ter no máximo 255 caracteres'),
  country: Yup.string().max(
    255,
    'Este campo deve ter no máximo 255 caracteres',
  ),
  district: Yup.string().max(
    255,
    'Este campo deve ter no máximo 255 caracteres',
  ),
});

export default companyAddressEditSchema;
