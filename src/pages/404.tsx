import Head from 'next/head';

import { Link, Typography } from '@mui/material';
import PageWrapper from '../components/PageWrapper';
import { SECONDS_PER_DAY } from '../utils/constants';
import { renderMetadata } from '../utils/metadata';
import { NavigationData } from '@/payload/payload-types';
import { OpenGraphTags } from '../utils/types';
import { getNavigation } from '@/payload/payloadClient';

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
  const navigation = await getNavigation();

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
