import Head from 'next/head';

import { Container, Typography } from '@mui/material';
import { notFound } from 'next/navigation';
import AppFooter from '../../components/AppFooter';
import AppHeader from '../../components/AppHeader';
import { getPayloadClient } from '../../payload/payloadClient';
import { SECONDS_PER_DAY } from '../../utils/constants';
import { generateMetadataTags } from '../../utils/opengraph-tags';
import { serializeRichText } from '../../utils/payload-richtext';
import { BlogPost, FooterData, Hackathon, PayloadMedia } from '../../utils/payload-types';
import { OpenGraphTags, RichTextNode, SocialLink } from '../../utils/types';

type RouteParams = {
  slug: string;
}
type Props = {
  post: Hackathon;
  metadata: OpenGraphTags;
  footer: FooterData;
}

export default function BlogPost({ post, metadata, footer }: Props) {
  const postedDate = new Date(post.postedDate)
    .toLocaleDateString('en-us', {month: 'long', day: 'numeric', year: 'numeric' });
  
  return (
    <>
      <Head>
        {generateMetadataTags(metadata)}
      </Head>
      <AppHeader />
      <main className='blog-post'>
        <Container maxWidth="lg" sx={{ mb: '1rem' }}>
          <Typography variant='h1' sx={{ mt: '1rem' }}>{post.title}</Typography>
          <Typography variant='subtitle1' gutterBottom>Created for {post.event} ({postedDate})</Typography>
          <div className='blog-content'>
            {serializeRichText(post.content as RichTextNode[])}
          </div>
        </Container>
      </main>
      <AppFooter icons={footer.socialLinks as SocialLink[]} text={footer.copyrightText}/>
    </>
  )
}

export async function getStaticProps({ params }: { params: RouteParams }) {
  const payload = await getPayloadClient();

  const data = await payload.find({
    collection: 'hackathon'
  });
  
  const post = data.docs.find(post => post.slug === params.slug) as BlogPost;

  if (!post) {
    notFound();
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
    fallback: false // can also be true or 'blocking'
  };
}