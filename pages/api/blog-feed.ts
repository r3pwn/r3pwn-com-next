import { NextApiRequest, NextApiResponse } from "next";
import getPayloadClient from "../../payload/payloadClient";
import { SITE_BLOG_FEED_NAME, SITE_NAME } from "../../utils/constants";
import { BlogPost } from "../../utils/payload-types";

function createBlogItem(post: BlogPost) {
  return `
    <item>
      <title>${post.title}</title>
      <description>${post.description}</description>
      <pubDate>${post.postedDate}</pubDate>
      <link>${process.env.SITE_HOST}/blog/${post.slug}</link>
      <guid isPermaLink="true">${process.env.SITE_HOST}/blog/${post.slug}</guid>
    </item>
  `.trimStart();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const payload = await getPayloadClient();

    const blogPosts = (await payload.find({
      collection: 'blog-post'
    })).docs

    // generate rss feed here
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${SITE_NAME}</title>
        <description>${SITE_BLOG_FEED_NAME}</description>		
        <link>${process.env.SITE_HOST}</link>
        <atom:link href="${process.env.SITE_HOST}/blog/feed.xml" rel="self" type="application/rss+xml" />
        ${blogPosts.map(createBlogItem).join('')}
      </channel>
    </rss>`;

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/xml');
    // Instructing the Vercel edge to cache the file for 1 day
    res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=86400');

    res.end(xml)
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error generating RSS feed');
  }
}