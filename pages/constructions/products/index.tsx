import {Fragment, useCallback, useEffect, useState} from "react";
import {useRouter} from 'next/router'
import {toast} from 'tailwind-toast'
import {ChevronLeftIcon, ChevronRightIcon, DotsVerticalIcon} from '@heroicons/react/solid'
import {Menu, Transition} from "@headlessui/react";

import Header from '/components/Header';
import {UserProps} from "/types/user";
import {MetaProps} from "/types/pagination";
import {serviceAPI} from "/services/api";
import StatusIcon from "/components/User/StatusIcon";
import getApiError from "/utils/isApiError";
import {withNavBarLayout} from "/components/withNavBarLayout";

const Index = () => {
    const router = useRouter()
    const [users, setUsers] = useState<UserProps[]>([]);
    const [meta, setMeta] = useState<MetaProps>({} as MetaProps);
    const [currentPage, setCurrentPage] = useState(1);

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

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

    const getItems = useCallback(async () => {
        try {
            const response = await serviceAPI.get(`users?paginate=10&page=${currentPage}`);
            setMeta(response.data.meta);
            setUsers(response.data.data);
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
    }, [currentPage]);

    useEffect(() => {
        getItems();
    }, [getItems]);

    return (
        <>
            <Header title='Usuários' button={true} buttonText='Criar' buttonHref='/users/create'/>

            <div className="flex flex-col mt-1">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="flex justify-center py-2 align-middle inline-block min-w-auto sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        #
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Nome
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Estado
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Cargo
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Criado em
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>

                                        <td className="px-6 py-4 whitespace-nowrap"
                                            onClick={() => router.push("/users/" + user.id)}>
                                            <div className="flex items-center">
                                                <div className="ml-4">
                                                    <div
                                                        className="text-sm font-medium text-gray-900">{user.name}</div>
                                                    <div className="text-sm text-gray-500">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <StatusIcon value={user.status}/>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{roleSwitch(user.role)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Intl.DateTimeFormat('pt-BR', {
                                                dateStyle: 'short',
                                                timeStyle: 'short',
                                            }).format(new Date(user.created_at))}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Menu as="div" className="relative inline-block text-left">
                                                <div>
                                                    <Menu.Button
                                                        className="inline-flex justify-center w-full px-4 py-2 bg-white text-sm font-medium text-indigo-700">
                                                        <DotsVerticalIcon className="h-5 w-5" aria-hidden="true"/>
                                                    </Menu.Button>
                                                </div>

                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items
                                                        className="z-10 origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <div className="py-1">
                                                            <Menu.Item>
                                                                {({active}) => (
                                                                    <button
                                                                        onClick={() => router.push("/users/" + user.id)}
                                                                        type="submit"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block w-full text-left px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        Ver
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({active}) => (
                                                                    <button
                                                                        onClick={() => router.push("/users/" + user.id + "/edit")}
                                                                        type="submit"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block w-full text-left px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        Editar
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                        </div>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <div
                                className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Mostrando <span className="font-medium">{meta.from}</span> a <span
                                            className="font-medium">{meta.to}</span> de{' '}
                                            <span className="font-medium">{meta.total}</span> resultados
                                        </p>
                                    </div>
                                    <div>
                                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                                             aria-label="Pagination">
                                            {(meta.current_page > 1) && (
                                                <a
                                                    onClick={() => setCurrentPage(meta.current_page - 1)}
                                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                                >
                                                    <span className="sr-only">Previous</span>
                                                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true"/>
                                                </a>
                                            )}
                                            <a
                                                onClick={() => setCurrentPage(meta.last_page - (meta.last_page - 1))}
                                                aria-current="page"
                                                className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                            >
                                                {meta.last_page - (meta.last_page - 1)}
                                            </a>
                                            {(meta.last_page > 2) && (
                                                <a
                                                    onClick={() => setCurrentPage(meta.last_page - (meta.last_page - 2))}
                                                    aria-current="page"
                                                    className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                                >
                                                    {meta.last_page - (meta.last_page - 2)}
                                                </a>
                                            )}
                                            {(meta.last_page > 3) && (
                                                <a
                                                    onClick={() => setCurrentPage(meta.last_page - (meta.last_page - 3))}
                                                    aria-current="page"
                                                    className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                                >
                                                    {meta.last_page - (meta.last_page - 3)}
                                                </a>
                                            )}
                                            {(meta.last_page > 9) && (
                                                <span
                                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                              ...
                                            </span>
                                            )}
                                            {(meta.current_page > 3 && meta.current_page < (meta.last_page - 3)) && (
                                                <>
                                                    {(meta.current_page > 5 && meta.current_page < (meta.last_page - 5)) && (
                                                        <a
                                                            onClick={() => setCurrentPage(meta.current_page)}
                                                            aria-current="page"
                                                            className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                                        >
                                                            {meta.current_page - 1}
                                                        </a>
                                                    )}
                                                    <a
                                                        onClick={() => setCurrentPage(meta.current_page)}
                                                        aria-current="page"
                                                        className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                                    >
                                                        {meta.current_page}
                                                    </a>
                                                    {(meta.current_page > 5 && meta.current_page < (meta.last_page - 5)) && (
                                                        <a
                                                            onClick={() => setCurrentPage(meta.current_page)}
                                                            aria-current="page"
                                                            className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                                        >
                                                            {meta.current_page + 1}
                                                        </a>
                                                    )}
                                                    <span
                                                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                                      ...
                                                    </span>
                                                </>
                                            )}
                                            {(meta.last_page > 7) && (
                                                <a
                                                    onClick={() => setCurrentPage(meta.last_page - 2)}
                                                    aria-current="page"
                                                    className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                                >
                                                    {meta.last_page - 2}
                                                </a>
                                            )}
                                            {(meta.last_page > 6) && (
                                                <a
                                                    onClick={() => setCurrentPage(meta.last_page - 1)}
                                                    aria-current="page"
                                                    className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                                >
                                                    {meta.last_page - 1}
                                                </a>
                                            )}
                                            {(meta.last_page > 5) && (
                                                <a
                                                    onClick={() => setCurrentPage(meta.last_page)}
                                                    aria-current="page"
                                                    className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                                >
                                                    {meta.last_page}
                                                </a>
                                            )}
                                            {(meta.current_page < meta.last_page) && (
                                                <a
                                                    onClick={() => setCurrentPage(meta.current_page + 1)}
                                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                                >
                                                    <span className="sr-only">Next</span>
                                                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true"/>
                                                </a>
                                            )}
                                        </nav>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withNavBarLayout(Index)
