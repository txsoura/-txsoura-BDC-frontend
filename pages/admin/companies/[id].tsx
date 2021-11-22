import { Tab } from '@headlessui/react';
import { toast } from 'tailwind-toast';
import { useRouter } from 'next/router';
import { isNull } from 'underscore';
import { useCallback, useEffect, useState } from 'react';

import { withNavBarLayout } from 'components/withNavBarLayout';
import CompanyTab from 'components/Company/Tabs';
import AddressTab from 'components/Company/Tabs/address';
import { CompanyProps } from 'types/company';
import { serviceAPI } from 'services/api';
import getApiError from 'utils/isApiError';
import { routeRole } from 'components/routeRole';

const Index = () => {
  const router = useRouter();
  const [company, setCompany] = useState<CompanyProps>({} as CompanyProps);
  const [id, setId] = useState<number>();

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

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-1 ml-2 mr-2">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Construtora
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Informações:</p>
      </div>
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
          <Tab
            className={({ selected }) =>
              classNames(
                'bg-white inline-block py-2 px-4 focus:outline-none hover:text-purple-500',
                selected
                  ? 'border-l border-t border-r rounded-t font-semibold'
                  : 'hover:text-blue-darker',
              )
            }
          >
            Construtora
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'bg-white inline-block py-2 px-4 focus:outline-none hover:text-purple-500',
                selected
                  ? 'border-l border-t border-r rounded-t font-semibold'
                  : 'hover:text-blue-darker',
              )
            }
          >
            Endereço
          </Tab>
          <button
            className="bg-white inline-block py-2 px-4 focus:outline-none hover:text-purple-500 hover:text-blue-darker"
            type="button"
            onClick={() => router.push(`/admin/companies/${company.id}/users`)}
          >
            Usuários
          </button>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel>
            <CompanyTab company={company} getItem={getItem} />
          </Tab.Panel>
          <Tab.Panel>
            <AddressTab company={company} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default routeRole(withNavBarLayout(Index), 'admin');
