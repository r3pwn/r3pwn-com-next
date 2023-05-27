import { CollectionConfig } from 'payload/types';
import { PageData } from '../../utils/payload-types';
import Biography from '../blocks/Biography';
import ParentTileSheet from '../blocks/ParentTileSheet';
import RichText from '../blocks/RichText';
import TileSheet from '../blocks/TileSheet';
import { bustCache } from '../utils/cache-buster';

const Page: CollectionConfig = {
  slug: 'page',
  typescript: {
    interface: "PageData"
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: [
      'title',
      'slug',
      'description'
    ]
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true
    },
    {
      name: 'subtitle',
      type: 'text'
    },
    {
      name: 'description',
      type: 'text',
      required: true
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media'
    },
    {
      name: 'showTitle',
      type: 'checkbox'
    },
    {
      name: 'content',
      type: 'blocks',
      blocks: [
        Biography,
        RichText,
        TileSheet,
        ParentTileSheet
      ]
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
      async (args: { doc: PageData, previousDoc?: PageData }) => {
        const currentPaths = args.doc.breadcrumbs?.map(crumb => crumb.url as string) ?? [];
        const prevPaths = 
          args.previousDoc?.breadcrumbs?.map(crumb => crumb.url as string) ?? [];

        const paths = new Set([...currentPaths, ...prevPaths]);

        if (paths.has('/index')) {
          paths.delete('/index');
          paths.add('/');
        }
        
        await bustCache(Array.from(paths));
      }
    ],
    afterDelete: [
      async (args: { doc: PageData }) => {
        const paths = new Set(args.doc.breadcrumbs?.map(crumb => crumb.url as string));

        if (paths.has('/index')) {
          paths.delete('/index');
          paths.add('/');
        }

        await bustCache(Array.from(paths));
      }
    ]
  }
};

export default Page;