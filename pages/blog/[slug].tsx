import Head from 'next/head';

import { Typography } from '@mui/material';
import { getPayloadClient } from '../../payload/payloadClient';
import { SECONDS_PER_DAY } from '../../utils/constants';
import { serializeRichText } from '../../utils/payload-richtext';

type Props = {
  post: any;
}

export default function BlogPost({ post }: Props) {
  const pageTitle = `${post.title} | r3pwn`;
  const postedDate = new Date(post.postedDate)
    .toLocaleDateString('en-us', {month: 'long', day: 'numeric', year: 'numeric' });
  
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Some info about me" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Typography variant='h1'>{post.title}</Typography>
        <Typography variant='subtitle1' gutterBottom>Posted on {postedDate}</Typography>
        <div className='blog-content'>
          {serializeRichText(post.content)}
        </div>
      </main>
    </>
  )
}

export async function getStaticProps({ params }) {
  const payload = await getPayloadClient();

  const data = await payload.find({
    collection: 'blog-post'
  });
  
  const post = data.docs.find(post => post.slug === params.slug);

  return {
    props: {
      post
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