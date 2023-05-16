import Head from 'next/head';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AppFooter from '../../components/AppFooter';
import AppHeader from '../../components/AppHeader';
import PostTile from '../../components/PostTile';
import { getPayloadClient } from '../../payload/payloadClient';
import { SECONDS_PER_DAY } from '../../utils/constants';
import { generateMetadataTags } from '../../utils/opengraph-tags';
import { FooterData, HackathonProject, OpenGraphTags } from '../../utils/types';

type Props = {
  posts: HackathonProject[];
  metadata: OpenGraphTags;
  footer: FooterData;
}

export default function Blog({ posts, metadata, footer }: Props) {
  return (
    <>
      <Head>
        {generateMetadataTags(metadata)}
      </Head>
      <AppHeader />
      <main>
        <Container maxWidth="lg">
          <Typography variant='h1' gutterBottom sx={{ mt: '1rem' }}>Hackathon projects</Typography>
          <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {posts.map(post => (
              <PostTile 
                key={post.slug}
                title={`${post.event} - ${post.title}`}
                description={post.description}
                url={`/hackathons/${post.slug}`}
                image={post.featuredImage}
                sx={{ ml: { xs: 'auto', md: '0'}, mr: { xs: 'auto', md: '0'} }}
              />
            ))}
          </Box>
        </Container>
      </main>
      <AppFooter icons={footer.socialLinks} text={footer.copyrightText}/>
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
