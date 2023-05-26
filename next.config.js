// next.config.js
const path = require('path');
const { withPayload } = require('@payloadcms/next-payload');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects () {
    // These exist to not break current links to the site
    return [
      {
        source: '/blog/:year/:month/:day/:slug.html',
        destination: '/blog/:year-:month-:day-:slug',
        permanent: true
      },
      {
        source: '/blog/:year/:month/:day/:slug',
        destination: '/blog/:year-:month-:day-:slug',
        permanent: true
      },
      {
        source: '/hackathons/:year/:month/:day/:slug.html',
        destination: '/hackathons/:year-:month-:day-:slug',
        permanent: true
      },
      {
        source: '/hackathons/:year/:month/:day/:slug',
        destination: '/hackathons/:year-:month-:day-:slug',
        permanent: true
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/next/generated-sitemap'
      },
      {
        source: '/blog/feed.xml',
        destination: '/api/next/blog-feed'
      }
    ]
  },
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