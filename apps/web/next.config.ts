import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [ '@repo/ui', '@repo/sdk'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
      }
    ]
  }
};

export default nextConfig;
