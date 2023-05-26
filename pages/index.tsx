import Head from 'next/head';
import { SECONDS_PER_DAY } from '../utils/constants';
import { generateMetadataTags } from '../utils/opengraph-tags';
import { OpenGraphTags } from "../utils/types";

import { Box } from '@mui/material';
import PageWrapper from '../components/PageWrapper';
import PostTile from '../components/PostTile';
import getPayloadClient from '../payload/payloadClient';
import { FooterData, HomePageData, PayloadMedia } from '../utils/payload-types';

type Props = {
  data: HomePageData,
  metadata: OpenGraphTags;
  footer: FooterData;
}

export default function Home({ data, metadata, footer }: Props) {
  return (
    <>
      <Head>
        {generateMetadataTags(metadata)}
      </Head>
      <PageWrapper footer={footer}>
        <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', mt: '2rem' }}>
          {data.layout?.map(tile => (
            <PostTile 
              key={tile.id}
              title={tile.title}
              description={tile.description}
              url={tile.link}
              image={tile.image as PayloadMedia}
              sx={{ ml: { xs: 'auto', md: '0'}, mr: { xs: 'auto', md: '0'} }}
            />
          ))}
        </Box>
      </PageWrapper>
    </>
  )
}

export async function getStaticProps() {
  const payload = await getPayloadClient();

  const metadata = {
    title: 'Home | r3pwn',
    description: 'This page is under construction...',
    url: process.env.SITE_HOST
  } as OpenGraphTags;

  const data = await payload.findGlobal({
    slug: 'home-page'
  });

  const footer = await payload.findGlobal({
    slug: 'footer'
  });


  return {
    props: {
      data,
      metadata,
      footer
    },
    revalidate: SECONDS_PER_DAY * 30
  }
}