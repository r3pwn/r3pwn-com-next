/* tslint:disable */
/**
 * This file was automatically generated by Payload CMS.
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
    'header-footer': HeaderFooterData;
  };
}
export interface PageData {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  featuredImage?: string | PayloadMedia;
  showTitle?: boolean;
  content?: (
    | {
        image?: string | PayloadMedia;
        content: {
          [k: string]: unknown;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'biography';
      }
    | {
        content: {
          [k: string]: unknown;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'rich-text';
      }
    | {
        title?: string;
        tiles?: {
          title: string;
          description: string;
          image?: string | PayloadMedia;
          link: string | PageData;
          id?: string;
          blockName?: string;
          blockType: 'link-tile';
        }[];
        id?: string;
        blockName?: string;
        blockType: 'tile-sheet';
      }
    | {
        title?: string;
        id?: string;
        blockName?: string;
        blockType: 'parent-tile-sheet';
      }
  )[];
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
export interface User {
  id: string;
  updatedAt: string;
  createdAt: string;
  email?: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  loginAttempts?: number;
  lockUntil?: string;
  password?: string;
}
export interface HeaderFooterData {
  id: string;
  navigationLinks: {
    label: string;
    target: string | PageData;
    id?: string;
  }[];
  socialLinks?: {
    ariaLabel?: string;
    url?: string;
    icon?: 'email' | 'facebook' | 'github' | 'instagram' | 'linkedin' | 'reddit' | 'telegram' | 'twitter';
    openInNewTab?: boolean;
    id?: string;
  }[];
  copyrightText?: string;
}
