import { BiographyBlock, LinkTileBlock, ParentTileSheetBlock, TileSheetBlock } from './payload-types';
import { RichTextNode } from './types';

export type PayloadBlock = LinkTileBlock | ParentTileSheetBlock | TileSheetBlock | RichTextBlock | BiographyBlock;

export type RichTextBlock = {
  content: RichTextNode[];
  id?: string;
  blockName?: string;
  blockType: 'rich-text';
}