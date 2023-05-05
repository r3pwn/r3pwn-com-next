import { CollectionConfig } from 'payload/types';
import { bustCache } from '../utils/cache-buster';

const BlogPost: CollectionConfig = {
  slug: 'blog-post',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true
    },
    {
      name: "slug",
      type: "text",
      required: true
    },
    {
      name: 'description',
      type: 'text',
      required: true
    },
    {
      name: 'posted-date',
      type: 'date',
      required: true,
      admin: {
        date: {
          displayFormat: 'yyyy-MM-dd',
          pickerAppearance: 'dayOnly'
        }
      }
    },
    {
      name: 'featured-image',
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
      name: 'enable-comments',
      type: 'checkbox'
    }
  ],
  hooks: {
    afterChange: [
      async (args) => {
        await bustCache('/blog');
        if (args.operation === 'update') {
          await bustCache(`/blog/${args.previousDoc.slug}`);
        }
      }
    ]
  }
};

export default BlogPost;