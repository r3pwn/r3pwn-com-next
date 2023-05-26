import { GlobalConfig } from "payload/types";
import LinkTile from "../blocks/LinkTile";
import { bustCache } from "../utils/cache-buster";

const HomePage: GlobalConfig = {
  slug: "home-page",
  typescript: {
    interface: "HomePageData"
  },
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
       LinkTile
      ]
    }
  ],
  hooks: {
    afterChange: [
      async () => {
        await bustCache(['/']);
      }
    ]
  }
};

export default HomePage;