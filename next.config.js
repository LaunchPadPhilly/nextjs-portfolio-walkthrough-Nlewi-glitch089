/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbopack: {
      // Root directory for Turbopack; set to the project workspace to avoid
      // the "inferred your workspace root" warning when multiple lockfiles exist.
      root: './',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

module.exports = nextConfig
