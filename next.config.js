const withImages = require('next-images');

const config = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/dashboard',
                permanent: true,
            }
        ]
    }
}

module.exports = withImages(config);

