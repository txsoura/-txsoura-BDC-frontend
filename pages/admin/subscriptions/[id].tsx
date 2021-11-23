import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';
import { toast } from 'tailwind-toast';
import { useRouter } from 'next/router';
import { isNull } from 'underscore';
import { BadgeCheckIcon } from '@heroicons/react/solid';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import moment, { now } from 'moment';

import { withNavBarLayout } from 'components/withNavBarLayout';
import { SubscriptionProps } from 'types/subscription';
import { serviceAPI } from 'services/api';
import getApiError from 'utils/isApiError';
import StatusIcon from 'components/Subscription/StatusIcon';
import { currencyFormatter } from 'utils/currencyFormatter';
import { dateFormatter, dateWithoutTimeFormatter } from 'utils/dateFormatter';
import { routeRole } from 'components/routeRole';

const Index = () => {
  type ModalType = 'activate' | 'deactivate' | 'destroy';

  const router = useRouter();
  const [subscription, setSubscription] = useState<SubscriptionProps>(
    {} as SubscriptionProps,
  );
  const [id, setId] = useState<number>();
  const [modalType, setModalType] = useState<ModalType>('deactivate');
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const billingMethodSwitch = useCallback(role => {
    switch (role) {
      case 'cash':
        return 'Dinheiro';
      case 'card':
        return 'Cartão';
      case 'pix':
        return 'PIX';
      default:
        return 'Boleto';
    }
  }, []);

  const openActivate = useCallback(() => {
    setModalType('activate');
    setOpen(true);
  }, []);

  const openDeactivate = useCallback(() => {
    setModalType('deactivate');
    setOpen(true);
  }, []);

  const openDestroy = useCallback(() => {
    setModalType('destroy');
    setOpen(true);
  }, []);

  const getItem = useCallback(async () => {
    try {
      const {
        data: { data: response },
      } = await serviceAPI.get(`subscriptions/${id}?include=company`);
      setSubscription(response);
    } catch (error) {
      const errors = getApiError(error);
      toast()
        .danger('Ops!', errors.error || errors.message)
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

  const updateStatus = useCallback(
    async status => {
      try {
        const {
          data: { data: response, message },
        } = await serviceAPI.put(`subscriptions/${id}/${status}`);
        setSubscription(response);

        toast()
          .success('Wow!', message)
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
        await getItem();
      } catch (error) {
        const errors = getApiError(error);
        toast()
          .danger('Ops!', errors.error || errors.message)
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
    },
    [id, getItem],
  );

  const destroy = useCallback(async () => {
    try {
      const {
        data: { message: response },
      } = await serviceAPI.delete(`subscriptions/${id}`);

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
      await router.push('/admin/subscriptions/');
    } catch (error) {
      const errors = getApiError(error);
      toast()
        .danger('Ops!', errors.error || errors.message)
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
  }, [id, router]);

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:deactivate sm:p-0">
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
              className="hidden sm:inline-deactivate sm:align-middle sm:h-screen"
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
              <div className="inline-deactivate align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    {modalType === 'deactivate' && (
                      <>
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
                            Desativar subscrição
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Tem certeza, que pretende desativar essa
                              subscrição? A construtora perderá, acesso ao
                              sistema
                            </p>
                          </div>
                        </div>
                      </>
                    )}

                    {modalType === 'activate' && (
                      <>
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                          <BadgeCheckIcon
                            className="h-6 w-6 text-green-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-lg leading-6 font-medium text-gray-900"
                          >
                            Ativar subscrição
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Tem certeza, que pretende ativar essa subscrição?
                            </p>
                          </div>
                        </div>
                      </>
                    )}

                    {modalType === 'destroy' && (
                      <>
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
                            Apagar subscrição
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Tem certeza, que pretende apagar essa subscrição?
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  {modalType === 'deactivate' && (
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => updateStatus('deactivate')}
                    >
                      Desativar
                    </button>
                  )}

                  {modalType === 'activate' && (
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => updateStatus('activate')}
                    >
                      Ativar
                    </button>
                  )}

                  {modalType === 'destroy' && (
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => destroy()}
                    >
                      Apagar
                    </button>
                  )}
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

      <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-1 ml-2 mr-2">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Subscrição
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Informações:</p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Id</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {subscription.id}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Construtora</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {subscription.company && subscription.company.name}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Título</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {subscription.title}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Método de pagamento
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {billingMethodSwitch(subscription.billing_method)}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Valor</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {currencyFormatter(subscription.amount, subscription.currency)}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Estado</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {subscription.status && (
                  <StatusIcon value={subscription.status} />
                )}
              </dd>
            </div>
            <div className="bg-gray-50 bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Válida até</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {subscription.valid_until &&
                  dateWithoutTimeFormatter(subscription.valid_until)}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Criado em</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {subscription.created_at &&
                  dateFormatter(subscription.created_at)}
              </dd>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              {subscription.status === 'pendent' && (
                <button
                  type="button"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mr-3"
                  onClick={() => openDeactivate()}
                >
                  Desativar
                </button>
              )}

              {subscription.status !== 'active' &&
                moment(subscription.valid_until).isAfter(now()) && (
                  <button
                    type="button"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-3"
                    onClick={() => openActivate()}
                  >
                    Ativar
                  </button>
                )}

              <button
                type="button"
                onClick={() => {
                  router.push('/admin/subscriptions');
                }}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100 mr-3"
              >
                Voltar
              </button>
              <button
                type="button"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mr-3"
                onClick={() => openDestroy()}
              >
                Apagar
              </button>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};

export default routeRole(withNavBarLayout(Index), 'admin');
