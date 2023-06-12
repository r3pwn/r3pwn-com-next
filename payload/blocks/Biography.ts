import { Block } from 'payload/types';

const Biography: Block = {
  slug: 'biography',
  interfaceName: 'BiographyBlock',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media'
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        elements: [
          'h2', 'h3', 'h4', 'h5', 'h6',
          'blockquote', 'link',
          'ol', 'ul', 'indent',
          'relationship', 'upload'
        ]
      }
    }
  ]
};

export default Biography;