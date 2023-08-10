import { MediaStackData, PayloadMedia } from './payload-types';

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
  url?: String;
  children: RichTextNode[];
  value?: PayloadMedia | MediaStackData;
  relationTo?: String;
}

export type SocialLink = {
  ariaLabel?: string;
  url: string;
  icon: string;
  openInNewTab?: boolean;
}