import { GlobalConfig } from "payload/types";
import { bustCache } from "../utils/cache-buster";

const AboutMe: GlobalConfig = {
  slug: "about-me",
  typescript: {
    interface: "AboutMeData"
  },
  fields: [
    {
      name: "image",
      type: "relationship",
      relationTo: "media",
      required: true
    },
    {
      name: "content",
      type: "richText",
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
  ],
  hooks: {
    afterChange: [
      async () => {
        await bustCache(['/about']);
      }
    ]
  }
};

export default AboutMe;