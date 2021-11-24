import React, { useCallback, useRef } from 'react';
import { FormHandles, SubmitHandler } from '@unform/core';
import { isNull } from 'underscore';
import { Form } from '@unform/web';
import { useRouter } from 'next/router';
import { toast } from 'tailwind-toast';
import companyCreateSchema from 'schemas/companyCreate';
import { serviceAPI } from 'services/api';
import Header from 'components/Header';
import Input from 'components/Input';
import Select from 'components/Select';
import { withNavBarLayout } from 'components/withNavBarLayout';
import getErrors from 'utils/getErrors';
import getApiError from 'utils/isApiError';
import { routeRole } from 'components/routeRole';

const Index = () => {
  const formRef = useRef<FormHandles>(null);
  const router = useRouter();

  const typeOptions = [
    { value: 'juridical', label: 'Empresa' },
    { value: 'person', label: 'Pessoa' },
  ];

  const create: SubmitHandler = useCallback(
    async data => {
      try {
        formRef.current.setErrors({});
        await companyCreateSchema.validate(data, { abortEarly: false });

        const {
          data: { message: response },
        } = await serviceAPI.post('companies', data);

        toast()
          .success('Wow!', response)
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

        await router.push('/admin/companies');
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
      <Header title="Construtoras" />

      <div className="mt-10 sm:mt-1">
        <div className="md:grid md:grid-cols-1 md:gap-6">
          <div className="flex justify-center mt-5 md:mt-0 md:col-span-2">
            <Form ref={formRef} onSubmit={create}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <Input
                        name="name"
                        label="Nome"
                        type="text"
                        autoComplete="name"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <Input
                        name="email"
                        label="Email"
                        type="text"
                        autoComplete="email"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <Select name="type" label="Tipo" options={typeOptions} />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <Input
                        name="tax"
                        label="Cpf/Cnpj"
                        type="number"
                        autoComplete="tax"
                        required
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <Input
                        name="workspace"
                        label="Área de trabalho"
                        type="text"
                        autoComplete="workspace"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="button"
                    onClick={() => {
                      router.push('/admin/companies');
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

export default routeRole(withNavBarLayout(Index), 'admin');
