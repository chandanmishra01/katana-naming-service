/** @type {import('next').NextConfig} */
const nextConfig = {
  // next.config.js
  eslint: { ignoreDuringBuilds: true },
  reactStrictMode: true,
  images: {
    domains: ["raw.githubusercontent.com"],
  },
};

module.exports = nextConfig
