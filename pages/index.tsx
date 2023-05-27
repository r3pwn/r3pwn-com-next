import Head from 'next/head';
import { SECONDS_PER_DAY } from '../utils/constants';
import { generateMetadataTags, getPageMetadata } from '../utils/opengraph-tags';
import { OpenGraphTags } from "../utils/types";

import PageWrapper from '../components/PageWrapper';
import getPayloadClient from '../payload/payloadClient';
import { renderPageBlocks } from '../utils/payload-page';
import { HeaderFooterData, PageData } from '../utils/payload-types';
import { PayloadBlock } from '../utils/payload-types-block';

type Props = {
  data: PageData,
  metadata: OpenGraphTags;
  headerFooter: HeaderFooterData;
}

export default function Home({ data, metadata, headerFooter }: Props) {
  return (
    <>
      <Head>
        {generateMetadataTags(metadata)}
      </Head>
      <PageWrapper headerFooter={headerFooter}>
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

  const headerFooter = await payload.findGlobal({
    slug: 'header-footer'
  });

  return {
    props: {
      data: page,
      metadata: getPageMetadata(page),
      headerFooter
    },
    revalidate: SECONDS_PER_DAY * 30
  }
}