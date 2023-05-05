import { GlobalConfig } from "payload/types";
import { bustCache } from "../utils/cache-buster";

const AboutMe: GlobalConfig = {
  slug: "about-me",
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
      required: true
    }
  ],
  hooks: {
    afterChange: [
      async () => {
        await bustCache('/about');
      }
    ]
  }
};

export default AboutMe;