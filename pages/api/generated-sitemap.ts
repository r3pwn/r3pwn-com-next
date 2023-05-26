import fs from 'fs';
import { glob } from 'glob';
import { toXML } from 'jstoxml';
import { NextApiRequest, NextApiResponse } from "next";
import path from 'path';

const hiddenPages = ['500', '404'];
const xmlOptions = {
  header: true,
  indent: '  '
};

async function getAllPages () {
  const dir = path.resolve('./.next/server/pages');

  return await glob(`${dir}/**/*.html`).then(data => {
    return data.map(file => {
      let page = file.replace(dir, '');
      // replace "index.html" with "/"
      if (page === '/index.html') {
        page = '/';
      }
      return {
        path: page.replace(/.html$/, ''),
        stats: fs.statSync(file)
      }
    }).filter(page => {
      return !hiddenPages.includes(page.path.replace(/^\//, ''));
    });
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
              { lastmod: new Date(page.stats.mtime).toISOString() },
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

    res.end(sitemap)
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error generating sitemap');
  }
}