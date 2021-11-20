import {Menu, Transition} from '@headlessui/react'
import {UserIcon} from '@heroicons/react/outline'
import React, {Fragment} from "react";

import {useAuth} from "/hooks/auth";

const Index = () => {
    const {logout, user} = useAuth();

    return (
        <Menu as="div" className="ml-3 relative">
            <div>
                <Menu.Button
                    className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Abrir menu de usuário</span>
                    <UserIcon className="h-6 w-6 text-gray-400" aria-hidden="true"/>
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
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-300">
                        <div className="font-medium text-gray-700">{user && user.name}</div>

                        {(user && user.role === "admin") && (
                            <div className="text-xs text-gray-500 italic">{user.role}</div>
                        )}
                    </div>
                    <Menu.Item>
                        <a
                            href='/auth/me'
                            className='block px-4 py-2 text-sm text-gray-700'
                        >
                            Perfil
                        </a>
                    </Menu.Item>

                    <Menu.Item>
                        <a
                            onClick={() => logout()}
                            href='#'
                            className='block px-4 py-2 text-sm text-gray-700'
                        >
                            Sair
                        </a>
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default Index;
