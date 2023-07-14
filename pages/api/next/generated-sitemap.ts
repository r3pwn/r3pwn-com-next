import { toXML } from 'jstoxml';
import { NextApiRequest, NextApiResponse } from 'next';
import getPayloadClient from '../../../payload/payloadClient';
import { PageData } from '../../../utils/payload-types';

const xmlOptions = {
  header: true,
  indent: '  '
};

async function getAllPages () {
  const payload = await getPayloadClient();

  const pages = (await payload.find({
    collection: 'page',
    where: {
      _status: {
        equals: 'published'
      }
    }
  })).docs as PageData[];

  return pages.map(page => (
    {
      // "/index" should be replaced with "/"
      path: page.breadcrumbs?.at(-1)?.url === '/index' ? '/' : page.breadcrumbs?.at(-1)?.url ?? '/',
      lastUpdated: page.postedDate
    }
  )).sort(function (a, b) {
    if (a.path < b.path) {
      return -1;
    }
    if (a.path > b.path) {
      return 1;
    }
    return 0;
  });
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