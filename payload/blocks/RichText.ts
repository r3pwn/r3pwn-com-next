import { Block } from 'payload/types';

const RichText: Block = {
  slug: 'rich-text',
  interfaceName: 'RichTextBlock',
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        elements: [
          'h2', 'h3', 'h4', 'h5', 'h6',
          'blockquote', 'link',
          'ol', 'ul', 'indent',
          'relationship', 'upload'
        ]
      }
    }
  ]
};

export default RichText;