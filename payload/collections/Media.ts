import { CollectionConfig } from 'payload/types';

const Media: CollectionConfig = {
  slug: 'media',
  fields: [
    {
      name: "altText",
      type: "text",
      required: false
    }
  ],
  upload: {
    disableLocalStorage: true,
    staticURL: `${process.env.GCS_BASEURL}${process.env.GCS_BUCKET}`,
    staticDir: 'media',
    mimeTypes: ['image/*']
  },
};

export default Media;