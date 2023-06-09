// next.config.js
const path = require('path');
const { withPayload } = require('@payloadcms/next-payload');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ['app', 'components', 'pages', 'payload', 'utils']
  },
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
  }
};

const payloadConfig = {
  // Point to your Payload config (Required)
  configPath: path.resolve(__dirname, './payload/payload.config.ts'),
  // Point to custom Payload CSS (optional)
  // cssPath: path.resolve(__dirname, './css/my-custom-payload-styles.css'),
  // Point to your exported, initialized Payload instance (optional, default shown below`)
  payloadPath: path.resolve(process.cwd(), './payload/payloadClient.ts'),
};

module.exports = withPayload(nextConfig, payloadConfig);