import { Block } from 'payload/types';

const DisqusComments: Block = {
  slug: 'disqus-comments',
  interfaceName: 'DisqusBlock',
  fields: [
    {
      name: 'disqusDomain',
      type: 'text',
      required: true
    },
    {
      name: 'url',
      type: 'text',
      required: true
    },
    {
      name: 'identifier',
      type: 'text',
      required: true
    }
  ]
};

export default DisqusComments;