import { Block } from "payload/types";

const LinkTile: Block = {
  slug: 'link-tile',
  interfaceName: 'LinkTileBlock',
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
      type: 'relationship',
      relationTo: 'page',
      required: true
    }
  ]
};

export default LinkTile;