import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    // 1GB-class servers frequently OOM during on-demand `/_next/image` optimization.
    // This forces Next to serve original files from `public/` without resizing.
    unoptimized: true,
  },
};

export default nextConfig;
