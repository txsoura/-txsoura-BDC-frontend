import { Fragment, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'tailwind-toast';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsVerticalIcon,
} from '@heroicons/react/solid';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';

import Header from 'components/Header';
import { CompanyProps } from 'types/company';
import { MetaProps } from 'types/pagination';
import { serviceAPI } from 'services/api';
import StatusIcon from 'components/Company/StatusIcon';
import getApiError from 'utils/isApiError';
import { withNavBarLayout } from 'components/withNavBarLayout';
import { dateFormatter } from 'utils/dateFormatter';
import { routeRole } from 'components/routeRole';

const Index = () => {
  const router = useRouter();
  const [companies, setCompanies] = useState<CompanyProps[]>([]);
  const [meta, setMeta] = useState<MetaProps>({} as MetaProps);
  const [currentPage, setCurrentPage] = useState(1);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const typeSwitch = useCallback(type => {
    switch (type) {
      case 'juridical':
        return 'Empresa';
      default:
        return 'Pessoa';
    }
  }, []);

  const getItems = useCallback(async () => {
    try {
      const {
        data: { data: response, meta: metaResponse },
      } = await serviceAPI.get(`companies?paginate=10&page=${currentPage}`);
      setMeta(metaResponse);
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
  }, [currentPage]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  return (
    <>
      <Header
        title="Construtoras"
        button
        buttonText="Criar"
        buttonHref="/admin/companies/create"
      />

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
                      Tipo
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Cpf/Cnpj
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
                  {companies.map(company => (
                    <tr key={company.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {company.id}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link href={`/admin/companies/${company.id}`}>
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {company.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {company.email}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusIcon value={company.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {typeSwitch(company.type)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {company.tax}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dateFormatter(company.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Menu
                          as="div"
                          className="relative inline-block text-left"
                        >
                          <div>
                            <Menu.Button className="inline-flex justify-center w-full px-4 py-2 bg-white text-sm font-medium text-indigo-700">
                              <DotsVerticalIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
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
                            <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div className="py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() =>
                                        router.push(
                                          `/admin/companies/${company.id}`,
                                        )
                                      }
                                      type="submit"
                                      className={classNames(
                                        active
                                          ? 'bg-gray-100 text-gray-900'
                                          : 'text-gray-700',
                                        'block w-full text-left px-4 py-2 text-sm',
                                      )}
                                    >
                                      Ver
                                    </button>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() =>
                                        router.push(
                                          `/admin/companies/${company.id}/edit`,
                                        )
                                      }
                                      type="submit"
                                      className={classNames(
                                        active
                                          ? 'bg-gray-100 text-gray-900'
                                          : 'text-gray-700',
                                        'block w-full text-left px-4 py-2 text-sm',
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
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Mostrando <span className="font-medium">{meta.from}</span>{' '}
                      a <span className="font-medium">{meta.to}</span> de{' '}
                      <span className="font-medium">{meta.total}</span>{' '}
                      resultados
                    </p>
                  </div>
                  <div>
                    <nav
                      className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                      aria-label="Pagination"
                    >
                      {meta.current_page > 1 && (
                        <button
                          type="button"
                          onClick={() => setCurrentPage(meta.current_page - 1)}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                          <span className="sr-only">Previous</span>
                          <ChevronLeftIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          setCurrentPage(meta.last_page - (meta.last_page - 1))
                        }
                        aria-current="page"
                        className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                      >
                        {meta.last_page - (meta.last_page - 1)}
                      </button>
                      {meta.last_page > 2 && (
                        <button
                          type="button"
                          onClick={() =>
                            setCurrentPage(
                              meta.last_page - (meta.last_page - 2),
                            )
                          }
                          aria-current="page"
                          className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        >
                          {meta.last_page - (meta.last_page - 2)}
                        </button>
                      )}
                      {meta.last_page > 3 && (
                        <button
                          type="button"
                          onClick={() =>
                            setCurrentPage(
                              meta.last_page - (meta.last_page - 3),
                            )
                          }
                          aria-current="page"
                          className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        >
                          {meta.last_page - (meta.last_page - 3)}
                        </button>
                      )}
                      {meta.last_page > 9 && (
                        <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                          ...
                        </span>
                      )}
                      {meta.current_page > 3 &&
                        meta.current_page < meta.last_page - 3 && (
                          <>
                            {meta.current_page > 5 &&
                              meta.current_page < meta.last_page - 5 && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setCurrentPage(meta.current_page)
                                  }
                                  aria-current="page"
                                  className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                >
                                  {meta.current_page - 1}
                                </button>
                              )}
                            <button
                              type="button"
                              onClick={() => setCurrentPage(meta.current_page)}
                              aria-current="page"
                              className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                            >
                              {meta.current_page}
                            </button>
                            {meta.current_page > 5 &&
                              meta.current_page < meta.last_page - 5 && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setCurrentPage(meta.current_page)
                                  }
                                  aria-current="page"
                                  className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                >
                                  {meta.current_page + 1}
                                </button>
                              )}
                            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                              ...
                            </span>
                          </>
                        )}
                      {meta.last_page > 7 && (
                        <button
                          type="button"
                          onClick={() => setCurrentPage(meta.last_page - 2)}
                          aria-current="page"
                          className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        >
                          {meta.last_page - 2}
                        </button>
                      )}
                      {meta.last_page > 6 && (
                        <button
                          type="button"
                          onClick={() => setCurrentPage(meta.last_page - 1)}
                          aria-current="page"
                          className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        >
                          {meta.last_page - 1}
                        </button>
                      )}
                      {meta.last_page > 5 && (
                        <button
                          type="button"
                          onClick={() => setCurrentPage(meta.last_page)}
                          aria-current="page"
                          className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        >
                          {meta.last_page}
                        </button>
                      )}
                      {meta.current_page < meta.last_page && (
                        <button
                          type="button"
                          onClick={() => setCurrentPage(meta.current_page + 1)}
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                          <span className="sr-only">Next</span>
                          <ChevronRightIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
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
  );
};

export default routeRole(withNavBarLayout(Index), 'admin');
