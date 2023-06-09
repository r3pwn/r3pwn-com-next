import Head from 'next/head';

import { Link, Typography } from '@mui/material';
import PageWrapper from '../components/PageWrapper';
import { getPayloadClient } from '../payload/payloadClient';
import { SECONDS_PER_DAY } from '../utils/constants';
import { renderMetadata } from '../utils/metadata';
import { NavigationData } from '../utils/payload-types';
import { OpenGraphTags } from '../utils/types';

type Props = {
  metadata: OpenGraphTags;
  navigation: NavigationData;
}

export default function NotFound({ metadata, navigation }: Props) {
  return (
    <>
      <Head>
        {renderMetadata(metadata)}
        <meta name="robots" content="noindex" />
      </Head>
      <PageWrapper title='Content not found' navigation={navigation}>
        <Typography variant='body1'>
          Unfortunately, the content you are looking for is not available at this URL. Please try visiting the <Link href='/blog'>Blog Posts</Link> page
          to see if the content you&apos;re looking for is available at a different URL.
        </Typography>
      </PageWrapper>
    </>
  )
}

export async function getStaticProps() {
  const payload = await getPayloadClient();

  const navigation = await payload.findGlobal({ slug: 'navigation' });

  const metadata = {
    title: 'Content not found | r3pwn',
  } as OpenGraphTags;

  return {
    props: {
      metadata,
      navigation
    },
    revalidate: SECONDS_PER_DAY * 30
  }
}
