import { CollectionConfig } from 'payload/types';
import Biography from '../blocks/Biography';
import ParentTileSheet from '../blocks/ParentTileSheet';
import RichText from '../blocks/RichText';
import TileSheet from '../blocks/TileSheet';

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
  ]
};

export default Page;