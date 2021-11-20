import {useAuth} from "/hooks/auth";

const Index = () => {
    const {user} = useAuth();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Oops, página não
                        encontrada!!!</h2>
                </div>

                <div>
                    {(user && user.role === "user") && (
                        <a href='/dashboard'>
                            <button
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Dashboard
                            </button>
                        </a>
                    )}

                    {(user && user.role === "admin") && (
                        <a href='/admin'>
                            <button
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Dashboard
                            </button>
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Index;
