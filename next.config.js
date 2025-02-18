/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['your-image-domain.com'],
  },
  experimental: {
    optimizeCss: true,
  },
  webpack: (config, { isServer }) => {
    // Ensure PDF.js worker can be loaded
    config.resolve.alias.pdfjs = 'pdfjs-dist/legacy/build/pdf';
    
    return config;
  },
};

module.exports = nextConfig;