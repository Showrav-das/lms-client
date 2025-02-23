/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5001",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/du15xf1tf/image/upload/**",
      },
    ],
  },
  output: "standalone",
  experimental: {
    appDir: true,
    serverActions: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  basePath: "",
  trailingSlash: true,
};

module.exports = nextConfig;
