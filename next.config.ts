import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/webvision',
  assetPrefix: '/webvision/',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
