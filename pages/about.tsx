import Head from 'next/head';

import { Box } from '@mui/material';
import PageWrapper from '../components/PageWrapper';
import { getPayloadClient } from "../payload/payloadClient";
import { SECONDS_PER_DAY } from '../utils/constants';
import { generateMetadataTags } from '../utils/opengraph-tags';
import { serializeRichText } from "../utils/payload-richtext";
import { AboutMeData, FooterData, PayloadMedia } from '../utils/payload-types';
import { OpenGraphTags, RichTextNode } from "../utils/types";

type Props = {
  data: AboutMeData;
  metadata: OpenGraphTags;
  footer: FooterData;
}

export default function About({ data, metadata, footer }: Props) {
  const profileImage = data.image as PayloadMedia;
  
  return (
    <>
      <Head>
        {generateMetadataTags(metadata)}
      </Head>
      <PageWrapper title='About me' footer={footer}>
        <Box component="div" sx={{ display: { xs: 'flex', md: 'block' }, flexDirection: 'column'}}>
          <Box
            component="img"
            sx={{
              borderRadius: '50%',
              maxWidth: '250px',
              float: 'left',
              marginLeft: { xs: 'auto', md: '0' },
              marginRight: { xs: 'auto', md: '3rem' },
              marginBottom: { xs: '0', md: '2rem' }
            }}
            alt={profileImage.altText}
            src={profileImage.url}
          />
          {serializeRichText(data.content as RichTextNode[])}
        </Box>
      </PageWrapper>
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