/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "https://streamit-movie.azurewebsites.net/",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "7z363nlh6c.execute-api.us-east-1.amazonaws.com",
        port: "",
        pathname: "/v1/storage-movie-data/**",
      },
    ],
  },
};

module.exports = nextConfig;
