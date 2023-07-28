import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check the secret and next parameters
  if (req.query.secret !== process.env.PAYLOAD_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }
 
  // Enable Draft Mode by setting the cookie
  res.setDraftMode({ enable: true })
 
  // Redirect to the home page
  res.redirect('/')
}