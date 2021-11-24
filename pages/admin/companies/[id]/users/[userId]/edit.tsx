import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';
import { toast } from 'tailwind-toast';
import { useRouter } from 'next/router';
import { Form } from '@unform/web';
import { isNull } from 'underscore';
import { FormHandles, SubmitHandler } from '@unform/core';

import Header from 'components/Header';
import Select from 'components/Select';
import { withNavBarLayout } from 'components/withNavBarLayout';
import { serviceAPI } from 'services/api';
import getApiError from 'utils/isApiError';
import getErrors from 'utils/getErrors';
import { CompanyUserProps } from 'types/companyUser';
import companyUserEditSchema from 'schemas/companyUserEdit';
import { routeRole } from 'components/routeRole';

const Index = () => {
  const router = useRouter();
  const [companyId, setCompanyId] = useState<number>();
  const [userId, setUserId] = useState<number>();
  const formRef = useRef<FormHandles>(null);
  const [user, setUser] = useState<CompanyUserProps>({} as CompanyUserProps);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'member', label: 'Membro' },
    { value: 'owner', label: 'Proprietário' },
  ];

  const getItem = useCallback(async () => {
    try {
      const {
        data: { data: response },
      } = await serviceAPI.get(`companies/${companyId}/users/${userId}`);
      setUser(response);
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
  }, [companyId, userId]);

  useEffect(() => {
    if (router && !isNull(router.query)) {
      setCompanyId(Number(router.query.id));
      setUserId(Number(router.query.userId));
    }
  }, [router]);

  useEffect(() => {
    if (companyId && userId) {
      getItem();
    }
  }, [companyId, userId, getItem]);

  const edit: SubmitHandler = useCallback(
    async data => {
      try {
        formRef.current.setErrors({});
        await companyUserEditSchema.validate(data, { abortEarly: false });

        const {
          data: { message: response },
        } = await serviceAPI.put(
          `companies/${companyId}/users/${userId}`,
          data,
        );

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

        await router.push(`/admin/companies/${companyId}/users/${userId}`);
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
    [companyId, userId, router],
  );

  const destroy = useCallback(async () => {
    try {
      const {
        data: { message: response },
      } = await serviceAPI.delete(`companies/${companyId}/users/${userId}`);

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

      setOpen(false);
      await router.push(`/admin/companies/${companyId}/users`);
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
  }, [companyId, userId, router]);

  return (
    <>
      <Header title="Usuário da construtora" />

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            />

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Apagar usuário
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Tem certeza, que pretende apagar esse usuário?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => destroy()}
                  >
                    Apagar
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="mt-10 sm:mt-1">
        <div className="md:grid md:grid-cols-1 md:gap-6">
          <div className="flex justify-center mt-5 md:mt-0 md:col-span-2">
            <Form ref={formRef} onSubmit={edit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <Select
                        name="role"
                        label="Cargo"
                        defaultValue={user.role}
                        options={roleOptions}
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="button"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mr-3"
                    onClick={() => setOpen(true)}
                  >
                    Apagar
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      router.push('/admin/users');
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
