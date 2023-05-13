import Head from 'next/head';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Header from '../../components/Header';
import { getPayloadClient } from '../../payload/payloadClient';
import { SECONDS_PER_DAY } from '../../utils/constants';
import { generateMetadataTags } from '../../utils/opengraph-tags';
import { BlogPost, OpenGraphTags } from '../../utils/types';

type Props = {
  posts: BlogPost[];
  metadata: OpenGraphTags;
}

export default function Blog({ posts, metadata }: Props) {
  return (
    <>
      <Head>
        {generateMetadataTags(metadata)}
      </Head>
      <Header />
      <main>
        <Container maxWidth="lg">
          <Typography variant='h1' sx={{ mt: '1rem' }}>Blog posts</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {posts.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>{post.title}</Link>
            ))}
          </Box>
        </Container>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: 'blog-post'
  });

  const metadata = {
    title: 'Blog Posts | r3pwn',
    description: 'A collection of blog posts',
    url: `${process.env.SITE_HOST}/blog`
  } as OpenGraphTags;

  return {
    props: {
      posts: result.docs,
      metadata
    },
    revalidate: SECONDS_PER_DAY * 30
  }
}
