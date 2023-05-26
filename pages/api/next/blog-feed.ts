import { toXML } from "jstoxml";
import { NextApiRequest, NextApiResponse } from "next";
import getPayloadClient from "../../../payload/payloadClient";
import { SITE_BLOG_FEED_NAME, SITE_NAME } from "../../../utils/constants";

const xmlOptions = {
  header: true,
  indent: '  '
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const payload = await getPayloadClient();

    const blogPosts = (await payload.find({
      collection: 'blog-post'
    })).docs

    // generate rss feed  
    const blogFeed = toXML(
      {
        _name: 'rss',
        _attrs: {
            version: '2.0'
        },
        _content: {
            channel: [
                {
                    title: SITE_NAME
                },
                {
                    description: SITE_BLOG_FEED_NAME
                },
                {
                    link: process.env.SITE_HOST
                },
                {
                    language: 'en'
                },
                ...blogPosts.map(post => ({
                    item: {
                      title: post.title,
                      link: `${process.env.SITE_HOST}/blog/${post.slug}`,
                      description: post.description,
                      pubDate: new Date(post.postedDate).toUTCString()
                    }
                }))
            ]
        }
      },
      xmlOptions
    );

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/xml');
    // Instructing the Vercel edge to cache the file for 1 day
    res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=86400');

    res.end(blogFeed)
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error generating RSS feed');
  }
}