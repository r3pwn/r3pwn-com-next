import { CollectionConfig } from 'payload/types';

const Media: CollectionConfig = {
  slug: 'media',
  typescript: {
    interface: 'PayloadMedia'
  },
  fields: [
    {
      name: 'altText',
      type: 'text',
      required: false
    }
  ],
  upload: {
    disableLocalStorage: true,
    staticURL: `https://${process.env.GCS_HOSTNAME}/${process.env.GCS_BUCKET}`,
    staticDir: 'media',
    mimeTypes: ['image/*']
  }
};

export default Media;