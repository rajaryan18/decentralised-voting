/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["www.google.com"],
    formats: ["image/webp"],
  },
}

module.exports = nextConfig
