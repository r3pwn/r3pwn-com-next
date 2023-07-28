import { Response } from "express";
import payload from "payload";
import { Endpoint } from "payload/config";
import { PayloadRequest } from "payload/types";

const getByParentIdEndpoint: Endpoint = {
  path: '/by-parent/:id',
  method: 'get',
  handler: async (req: PayloadRequest, res: Response) => {
    const { id } = req.params;

    const pages = await payload.find({
      collection: 'page',
      where: {
        parent: {
          equals: id
        }
      },
      sort: '-postedDate'
    });

    res.status(200).send(pages);
  }
}

export default getByParentIdEndpoint;