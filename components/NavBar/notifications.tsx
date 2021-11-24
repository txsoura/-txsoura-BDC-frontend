import { Menu, Transition } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/outline';
import React, { Fragment } from 'react';

const Index = () => {
  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button
          type="button"
          className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
        >
          <span className="sr-only">Ver notificações</span>
          <BellIcon className="h-6 w-6" aria-hidden="true" />
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          <div className="text-xs font-semibold text-gray-400 uppercase pt-1.5 pb-2 px-4">
            Notifications
          </div>
          <ul>
            <li className="border-b border-gray-200 last:border-0">
              <a
                className="block py-2 px-4 hover:bg-gray-50"
                // to="#0"
                // onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="block text-sm mb-2">
                  <span className="font-medium text-gray-800">
                    Edit your information in a swipe
                  </span>{' '}
                  Sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim.
                </span>
                <span className="block text-xs font-medium text-gray-400">
                  Feb 12, 2021
                </span>
              </a>
            </li>
            <li className="border-b border-gray-200 last:border-0">
              <a
                className="block py-2 px-4 hover:bg-gray-50"
                // to="#0"
                // onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="block text-sm mb-2">
                  <span className="font-medium text-gray-800">
                    Edit your information in a swipe
                  </span>{' '}
                  Sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim.
                </span>
                <span className="block text-xs font-medium text-gray-400">
                  Feb 9, 2021
                </span>
              </a>
            </li>
            <li className="border-b border-gray-200 last:border-0">
              <a
                className="block py-2 px-4 hover:bg-gray-50"
                // to="#0"
                // onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="block text-sm mb-2">
                  <span className="font-medium text-gray-800">
                    Say goodbye to paper receipts!
                  </span>{' '}
                  Sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim.
                </span>
                <span className="block text-xs font-medium text-gray-400">
                  Jan 24, 2020
                </span>
              </a>
            </li>
          </ul>
          <a
            href="#"
            className="block bg-gray-800 text-white text-center font-bold py-2"
          >
            See all notifications
          </a>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Index;
