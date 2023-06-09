import { Block } from 'payload/types';
import LinkTile from './LinkTile';

const TileSheet: Block = {
  slug: 'tile-sheet',
  interfaceName: 'TileSheetBlock',
  fields: [
    {
      name: 'title',
      type: 'text'
    },
    {
      name: 'tiles',
      type: 'blocks',
      blocks: [
        LinkTile
      ]
    }
  ]
};

export default TileSheet;