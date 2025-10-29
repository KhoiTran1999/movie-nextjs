/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gitlab.com',
        port: '',
        pathname: '/movie-porject/streamit-movie/**',
      },
    ],
  },
};

module.exports = nextConfig;
