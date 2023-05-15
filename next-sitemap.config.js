/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_HOST,
  generateRobotsTxt: true,
  changefreq: 'weekly',
  exclude: ['/admin']
}