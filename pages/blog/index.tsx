import Head from 'next/head';

import { getPayloadClient } from '../../payload/payloadClient';
import { SECONDS_PER_DAY } from '../../utils/constants';

type Props = {
  posts: any;
}

export default function Blog({ posts }: Props) {
  return (
    <>
      <Head>
        <title>Blog Posts | r3pwn</title>
        <meta name="description" content="Some info about me" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {JSON.stringify(posts)}
      </main>
    </>
  )
}

export async function getStaticProps() {
  const payload = await getPayloadClient();

  const posts = await payload.find({
    collection: 'blog-post'
  });

  return {
    props: {
      posts
    },
    revalidate: SECONDS_PER_DAY * 30
  }
}
