import 'tailwindcss/tailwind.css'

import HooksProvider from '/hooks';

function MyApp({Component, pageProps}) {
    return (
        <HooksProvider>
            <Component {...pageProps} />
        </HooksProvider>
    )
}

export default MyApp
