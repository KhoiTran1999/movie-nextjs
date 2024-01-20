/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "https://streamit-movie.azurewebsites.net/",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "preview.redd.it",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
