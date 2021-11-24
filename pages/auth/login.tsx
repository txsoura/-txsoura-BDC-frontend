import React, { useCallback, useRef } from 'react';
import { LockClosedIcon } from '@heroicons/react/solid';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import { toast } from 'tailwind-toast';
import { isNull } from 'underscore';
import { useRouter } from 'next/router';

import { useAuth } from 'hooks/auth';
import getErrors from 'utils/getErrors';
import CustomInput from 'components/Input/custom';
import loginSchema from 'schemas/login';
import getApiError from 'utils/isApiError';

const Index = () => {
  const router = useRouter();
  const { login } = useAuth();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit: SubmitHandler = useCallback(
    async data => {
      formRef.current.setErrors({});

      try {
        await loginSchema.validate(data, { abortEarly: false });

        await login(data);

        toast()
          .success('Wow!', 'Bem vindo!')
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

        await router.push('/dashboard');
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
    [login, router],
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
            Faça login em sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ou{' '}
            <button
              type="button"
              onClick={() => {
                router.push('/company/register');
              }}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              teste por 14 dias gratuitamente
            </button>
          </p>
        </div>
        <Form ref={formRef} className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <CustomInput
              name="email"
              label="Email"
              type="text"
              autoComplete="email"
              placeholder="Email"
              labelClassName="sr-only"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />

            <CustomInput
              name="password"
              label="Senha"
              type="password"
              autoComplete="password"
              placeholder="Senha"
              labelClassName="sr-only"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <button
                type="button"
                onClick={() => {
                  router.push('/auth/forgot-password');
                }}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Esqueceu sua senha?
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
              Entrar
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Index;
