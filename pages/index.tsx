import Head from 'next/head';
import { SECONDS_PER_DAY } from '../utils/constants';
import { generateMetadataTags } from '../utils/opengraph-tags';
import { OpenGraphTags, SocialLink } from "../utils/types";

import ConstructionIcon from '@mui/icons-material/Construction';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { Typography } from '@mui/material';
import AppFooter from '../components/AppFooter';
import AppHeader from '../components/AppHeader';
import getPayloadClient from '../payload/payloadClient';
import { FooterData } from '../utils/payload-types';

type Props = {
  metadata: OpenGraphTags;
  footer: FooterData;
}

export default function Home({ metadata, footer }: Props) {
  return (
    <>
      <Head>
        {generateMetadataTags(metadata)}
      </Head>
      <AppHeader />
      <main style={{ color: 'coral', height: '50vh', paddingTop: '5rem' }}>
        <div className='icons' style={{ textAlign: 'center' }}>
          <ConstructionIcon sx={{ height: '5rem', width: '5rem' }} />
          <ReportProblemIcon sx={{ height: '5rem', width: '5rem' }} />
        </div>
        <Typography variant='h1' style={{ textAlign: 'center' }}>
          This site is currently under construction...
        </Typography>
      </main>
      <AppFooter icons={footer.socialLinks as SocialLink[]} text={footer.copyrightText}/>
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

  const footer = await payload.findGlobal({
    slug: 'footer'
  });


  return {
    props: {
      metadata,
      footer
    },
    revalidate: SECONDS_PER_DAY * 30
  }
}