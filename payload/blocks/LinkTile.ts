import { Block } from "payload/types";

const LinkTile: Block = {
  slug: 'link-tile',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true
    },
    {
      name: 'description',
      type: 'text',
      required: true
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media'
    },
    {
      name: 'link',
      type: 'text',
      required: true
    }
  ]
};

export default LinkTile;