import Head from 'next/head';

import { Container, Typography } from '@mui/material';
import Header from '../components/Header';
import { getPayloadClient } from "../payload/payloadClient";
import { SECONDS_PER_DAY } from '../utils/constants';
import { generateMetadataTags } from '../utils/opengraph-tags';
import { serializeRichText } from "../utils/payload-richtext";
import { OpenGraphTags, PayloadMedia, RichTextNode } from "../utils/types";

type AboutMeData = {
  image: PayloadMedia;
  content: RichTextNode[];
}

type Props = {
  data: AboutMeData;
  metadata: OpenGraphTags;
}

export default function About({ data, metadata }: Props) {
  return (
    <>
      <Head>
        {generateMetadataTags(metadata)}
      </Head>
      <Header />
      <main>
        <Container maxWidth="lg">
          <Typography variant="h1" sx={{ mt: '1rem' }}>About me</Typography>
          {serializeRichText(data.content)}
        </Container>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const payload = await getPayloadClient();

  const data = await payload.findGlobal({
    slug: 'about-me'
  });

  const metadata = {
    title: 'About Me | r3pwn',
    description: 'Some info about me',
    url: `${process.env.SITE_HOST}/about`
  } as OpenGraphTags;

  return {
    props: {
      data,
      metadata
    },
    revalidate: SECONDS_PER_DAY * 30
  }
}