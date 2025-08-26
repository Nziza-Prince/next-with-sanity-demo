// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  // Add this if you're still having TypeScript issues
  typescript: {
    ignoreBuildErrors: false, // Set to true only if you're sure about the errors
  },
  eslint: {
    ignoreDuringBuilds: false, // Set to true if you want to ignore ESLint errors during build
  },
}

export default nextConfig