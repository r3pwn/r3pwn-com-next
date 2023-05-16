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
  value?: PayloadMedia;
}

export type PayloadMedia = {
  id: string;
  altText: string;
  filename: string;
  mimeType: string;
  filesize: Number;
  width: Number;
  height: Number;
  createdAt: string;
  updatedAt: string;
  url: string;
}

export type BlogPost = {
  title: string;
  slug: string;
  description: string;
  featuredImage?: PayloadMedia;
  content: RichTextNode[];
  postedDate: string;
}

export type HackathonProject = {
  title: string;
  slug: string;
  event: string;
  description: string;
  featuredImage?: PayloadMedia;
  content: RichTextNode[];
  postedDate: string;
}

export type FooterData = {
  copyrightText: string;
  socialLinks: SocialLink[];
}

export type SocialLink = {
  ariaLabel: string;
  url: string;
  icon: string;
  openInNewTab?: boolean;
}