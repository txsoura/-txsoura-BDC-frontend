import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'tailwind-toast';
import { useRouter } from 'next/router';
import { Form } from '@unform/web';
import { isNull } from 'underscore';
import { FormHandles, SubmitHandler } from '@unform/core';

import Header from 'components/Header';
import Input from 'components/Input';
import { withNavBarLayout } from 'components/withNavBarLayout';
import { routeRole } from 'components/routeRole';
import { CompanyProps } from 'types/company';
import { serviceAPI } from 'services/api';
import getApiError from 'utils/isApiError';
import getErrors from 'utils/getErrors';
import companyAddressEditSchema from 'schemas/companyAddressEdit';

const Index = () => {
  const router = useRouter();
  const [id, setId] = useState<number>();
  const formRef = useRef<FormHandles>(null);
  const [company, setCompany] = useState<CompanyProps>({} as CompanyProps);

  const getItem = useCallback(async () => {
    try {
      const {
        data: { data: response },
      } = await serviceAPI.get(`companies/${id}`);
      setCompany(response);
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
  }, [id]);

  useEffect(() => {
    if (router && !isNull(router.query)) {
      setId(Number(router.query.id));
    }
  }, [router]);

  useEffect(() => {
    if (id) {
      getItem();
    }
  }, [id, getItem]);

  const edit: SubmitHandler = useCallback(
    async data => {
      try {
        formRef.current.setErrors({});
        await companyAddressEditSchema.validate(data, { abortEarly: false });

        const {
          data: { message: response },
        } = await serviceAPI.put(`companies/${id}`, data);

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

        await router.push(`/admin/companies/${id}`);
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
    [id, router],
  );

  return (
    <>
      <Header title="Construtora" />

      <div className="mt-10 sm:mt-1">
        <div className="md:grid md:grid-cols-1 md:gap-6">
          <div className="flex justify-center mt-5 md:mt-0 md:col-span-2">
            <Form ref={formRef} onSubmit={edit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <Input
                        name="street"
                        label="Rua/Avenida"
                        type="text"
                        autoComplete="street"
                        defaultValue={company.street}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <Input
                        name="postcode"
                        label="Cep"
                        type="text"
                        autoComplete="postcode"
                        defaultValue={company.postcode}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <Input
                        name="number"
                        label="Número"
                        type="text"
                        autoComplete="number"
                        defaultValue={company.number}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <Input
                        name="complement"
                        label="Complemento"
                        type="text"
                        autoComplete="complement"
                        defaultValue={company.complement}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <Input
                        name="district"
                        label="Bairro"
                        type="text"
                        autoComplete="district"
                        defaultValue={company.district}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <Input
                        name="city"
                        label="Cidade"
                        type="text"
                        autoComplete="city"
                        defaultValue={company.city}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <Input
                        name="state"
                        label="Estado/Província"
                        type="text"
                        autoComplete="state"
                        defaultValue={company.state}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <Input
                        name="country"
                        label="País"
                        type="text"
                        autoComplete="country"
                        defaultValue={company.country}
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
