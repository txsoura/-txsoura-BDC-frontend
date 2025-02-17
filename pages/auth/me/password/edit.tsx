import React, { useCallback, useRef } from 'react';
import { toast } from 'tailwind-toast';
import { useRouter } from 'next/router';
import { Form } from '@unform/web';
import { isNull } from 'underscore';
import { FormHandles, SubmitHandler } from '@unform/core';

import Header from 'components/Header';
import Input from 'components/Input';
import { withNavBarLayout } from 'components/withNavBarLayout';
import getApiError from 'utils/isApiError';
import mePasswordEditSchema from 'schemas/mePasswordEdit';
import getErrors from 'utils/getErrors';
import { authAPI } from 'services/api';

const Index = () => {
  const router = useRouter();
  const formRef = useRef<FormHandles>(null);

  const edit: SubmitHandler = useCallback(
    async data => {
      try {
        formRef.current.setErrors({});
        await mePasswordEditSchema.validate(data, { abortEarly: false });

        const response = await authAPI.put('auth/user/password', data);

        toast()
          .success('Wow!', response.data ? response.data.message : 'Atualizado')
          .with({
            duration: 4000,
            speed: 1000,
            positionX: 'end',
            positionY: 'top',
            color: 'bg-green-600',
            fontColor: 'black',
            fontTone: 300,
          })
          .show();

        await router.push('/auth/me');
      } catch (error) {
        const errors = getErrors(error);

        if (!isNull(errors)) {
          formRef.current.setErrors(errors);
        }

        const { isApi, error: apiError, message } = getApiError(error);

        if (isApi) {
          toast()
            .danger('Ops!', apiError || message)
            .with({
              duration: 4000,
              speed: 1000,
              positionX: 'end',
              positionY: 'top',
              color: 'bg-red-600',
              fontColor: 'black',
              fontTone: 300,
            })
            .show();
        }
      }
    },
    [router],
  );

  return (
    <>
      <Header title="Senha" />

      <div className="mt-10 sm:mt-1">
        <div className="md:grid md:grid-cols-1 md:gap-6">
          <div className="flex justify-center mt-5 md:mt-0 md:col-span-2">
            <Form ref={formRef} onSubmit={edit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <Input
                        name="current_password"
                        label="Senha atual"
                        type="password"
                        autoComplete="current_password"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <Input
                        name="password"
                        label="Nova senha"
                        type="password"
                        autoComplete="password"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <Input
                        name="password_confirmation"
                        label="Confirmação da nova senha"
                        type="password"
                        autoComplete="password_confirmation"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="button"
                    onClick={() => {
                      router.push('/auth/me');
                    }}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100 mr-3"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default withNavBarLayout(Index);
