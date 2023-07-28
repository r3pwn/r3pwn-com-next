import { BiographyBlock, DisqusBlock, LinkTileBlock, ParentTileSheetBlock, TileSheetBlock } from '@/payload/payload-types';
import { RichTextNode } from './types';

export type PayloadBlock = LinkTileBlock | ParentTileSheetBlock | TileSheetBlock | RichTextBlock | BiographyBlock | DisqusBlock;

export type RichTextBlock = {
  content: RichTextNode[];
  id?: string;
  blockName?: string;
  blockType: 'rich-text';
}