import Head from 'next/head';
import { getPayloadClient } from "../payload/payloadClient";
import { SECONDS_PER_DAY } from '../utils/constants';
import { generateMetadataTags } from '../utils/opengraph-tags';
import { OpenGraphTags } from "../utils/types";

import ConstructionIcon from '@mui/icons-material/Construction';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { Typography } from '@mui/material';

type Props = {
  metadata: OpenGraphTags;
}

export default function Home({ metadata }: Props) {
  return (
    <>
      <Head>
        {generateMetadataTags(metadata)}
      </Head>
      <main style={{ color: 'coral', height: '100vh', paddingTop: '5rem' }}>
        <div className='icons' style={{ textAlign: 'center' }}>
          <ConstructionIcon sx={{ height: '5rem', width: '5rem' }} />
          <ReportProblemIcon sx={{ height: '5rem', width: '5rem' }} />
        </div>
        <Typography variant='h1' style={{ textAlign: 'center' }}>
          This site is currently under construction...
        </Typography>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const payload = await getPayloadClient();

  const metadata = {
    title: 'Home | r3pwn',
    description: 'This page is under construction...',
    url: process.env.SITE_HOST
  } as OpenGraphTags;

  return {
    props: {
      metadata
    },
    revalidate: SECONDS_PER_DAY * 30
  }
}