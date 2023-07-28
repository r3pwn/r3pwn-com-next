import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.PAYLOAD_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  if (req.body == null) {
    return res.status(400).json({ message: 'Invalid request, no body provided.'});
  }

  const routes = JSON.parse(req.body) as string[];

  if (!routes.length) {
    return res.status(400).json({ message: 'Invalid request, no paths provided.'});
  }
 
  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    for (let url of routes) {
      await res.revalidate(url);
    }
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
}