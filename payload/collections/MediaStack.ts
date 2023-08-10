import { CollectionConfig } from 'payload/types';

const MediaStack: CollectionConfig = {
  slug: 'media-stack',
  typescript: {
    interface: 'MediaStackData'
  },
  admin: {
    useAsTitle: 'title'
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media'
        }
      ]
    }
  ]
};

export default MediaStack;