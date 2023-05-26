import Head from 'next/head';
import { SECONDS_PER_DAY } from '../utils/constants';
import { generateMetadataTags, getPageMetadata } from '../utils/opengraph-tags';
import { OpenGraphTags } from "../utils/types";

import PageWrapper from '../components/PageWrapper';
import getPayloadClient from '../payload/payloadClient';
import { renderPageBlocks } from '../utils/payload-page';
import { FooterData, PageData } from '../utils/payload-types';
import { PayloadBlock } from '../utils/payload-types-block';

type Props = {
  data: PageData,
  metadata: OpenGraphTags;
  footer: FooterData;
}

export default function Home({ data, metadata, footer }: Props) {
  return (
    <>
      <Head>
        {generateMetadataTags(metadata)}
      </Head>
      <PageWrapper footer={footer}>
        {renderPageBlocks(data.content as PayloadBlock[]) as JSX.Element[]}
      </PageWrapper>
    </>
  )
}

export async function getStaticProps() {
  const payload = await getPayloadClient();

  const page = await payload.find({
    collection: 'page'
  }).then(response => {
    return (response.docs as PageData[]).find(doc => doc.slug === 'index');
  });

  if (!page) {
    return {
      notFound: true
    };
  }

  const footer = await payload.findGlobal({
    slug: 'footer'
  });

  return {
    props: {
      data: page,
      metadata: getPageMetadata(page),
      footer
    },
    revalidate: SECONDS_PER_DAY * 30
  }
}