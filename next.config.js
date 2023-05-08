// next.config.js
const path = require('path');
const { withPayload } = require('@payloadcms/next-payload');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects () {
    return [
      {
        source: '/blog/:year/:month/:day/:slug.html',
        destination: '/blog/:year-:month-:day-:slug',
        permanent: true
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