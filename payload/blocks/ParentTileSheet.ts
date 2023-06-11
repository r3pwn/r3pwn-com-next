import { Block } from "payload/types";

const ParentTileSheet: Block = {
  slug: 'parent-tile-sheet',
  interfaceName: 'ParentTileSheetBlock',
  fields: [
    {
      name: 'title',
      type: 'text'
    }
    /** Special logic will check for this, pull the proper items, and replace it with a normal TileSheet */
  ]
};

export default ParentTileSheet;