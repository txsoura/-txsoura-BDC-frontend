import {useCallback} from "react";

import {withNavBarLayout} from '/components/withNavBarLayout';
import {useAuth} from "/hooks/auth";
import StatusIcon from "/components/User/StatusIcon";
import {dateFormatter} from "/utils/dateFormatter";

const Index = () => {
    const {user} = useAuth();

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

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-1 ml-2 mr-2">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Perfil</h3>
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
                            {user.created_at && (dateFormatter(user.created_at))}
                        </dd>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <a href="/dashboard"
                           className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100 mr-3"
                        >
                            Voltar
                        </a>
                        <a
                            href="/auth/me/edit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
                        >
                            Editar
                        </a>
                        <a
                            href="/auth/me/password/edit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        >
                            Alterar senha
                        </a>
                    </div>
                </dl>
            </div>
        </div>
    )
}

export default withNavBarLayout(Index)
