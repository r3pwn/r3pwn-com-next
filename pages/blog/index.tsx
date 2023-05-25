import Head from 'next/head';

import { Box, Typography } from '@mui/material';
import PageWrapper from '../../components/PageWrapper';
import PostTile from '../../components/PostTile';
import { getPayloadClient } from '../../payload/payloadClient';
import { SECONDS_PER_DAY } from '../../utils/constants';
import { generateMetadataTags } from '../../utils/opengraph-tags';
import { BlogPost, FooterData, PayloadMedia } from '../../utils/payload-types';
import { OpenGraphTags } from '../../utils/types';

type Props = {
  posts: BlogPost[];
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
        <Typography variant='h1' gutterBottom sx={{ mt: '1rem' }}>Blog posts</Typography>
        <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {posts.map(post => (
            <PostTile 
              key={post.slug}
              title={post.title}
              description={post.description}
              url={`/blog/${post.slug}`}
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
    collection: 'blog-post'
  });

  const footer = await payload.findGlobal({
    slug: 'footer'
  });

  const metadata = {
    title: 'Blog Posts | r3pwn',
    description: 'A collection of blog posts',
    url: `${process.env.SITE_HOST}/blog`
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
