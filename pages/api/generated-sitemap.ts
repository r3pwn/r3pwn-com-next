import { NextApiRequest, NextApiResponse } from "next";
import getPayloadClient from "../../payload/payloadClient";
import { BlogPost, Hackathon } from "../../utils/payload-types";


/*<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
<url><loc>http://localhost:3000</loc><lastmod>2023-05-24T06:06:41.604Z</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>
<url><loc>http://localhost:3000/about</loc><lastmod>2023-05-24T06:06:41.604Z</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>
<url><loc>http://localhost:3000/blog</loc><lastmod>2023-05-24T06:06:41.604Z</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>
<url><loc>http://localhost:3000/hackathons</loc><lastmod>2023-05-24T06:06:41.604Z</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>
<url><loc>http://localhost:3000/hackathons/test123</loc><lastmod>2023-05-24T06:06:41.605Z</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>
<url><loc>http://localhost:3000/hackathons/2019-02-10-present</loc><lastmod>2023-05-24T06:06:41.605Z</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>
<url><loc>http://localhost:3000/hackathons/2017-10-08-subbuddy</loc><lastmod>2023-05-24T06:06:41.605Z</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>
<url><loc>http://localhost:3000/blog/2019-05-01-fuchsia_aemu</loc><lastmod>2023-05-24T06:06:41.605Z</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>
<url><loc>http://localhost:3000/blog/2014-06-24-debugallthethings</loc><lastmod>2023-05-24T06:06:41.605Z</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>
</urlset>*/

function createBasicEntry(url: string) {
  return `
  <url>
    <loc>${process.env.SITE_HOST}${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  `.trimStart();
}

function createBlogEntry(post: BlogPost) {
  return `
  <url>
    <loc>${process.env.SITE_HOST}/blog/${post.slug}</loc>
    <lastmod>${post.updatedAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  `.trimStart();
}

function createHackathonEntry(post: Hackathon) {
  return `
  <url>
    <loc>${process.env.SITE_HOST}/hackathons/${post.slug}</loc>
    <lastmod>${post.updatedAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  `.trimStart();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const payload = await getPayloadClient();

    const blogPosts = (await payload.find({
      collection: 'blog-post'
    })).docs
  
    const hackathons = (await payload.find({
      collection: 'hackathon'
    })).docs;
    
    // generate sitemap here
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${createBasicEntry('')}
    ${createBasicEntry('/about')}
    ${createBasicEntry('/blog')}
    ${blogPosts.map(createBlogEntry).join('')}
    ${createBasicEntry('/hackathons')}
    ${hackathons.map(createHackathonEntry).join('')}
    </urlset>`;

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/xml');
    // Instructing the Vercel edge to cache the file for 1 day
    res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=86400');

    res.end(xml)
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error generating sitemap');
  }
}