/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "https://streamit-movie.azurewebsites.net/",
    API_URL2: "https://63f816b61dc21d5465b961be.mockapi.io/api/v1/",
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
