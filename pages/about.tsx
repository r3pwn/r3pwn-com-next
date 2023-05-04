import { getPayloadClient } from "../payload/payloadClient";
import { serializeRichText } from "../utils/payload-utils";
import { PayloadMedia, RichTextNode } from "../utils/types";

type AboutMeData = {
  image: PayloadMedia;
  content: RichTextNode[];
}

type Props = {
  data: AboutMeData;
}

export default function About({ data }: Props) {
  return (
    <>
      {serializeRichText(data.content)}
    </>
  )
}

export async function getStaticProps() {
  const payload = await getPayloadClient();

  const data = await payload.findGlobal({
    slug: 'about-me'
  });

  return {
    props: {
      data
    }
  }
}