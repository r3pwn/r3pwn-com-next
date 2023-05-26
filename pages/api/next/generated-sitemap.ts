import { toXML } from 'jstoxml';
import { NextApiRequest, NextApiResponse } from "next";
import { Payload } from 'payload';
import getPayloadClient from '../../../payload/payloadClient';

const xmlOptions = {
  header: true,
  indent: '  '
};

async function getBlogPages (payload: Payload) {
  const posts = await payload.find({
    collection: 'blog-post'
  });

  return [
    {
      path: '/blog',
      lastUpdated: new Date().toISOString()
    },
    ...posts.docs.map(blogPost => (
      {
        path: `/blog/${blogPost.slug}`,
        lastUpdated: new Date(blogPost.updatedAt).toISOString()
      }))
  ]
}

async function getHackathonPages (payload: Payload) {
  const posts = await payload.find({
    collection: 'hackathon'
  });

  return [
    {
      path: '/hackathons',
      lastUpdated: new Date().toISOString()
    },
    ...posts.docs.map(hackathon => (
      {
        path: `/hackathons/${hackathon.slug}`,
        lastUpdated: new Date(hackathon.updatedAt).toISOString()
      }))
  ]
}

async function getAllPages () {
  const payload = await getPayloadClient();

  return [
    ...['/', '/about'].map(path => (
      {
        path,
        lastUpdated: new Date().toISOString()
      }
    )),
    ...(await getBlogPages(payload)),
    ...(await getHackathonPages(payload))
  ]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const pages = await getAllPages();

    // generate sitemap
    const sitemap = toXML(
      {
        _name: 'urlset',
        _attrs: {
            xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
        },
        _content: [
          pages.map(page => ({
            url: [
              { loc: `${process.env.SITE_HOST}${page.path}` },
              { lastmod: new Date(page.lastUpdated).toISOString() },
              { changefreq: 'weekly' },
              { priority: 0.7 }
            ]
          }))
        ]
      },
      xmlOptions
    );

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/xml');
    // Instructing the Vercel edge to cache the file for 1 day
    res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=86400');

    res.end(sitemap);
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error generating sitemap');
  }
}