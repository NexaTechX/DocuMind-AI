/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export configuration to allow dynamic routes
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;