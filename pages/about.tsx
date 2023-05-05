import Head from 'next/head';

import { getPayloadClient } from "../payload/payloadClient";
import { SECONDS_PER_DAY } from '../utils/constants';
import { serializeRichText } from "../utils/payload-richtext";
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
      <Head>
        <title>About Me | r3pwn</title>
        <meta name="description" content="Some info about me" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {serializeRichText(data.content)}
      </main>
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
    },
    revalidate: SECONDS_PER_DAY * 30
  }
}