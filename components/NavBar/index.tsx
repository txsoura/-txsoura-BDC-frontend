import { Disclosure } from '@headlessui/react';
import React from 'react';
import { useRouter } from 'next/router';

import { useAuth } from 'hooks/auth';
import { AdminRoutes } from 'routes/admin';
import { UserRoutes } from 'routes/user';
import UserMenu from './userMenu';
import Notifications from './notifications';

const Index = () => {
  const router = useRouter();
  const { user } = useAuth();

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <div>
      <Disclosure as="nav" className="bg-gray-800">
        {() => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                      alt="Paulo Catunda Imóveis"
                    />
                  </div>

                  <div className="hidden md:block">
                    {/* Admin routes */}
                    {user && user.role === 'admin' && (
                      <div className="ml-10 flex items-baseline space-x-4">
                        {AdminRoutes.map(item => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              router.asPath === item.href
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium',
                            )}
                            aria-current={
                              router.asPath === item.href ? 'page' : undefined
                            }
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    )}

                    {/* User routes */}
                    {user && user.role === 'user' && (
                      <div className="ml-10 flex items-baseline space-x-4">
                        {UserRoutes.map(item => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              router.asPath === item.href
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium',
                            )}
                            aria-current={
                              router.asPath === item.href ? 'page' : undefined
                            }
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    {/* Notifications dropdown */}
                    <Notifications />

                    <hr className="w-px h-6 bg-gray-200 mx-3" />

                    {/* Profile dropdown */}
                    <UserMenu />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Index;
