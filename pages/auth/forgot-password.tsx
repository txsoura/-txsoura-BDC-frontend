// import { LockClosedIcon } from '@heroicons/react/solid';
import React from 'react';

import { withNavBarLayout } from 'components/withNavBarLayout';

const Index = () => {
  return (
    <text>Brevemente</text>
    //     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    //       <div className="max-w-md w-full space-y-8">
    //         <div>
    //           <img
    //             className="mx-auto h-12 w-auto"
    //             src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
    //             alt="Workflow"
    //           />
    //           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
    //             Digite o email da sua conta
    //           </h2>
    //           <p className="mt-2 text-center text-sm text-gray-600">
    //             Será enviado um email, para redefinir a sua senha
    //           </p>
    //         </div>
    //         <form className="mt-8 space-y-6" action="#" method="POST">
    //           <div className="rounded-md shadow-sm -space-y-px">
    //             <div>
    //               <label htmlFor="password" className="sr-only">
    //                 Password
    //               </label>
    //               <input
    //                 id="password"
    //                 name="password"
    //                 type="password"
    //                 autoComplete="current-password"
    //                 required
    //                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    //                 placeholder="Password"
    //               />
    //             </div>
    //           </div>

    //           <div className="flex items-center justify-between">
    //             <div className="text-sm">
    //               <a
    //                 href="/auth/login"
    //                 className="font-medium text-indigo-600 hover:text-indigo-500"
    //               >
    //                 Entrar
    //               </a>
    //             </div>
    //           </div>
    //           <div>
    //             <button
    //               type="submit"
    //               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    //             >
    //               <span className="absolute left-0 inset-y-0 flex items-center pl-3">
    //                 <LockClosedIcon
    //                   className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
    //                   aria-hidden="true"
    //                 />
    //               </span>
    //               Enviar
    //             </button>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
  );
};

export default withNavBarLayout(Index, false);
