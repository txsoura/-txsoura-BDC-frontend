import React, { useCallback, useRef } from 'react';
import { LockClosedIcon } from '@heroicons/react/solid';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import { toast } from 'tailwind-toast';
import { useRouter } from 'next/router';

import getErrors from 'utils/getErrors';
import { isNull } from 'underscore';
import CustomInput from 'components/Input/custom';
import getApiError from 'utils/isApiError';
import Select from 'components/Select';
import companyCreateSchema from 'schemas/companyCreate';
import { authAPI } from 'services/api';

const Index = () => {
  const router = useRouter();
  const formRef = useRef<FormHandles>(null);

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
        } = await authAPI.post('api/v1/company/register', data);

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

        await router.push('/auth/login');
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Faça o cadastro, e controle as suas construções facilmente
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Você poderá testar gratuitamente por 14 dias
          </p>
        </div>
        <Form ref={formRef} className="mt-8 space-y-6" onSubmit={create}>
          <div className="rounded-md shadow-sm -space-y-px">
            <Select name="type" label="Tipo" options={typeOptions} />

            <CustomInput
              name="tax"
              label="Cpf ou Cnpj"
              type="number"
              autoComplete="cpf-cnpj"
              placeholder="Cpf ou Cnpj"
              labelClassName="sr-only"
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              required
            />

            <CustomInput
              name="name"
              label="Nome"
              type="text"
              autoComplete="name"
              placeholder="Nome"
              labelClassName="sr-only"
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />

            <CustomInput
              name="email"
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="Email"
              labelClassName="sr-only"
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />

            <CustomInput
              name="workspace"
              label="Usuário"
              type="text"
              autoComplete="workspace"
              placeholder="Usuário"
              labelClassName="sr-only"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <button
                type="button"
                onClick={() => {
                  router.push('/auth/login');
                }}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Entrar
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Cadastrar
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Index;
