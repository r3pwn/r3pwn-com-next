require('dotenv').config()

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects () {
    // /blog and /hackathons redirects exist to not break current links to the site
    return [
      {
        source: '/blog/:year/:month/:day/:slug',
        destination: '/blog/:year-:month-:day-:slug',
        permanent: true
      },
      {
        source: '/hackathons/:year/:month/:day/:slug',
        destination: '/hackathons/:year-:month-:day-:slug',
        permanent: true
      },
      // resolve *.html to just *, so /about.html becomes /about
      {
        source: '/:path*.html',
        destination: '/:path*',
        permanent: true
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/next/generated-sitemap'
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.GCS_HOSTNAME,
        port: '',
        pathname: `/${process.env.GCS_BUCKET}/**`,
      }
    ]
  },
  experimental: {
    serverActions: true
  }
}
