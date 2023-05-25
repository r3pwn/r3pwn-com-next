import Head from 'next/head';

import { Box } from '@mui/material';
import PageWrapper from '../../components/PageWrapper';
import { getPayloadClient } from '../../payload/payloadClient';
import { SECONDS_PER_DAY } from '../../utils/constants';
import { generateMetadataTags } from '../../utils/opengraph-tags';
import { serializeRichText } from '../../utils/payload-richtext';
import { FooterData, Hackathon, PayloadMedia } from '../../utils/payload-types';
import { OpenGraphTags, RichTextNode } from '../../utils/types';

type RouteParams = {
  slug: string;
}
type Props = {
  post: Hackathon;
  metadata: OpenGraphTags;
  footer: FooterData;
}

export default function Hackathon({ post, metadata, footer }: Props) {
  const postedDate = new Date(post.postedDate)
    .toLocaleDateString('en-us', {month: 'long', day: 'numeric', year: 'numeric' });
  const featuredImage = post.featuredImage as PayloadMedia;
  
  return (
    <>
      <Head>
        {generateMetadataTags(metadata)}
      </Head>
      <PageWrapper title={post.title} subtitle={`Created for ${post.event} (${postedDate})`} footer={footer}>
        <div className='blog-content'>
          {post.showFeaturedImage && featuredImage && <Box
            component="img"
            sx={{
              height: '100%',
              width: '80%',
              marginLeft: '10%'
            }}
            alt={featuredImage.altText}
            src={featuredImage.url}
          />}
          {serializeRichText(post.content as RichTextNode[])}
        </div>
      </PageWrapper>
    </>
  )
}

export async function getStaticProps({ params }: { params: RouteParams }) {
  const payload = await getPayloadClient();

  const data = await payload.find({
    collection: 'hackathon'
  });
  
  const post = data.docs.find(post => post.slug === params.slug) as Hackathon;

  if (!post) {
    return {
      notFound: true
    };
  }

  const footer = await payload.findGlobal({
    slug: 'footer'
  });
  
  const metadata = {
    title: `${post.title} | r3pwn`,
    description: post.description,
    url: `${process.env.SITE_HOST}/hackathons/${post.slug}`
  } as OpenGraphTags;

  if (post.featuredImage) {
    metadata.image = (post.featuredImage as PayloadMedia).url;
  }

  return {
    props: {
      post,
      metadata,
      footer
    },
    revalidate: SECONDS_PER_DAY * 30
  }
}

export async function getStaticPaths() {
  const payload = await getPayloadClient();

  const data = await payload.find({
    collection: 'hackathon'
  });

  return {
    paths: data.docs.map(post => ({ params: { slug: post.slug } })),
    fallback: 'blocking'
  };
}