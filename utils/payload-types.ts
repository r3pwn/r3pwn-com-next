/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    page: PageData;
    media: PayloadMedia;
    users: User;
  };
  globals: {
    navigation: NavigationData;
  };
}
export interface PageData {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  featuredImage?: string | PayloadMedia;
  showTitle?: boolean;
  content?: (BiographyBlock | RichTextBlock | TileSheetBlock | ParentTileSheetBlock | DisqusBlock)[];
  slug: string;
  postedDate: string;
  parent?: string | PageData;
  breadcrumbs?: {
    doc?: string | PageData;
    url?: string;
    label?: string;
    id?: string;
  }[];
  updatedAt: string;
  createdAt: string;
}
export interface PayloadMedia {
  id: string;
  altText?: string;
  updatedAt: string;
  createdAt: string;
  url?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
}
export interface BiographyBlock {
  image?: string | PayloadMedia;
  content: {
    [k: string]: unknown;
  }[];
  id?: string;
  blockName?: string;
  blockType: 'biography';
}
export interface RichTextBlock {
  content: {
    [k: string]: unknown;
  }[];
  id?: string;
  blockName?: string;
  blockType: 'rich-text';
}
export interface TileSheetBlock {
  title?: string;
  tiles?: LinkTileBlock[];
  id?: string;
  blockName?: string;
  blockType: 'tile-sheet';
}
export interface LinkTileBlock {
  title: string;
  description: string;
  image?: string | PayloadMedia;
  link: string | PageData;
  id?: string;
  blockName?: string;
  blockType: 'link-tile';
}
export interface ParentTileSheetBlock {
  title?: string;
  id?: string;
  blockName?: string;
  blockType: 'parent-tile-sheet';
}
export interface DisqusBlock {
  url: string;
  identifier: string;
  id?: string;
  blockName?: string;
  blockType: 'disqus-comments';
}
export interface User {
  id: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  salt?: string;
  hash?: string;
  loginAttempts?: number;
  lockUntil?: string;
  password?: string;
}
export interface NavigationData {
  id: string;
  header?: HeaderData;
  footer?: FooterData;
  updatedAt?: string;
  createdAt?: string;
}
export interface HeaderData {
  navigationLinks?: {
    label: string;
    target: string | PageData;
    id?: string;
  }[];
}
export interface FooterData {
  socialLinks?: {
    ariaLabel?: string;
    url?: string;
    icon?: 'email' | 'facebook' | 'github' | 'instagram' | 'linkedin' | 'reddit' | 'telegram' | 'twitter';
    openInNewTab?: boolean;
    id?: string;
  }[];
  copyrightText?: string;
}
