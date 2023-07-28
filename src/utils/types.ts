import { PayloadMedia } from '@/payload/payload-types';

export type OpenGraphTags = {
  title: string;
  description: string;
  url: string;
  image?: string;
}

export type RichTextNode = {
  bold?: Boolean;
  code?: Boolean;
  italic?: Boolean;
  strikethrough?: Boolean;
  text: String;
  type: String;
  url?: string;
  children: RichTextNode[];
  value?: PayloadMedia;
}

export type SocialLink = {
  ariaLabel?: string;
  url: string;
  icon: string;
  openInNewTab?: boolean;
}