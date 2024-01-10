/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "https://streamit-movie.azurewebsites.net/",
    BARD_COOKIE:
      "eQhBeYJhd3yqetnA-c14C9Re43nDF0yOXkGBh_1xo9ihJP4LrUkwi0UdXD_DHeGpWYndWg",
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
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false, os: false };

    return config;
  },
};

module.exports = nextConfig;
