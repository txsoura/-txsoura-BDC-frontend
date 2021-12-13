import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles, SubmitHandler } from '@unform/core';
import { isNull } from 'underscore';
import { Form } from '@unform/web';
import { useRouter } from 'next/router';
import { toast } from 'tailwind-toast';

import { serviceAPI } from 'services/api';
import Header from 'components/Header';
import Input from 'components/Input';
import Select from 'components/Select';
import { withNavBarLayout } from 'components/withNavBarLayout';
import getErrors from 'utils/getErrors';
import getApiError from 'utils/isApiError';
import subscriptionCreateSchema from 'schemas/subscriptionCreate';
import { CompanyProps } from 'types/company';
import { OptionsProps } from 'types/options';
import { routeRole } from 'components/routeRole';

const Index = () => {
  const formRef = useRef<FormHandles>(null);
  const router = useRouter();
  const [companies, setCompanies] = useState<CompanyProps[]>([]);

  const billingMethodOptions = [
    { value: 'cash', label: 'Dinheiro' },
    { value: 'card', label: 'Cartão' },
    { value: 'pix', label: 'PIX' },
    { value: 'boleto', label: 'Boleto' },
  ];

  const handleOptions = useCallback((field: Array<any>) => {
    const options: OptionsProps[] = [];

    if (field) {
      field.map(option =>
        options.push({
          label: option.name,
          value: option.id,
        }),
      );
    }

    return options;
  }, []);

  const getItems = useCallback(async () => {
    try {
      const {
        data: { data: response },
      } = await serviceAPI.get('companies?status=approved');
      setCompanies(response);
    } catch (error) {
      const errors = getApiError(error);
      toast()
        .danger('Ops!', errors.error ? errors.error : errors.message)
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
  }, []);

  useEffect(() => {
    getItems();
  }, [getItems]);

  const create: SubmitHandler = useCallback(
    async data => {
      try {
        formRef.current.setErrors({});
        await subscriptionCreateSchema.validate(data, { abortEarly: false });

        const {
          data: { message: response },
        } = await serviceAPI.post('subscriptions', data);

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

        await router.push('/admin/subscriptions');
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
      <Header title="Subscrições" />

      <div className="mt-10 sm:mt-1">
        <div className="md:grid md:grid-cols-1 md:gap-6">
          <div className="flex justify-center mt-5 md:mt-0 md:col-span-2">
            <Form ref={formRef} onSubmit={create}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <Input
                        name="title"
                        label="Título"
                        type="text"
                        autoComplete="title"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <Input
                        name="valid_until"
                        label="Validade"
                        type="date"
                        required
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <Input
                        name="amount"
                        label="Valor"
                        type="number"
                        autoComplete="amount"
                        required
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <Select
                        name="billing_method"
                        label="Método de pagamento"
                        options={billingMethodOptions}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <Select
                        name="company_id"
                        label="Empresa"
                        options={handleOptions(companies)}
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="button"
                    onClick={() => {
                      router.push('/admin/subscriptions');
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
