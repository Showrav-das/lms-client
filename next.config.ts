/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lms-server-mmiv.onrender.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
