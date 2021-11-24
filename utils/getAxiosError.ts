import { AxiosError } from 'axios';

export default function getAxiosError(error) {
  const err = error as AxiosError;

  if (err.response) {
    return err;
  }
}
