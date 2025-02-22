/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5001", // Update this based on your backend server port
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
