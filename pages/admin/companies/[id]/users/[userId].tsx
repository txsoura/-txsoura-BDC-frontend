import { toast } from 'tailwind-toast';
import { useRouter } from 'next/router';
import { isNull } from 'underscore';
import { useCallback, useEffect, useState } from 'react';

import { withNavBarLayout } from 'components/withNavBarLayout';
import { serviceAPI } from 'services/api';
import getApiError from 'utils/isApiError';
import StatusIcon from 'components/User/StatusIcon';
import { dateFormatter } from 'utils/dateFormatter';
import { routeRole } from 'components/routeRole';
import { CompanyUserProps } from 'types/companyUser';

const Index = () => {
  const router = useRouter();
  const [user, setUser] = useState<CompanyUserProps>({} as CompanyUserProps);
  const [companyId, setCompanyId] = useState<number>();
  const [userId, setUserId] = useState<number>();

  const roleSwitch = useCallback(role => {
    switch (role) {
      case 'admin':
        return 'Admin';
      case 'owner':
        return 'Propietário';
      case 'member':
        return 'Membro';
      default:
        return role;
    }
  }, []);

  const getItem = useCallback(async () => {
    try {
      const {
        data: { data: response },
      } = await serviceAPI.get(
        `companies/${companyId}/users/${userId}?include=user`,
      );
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

  return (
    <>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-1 ml-2 mr-2">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Usuário da construtora
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Informações:</p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Id</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.id}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Nome</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.user && user.user.name}
              </dd>
            </div>
            <div className="bg-gray-50 bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.user && user.user.email}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Cargo</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.role && roleSwitch(user.role)}
              </dd>
            </div>
            <div className="bg-gray-50 bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Estado</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.user && <StatusIcon value={user.user.status} />}
              </dd>
            </div>

            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Criado em</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.created_at && dateFormatter(user.created_at)}
              </dd>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <a
                href={`/admin/companies/${companyId}/users`}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100 mr-3"
              >
                Voltar
              </a>
              <a
                href={`/admin/companies/${companyId}/users/${userId}/edit`}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Editar
              </a>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};

export default routeRole(withNavBarLayout(Index), 'admin');
