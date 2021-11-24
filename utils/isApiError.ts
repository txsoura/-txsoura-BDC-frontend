export default function getApiError(error: any) {
  const errorObject = {
    isApi: false,
    error: null,
    message: 'Aconteceu um erro',
    status: null,
  };

  if (error.response) {
    if (error.response.data) {
      errorObject.isApi = true;
      errorObject.error = error.response.data.error;
      errorObject.message = error.response.data.message;
      errorObject.status = error.response.status;

      return errorObject;
    }
  }

  return errorObject;
}
