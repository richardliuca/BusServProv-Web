import path from 'node:path';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // Monorepo root (two levels up) so standalone tracing includes workspace deps.
  outputFileTracingRoot: path.join(__dirname, '../..'),
  images: {
    // 1GB-class servers frequently OOM during on-demand `/_next/image` optimization.
    // This forces Next to serve original files from `public/` without resizing.
    unoptimized: true,
  },
};

export default nextConfig;
