import * as Yup from 'yup';

export default function getErrors(error) {
    if (error instanceof Yup.ValidationError) {
        const validationErrors = {};

        error.inner.forEach(err => {
            validationErrors[err.path] = err.message;
        });

        return validationErrors;
    }

    if (error.response) {
        if (error.response.status === 422 && error.response.data.errors) {
            const validationErrors = {};
            const {errors} = error.response.data;

            const formatError = Object.entries(errors);

            formatError.forEach(err => {
                validationErrors[err[0]] = err[1][0];
            });

            return validationErrors;
        }
    }

    return null;
}
