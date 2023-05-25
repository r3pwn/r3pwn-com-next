import Head from 'next/head';

import { Box, Typography } from '@mui/material';
import PageWrapper from '../../components/PageWrapper';
import PostTile from '../../components/PostTile';
import { getPayloadClient } from '../../payload/payloadClient';
import { SECONDS_PER_DAY } from '../../utils/constants';
import { generateMetadataTags } from '../../utils/opengraph-tags';
import { FooterData, Hackathon, PayloadMedia } from '../../utils/payload-types';
import { OpenGraphTags } from '../../utils/types';

type Props = {
  posts: Hackathon[];
  metadata: OpenGraphTags;
  footer: FooterData;
}

export default function Blog({ posts, metadata, footer }: Props) {
  return (
    <>
      <Head>
        {generateMetadataTags(metadata)}
      </Head>
      <PageWrapper footer={footer}>
        <Typography variant='h1' gutterBottom sx={{ mt: '1rem' }}>Hackathon projects</Typography>
        <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {posts.map(post => (
            <PostTile 
              key={post.slug}
              title={`${post.event} - ${post.title}`}
              description={post.description}
              url={`/hackathons/${post.slug}`}
              image={post.featuredImage as PayloadMedia}
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

  const result = await payload.find({
    collection: 'hackathon'
  });

  const footer = await payload.findGlobal({
    slug: 'footer'
  });

  const metadata = {
    title: 'Hackathon projects | r3pwn',
    description: 'Some of the projects I\'ve been involved with at hackathons...',
    url: `${process.env.SITE_HOST}/hackathons`
  } as OpenGraphTags;

  return {
    props: {
      posts: result.docs,
      metadata,
      footer
    },
    revalidate: SECONDS_PER_DAY * 30
  }
}
