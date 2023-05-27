import { PageData, PayloadMedia } from "./payload-types";
import { RichTextNode } from "./types";

export type PayloadBlock = LinkTileBlock | ParentTileSheetBlock | TileSheetBlock | RichTextBlock | BiographyBlock;

export type LinkTileBlock = {
  title: string;
  description: string;
  image?: PayloadMedia;
  link: PageData;
  id?: string;
  blockName?: string;
  blockType: 'link-tile';
}

export type ParentTileSheetBlock = {
  title?: string;
  childrenOf?: PageData;
  id?: string;
  blockName?: string;
  blockType: 'parent-tile-sheet';
}

export type TileSheetBlock = {
  title?: string;
  tiles?: LinkTileBlock[];
  id?: string;
  blockName?: string;
  blockType: 'tile-sheet';
}

export type RichTextBlock = {
  content: RichTextNode[];
  id?: string;
  blockName?: string;
  blockType: 'rich-text';
}

export type BiographyBlock = {
  image?: PayloadMedia;
  content: RichTextNode[];
  id?: string;
  blockName?: string;
  blockType: 'biography';
}