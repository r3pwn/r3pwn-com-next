import Head from 'next/head';

import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AppFooter from '../components/AppFooter';
import AppHeader from '../components/AppHeader';
import { getPayloadClient } from '../payload/payloadClient';
import { SECONDS_PER_DAY } from '../utils/constants';
import { generateMetadataTags } from '../utils/opengraph-tags';
import { FooterData } from '../utils/payload-types';
import { OpenGraphTags, SocialLink } from '../utils/types';

type Props = {
  metadata: OpenGraphTags;
  footer: FooterData;
}

export default function NotFound({ metadata, footer }: Props) {
  return (
    <>
      <Head>
        {generateMetadataTags(metadata)}
        <meta name="robots" content="noindex" />
      </Head>
      <AppHeader />
      <main>
        <Container maxWidth="lg">
          <Typography variant='h1' gutterBottom sx={{ mt: '1rem' }}>Content not found</Typography>
          <Typography variant='body1'>
            Unfortunately, the content you are looking for is not available at this URL. Please try visiting the <Link href='/blog'>Blog Posts</Link> page
            to see if the content you&apos;re looking for is available at a different URL.
          </Typography>
        </Container>
      </main>
      <AppFooter icons={footer.socialLinks as SocialLink[]} text={footer.copyrightText}/>
    </>
  )
}

export async function getStaticProps() {
  const payload = await getPayloadClient();

  const footer = await payload.findGlobal({
    slug: 'footer'
  });

  const metadata = {
    title: 'Content not found | r3pwn',
  } as OpenGraphTags;

  return {
    props: {
      metadata,
      footer
    },
    revalidate: SECONDS_PER_DAY * 30
  }
}
