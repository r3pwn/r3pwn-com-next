export type RichTextNode = {
  bold: Boolean;
  code: Boolean;
  italic: Boolean;
  text: String;
  type: String;
  url?: String;
  children: RichTextNode[];
}

export type PayloadMedia = {
  id: String;
  filename: String;
  mimeType: String;
  filesize: Number;
  width: Number;
  height: Number;
  createdAt: String;
  updatedAt: String;
  url: String;
}