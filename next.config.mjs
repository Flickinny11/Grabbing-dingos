/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Grabbing-dingos/' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/Grabbing-dingos' : '',
  // Exclude API routes from static export for now
  // In production, these would be handled by a backend server
};

export default nextConfig;
