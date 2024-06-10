/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['api.mysmartlibrary.in', 'localhost'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/dashboards',
        destination: '/dashboards/crypto',
        permanent: true
      }
    ];
  }
}


module.exports = nextConfig
