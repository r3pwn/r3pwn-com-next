import { GlobalConfig } from "payload/types";

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
};

export default AboutMe;