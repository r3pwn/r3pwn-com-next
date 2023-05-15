import Head from 'next/head';

import { Container, Typography } from '@mui/material';
import AppFooter from '../components/AppFooter';
import AppHeader from '../components/AppHeader';
import { getPayloadClient } from "../payload/payloadClient";
import { SECONDS_PER_DAY } from '../utils/constants';
import { generateMetadataTags } from '../utils/opengraph-tags';
import { serializeRichText } from "../utils/payload-richtext";
import { FooterData, OpenGraphTags, PayloadMedia, RichTextNode } from "../utils/types";

type AboutMeData = {
  image: PayloadMedia;
  content: RichTextNode[];
}

type Props = {
  data: AboutMeData;
  metadata: OpenGraphTags;
  footer: FooterData;
}

export default function About({ data, metadata, footer }: Props) {
  return (
    <>
      <Head>
        {generateMetadataTags(metadata)}
      </Head>
      <AppHeader />
      <main>
        <Container maxWidth="lg">
          <Typography variant="h1" gutterBottom sx={{ mt: '1rem' }}>About me</Typography>
          {serializeRichText(data.content)}
        </Container>
      </main>
      <AppFooter icons={footer.socialLinks} text={footer.copyrightText}/>
    </>
  )
}

export async function getStaticProps() {
  const payload = await getPayloadClient();

  const data = await payload.findGlobal({
    slug: 'about-me'
  });

  const footer = await payload.findGlobal({
    slug: 'footer'
  });

  const metadata = {
    title: 'About Me | r3pwn',
    description: 'Some info about me',
    url: `${process.env.SITE_HOST}/about`
  } as OpenGraphTags;

  return {
    props: {
      data,
      metadata,
      footer
    },
    revalidate: SECONDS_PER_DAY * 30
  }
}