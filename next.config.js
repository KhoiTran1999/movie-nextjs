/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "https://streamit-movie.azurewebsites.net/",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: "/streaming-movie/**",
      },
    ],
  },
};

module.exports = nextConfig;
