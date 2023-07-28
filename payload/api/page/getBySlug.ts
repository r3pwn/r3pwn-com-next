import { Response } from "express";
import payload from "payload";
import { Endpoint } from "payload/config";
import { PayloadRequest } from "payload/types";

const getBySlugEndpoint: Endpoint = {
  path: '/by-slug/:slug',
  method: 'get',
  handler: async (req: PayloadRequest, res: Response) => {
    const { draft } = req.query;
    const { slug } = req.params;

    const pages = await payload.find({
      collection: 'page',
      where: {
        slug: {
          equals: slug
        },
        // if draft mode not enabled, ensure we're using a status of 'published'
        ...(draft !== 'true' ?
          {
            _status: {
              equals: 'published'
            }
          } : {}
        )
      }
    });

    res.status(200).send(pages);
  }
}

export default getBySlugEndpoint;