import Head from 'next/head';

import { Typography } from '@mui/material';
import { getPayloadClient } from '../../payload/payloadClient';
import { SECONDS_PER_DAY } from '../../utils/constants';
import { generateMetadataTags } from '../../utils/opengraph-tags';
import { serializeRichText } from '../../utils/payload-richtext';
import { BlogPost, OpenGraphTags } from '../../utils/types';

type RouteParams = {
  slug: string;
}
type Props = {
  post: BlogPost;
  metadata: OpenGraphTags;
}

export default function BlogPost({ post, metadata }: Props) {
  const postedDate = new Date(post.postedDate)
    .toLocaleDateString('en-us', {month: 'long', day: 'numeric', year: 'numeric' });
  
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={post.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {generateMetadataTags(metadata)}
      </Head>
      <main className='blog-post'>
        <Typography variant='h1'>{post.title}</Typography>
        <Typography variant='subtitle1' gutterBottom>Posted on {postedDate}</Typography>
        <div className='blog-content'>
          {serializeRichText(post.content)}
        </div>
      </main>
    </>
  )
}

export async function getStaticProps({ params }: { params: RouteParams }) {
  const payload = await getPayloadClient();

  const data = await payload.find({
    collection: 'blog-post'
  });
  
  const post = data.docs.find(post => post.slug === params.slug) as BlogPost;

  const metadata = {
    title: `${post.title} | r3pwn`,
    description: post.description,
    url: `${process.env.SITE_HOST}/blog/${post.slug}`
  } as OpenGraphTags;

  if (post.featuredImage) {
    metadata.image = post.featuredImage.url;
  }

  return {
    props: {
      post,
      metadata
    },
    revalidate: SECONDS_PER_DAY * 30
  }
}

export async function getStaticPaths() {
  const payload = await getPayloadClient();

  const data = await payload.find({
    collection: 'blog-post'
  });

  return {
    paths: data.docs.map(post => ({ params: { slug: post.slug } })),
    fallback: false, // can also be true or 'blocking'
  };
}