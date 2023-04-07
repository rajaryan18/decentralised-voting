/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.google.com"],
    formats: ["image/webp"],
  },
}

module.exports = nextConfig
