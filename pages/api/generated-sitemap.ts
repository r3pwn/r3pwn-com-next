import { NextApiRequest, NextApiResponse } from "next";
import getPayloadClient from "../../payload/payloadClient";
import { BlogPost, Hackathon } from "../../utils/payload-types";

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