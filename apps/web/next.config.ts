import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui', '@repo/sdk'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
      },
    ],
    loader: 'custom',
    loaderFile: './src/libs/imgproxy-loader.ts',
  },
}

export default nextConfig
