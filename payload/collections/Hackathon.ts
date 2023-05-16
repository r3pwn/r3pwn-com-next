import { CollectionConfig } from 'payload/types';
import { bustCache } from '../utils/cache-buster';

const Hackathon: CollectionConfig = {
  slug: 'hackathon',
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
      name: 'event',
      type: 'text',
      required: true
    },
    {
      name: 'featuredImage',
      type: 'relationship',
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
    },
    {
      name: "slug",
      type: "text",
      required: true,
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'postedDate',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
        date: {
          displayFormat: 'yyyy-MM-dd',
          pickerAppearance: 'dayOnly'
        }
      }
    }
  ],
  hooks: {
    afterChange: [
      async (args) => {
        await bustCache('/hackathons');
        if (args.operation === 'update') {
          await bustCache(`/hackathons/${args.previousDoc.slug}`);
        }
      }
    ]
  }
};

export default Hackathon;