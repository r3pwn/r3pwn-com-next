import { CollectionConfig } from 'payload/types';
import { bustCache } from '../utils/cache-buster';

const BlogPost: CollectionConfig = {
  slug: 'blog-post',
  admin: {
    useAsTitle: 'title',
    preview: (doc) => {
			if (doc?.slug) {
				return `/blog/${doc.slug}`;
			}
			return null;
		}
  },
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
      name: 'featuredImage',
      type: 'relationship',
      relationTo: 'media'
    },
    {
      name: 'showFeaturedImage',
      type: 'checkbox'
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
    },
    {
      name: 'enableComments',
      type: 'checkbox',
      admin: {
        position: 'sidebar'
      }
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