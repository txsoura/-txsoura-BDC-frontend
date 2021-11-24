import {Dialog, Transition} from "@headlessui/react";
import {ExclamationIcon} from "@heroicons/react/outline";
import {toast} from 'tailwind-toast'
import {useRouter} from "next/router";
import {isNull} from 'underscore';
import {BadgeCheckIcon} from "@heroicons/react/solid";
import {Fragment, useCallback, useEffect, useRef, useState} from "react";

import {withNavBarLayout} from '/components/withNavBarLayout';
import {UserProps} from "/types/user";
import {serviceAPI} from "/services/api";
import getApiError from "/utils/isApiError";
import StatusIcon from "/components/User/StatusIcon";

const Index = () => {
    type ModalType = 'approve' | 'block';

    const router = useRouter();
    const [user, setUser] = useState<UserProps>({} as UserProps);
    const [id, setId] = useState<number>();
    const [modalType, setModalType] = useState<ModalType>('block');
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)

    const roleSwitch = useCallback(role => {
        switch (role) {
            case 'admin':
                return 'Admin';
            case 'user':
                return 'Usuário';
            default:
                return role;
        }
    }, []);

    const openApproved = useCallback(() => {
        setModalType('approve');
        setOpen(true);
    }, []);

    const openBlock = useCallback(() => {
        setModalType('block');
        setOpen(true);
    }, []);

    const getItem = useCallback(async () => {
        try {
            const response = await serviceAPI.get(`users/${id}`);
            setUser(response.data.data);
        } catch (error) {
            error = (getApiError(error));
            toast().danger("Ops!", error.error ? error.error : error.message)
                .with({
                    duration: 4000,
                    speed: 1000,
                    positionX: 'end',
                    positionY: 'top',
                    color: "bg-red-600",
                    fontColor: "black",
                    fontTone: 300
                }).show()
        }
    }, [id]);

    useEffect(() => {
        if (router && !isNull(router.query)) {
            setId(Number(router.query.id))
        }
    }, [router]);

    useEffect(() => {
        if(id){
            getItem()
        }
    }, [id,getItem]);

    const updateStatus = useCallback(
        async status => {
            try {
                const response = await serviceAPI.put(
                    `users/${id}/${status}`,
                );
                setUser(response.data.data);

                toast().success("Wow!", response.data.message)
                    .with({
                        duration: 4000,
                        speed: 1000,
                        positionX: 'end',
                        positionY: 'top',
                        color: "bg-green-600",
                        fontColor: "black",
                        fontTone: 300
                    }).show()

                setOpen(false);
                await getItem();
            } catch (error) {
                error = (getApiError(error));
                toast().danger("Ops!", error.error ? error.error : error.message)
                    .with({
                        duration: 4000,
                        speed: 1000,
                        positionX: 'end',
                        positionY: 'top',
                        color: "bg-red-600",
                        fontColor: "black",
                        fontTone: 300
                    }).show()
            }
        },
        [id, getItem],
    );

    return (
        <>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef}
                        onClose={setOpen}>
                    <div
                        className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                        </Transition.Child>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"/>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div
                                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        {modalType === "block" && (
                                            <>
                                                <div
                                                    className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                    <ExclamationIcon className="h-6 w-6 text-red-600"
                                                                     aria-hidden="true"/>
                                                </div>
                                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                    <Dialog.Title as="h3"
                                                                  className="text-lg leading-6 font-medium text-gray-900">
                                                        Bloquear usuário
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-gray-500">
                                                            Tem certeza, que pretende bloquear esse usuário? Ele
                                                            perderá, acesso ao sistema
                                                        </p>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {modalType === "approve" && (
                                            <>
                                                <div
                                                    className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                                    <BadgeCheckIcon className="h-6 w-6 text-green-600"
                                                                    aria-hidden="true"/>
                                                </div>
                                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                    <Dialog.Title as="h3"
                                                                  className="text-lg leading-6 font-medium text-gray-900">
                                                        Aprovar usuário
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-gray-500">
                                                            Tem certeza, que pretende aprovar esse usuário?
                                                        </p>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    {modalType === "block" && (
                                        <button
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => updateStatus('block')}
                                        >
                                            Bloquear
                                        </button>
                                    )}

                                    {modalType === "approve" && (
                                        <button
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => updateStatus('approve')}
                                        >
                                            Aprovar
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
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Usuário</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Informações:</p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Id</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.id}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Nome</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.name}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Email</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.email}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Cargo</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{roleSwitch(user.role)}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Estado</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {user.status && (<StatusIcon value={user.status}/>)}
                            </dd>
                        </div>

                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Criado em</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {user.created_at && (new Intl.DateTimeFormat('pt-BR', {
                                    dateStyle: 'short',
                                    timeStyle: 'short',
                                }).format(new Date(user.created_at)))}
                            </dd>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            {user.status !== "blocked" && (
                                <button
                                    type="button"
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mr-3"
                                    onClick={() => openBlock()}
                                >
                                    Bloquear
                                </button>
                            )}

                            {user.status !== "approved" && (
                                <button
                                    type="button"
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-3"
                                    onClick={() => openApproved()}
                                >
                                    Aprovar
                                </button>
                            )}

                            <a href="/users"
                               className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100 mr-3"
                            >
                                Voltar
                            </a>
                            <a
                                href={`/users/${user.id}/edit`}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Editar
                            </a>
                        </div>
                    </dl>
                </div>
            </div>
        </>
    )
}

export default withNavBarLayout(Index)
