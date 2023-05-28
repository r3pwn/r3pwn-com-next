import Head from 'next/head';
import { SECONDS_PER_DAY } from '../utils/constants';
import { generateMetadataTags, getPageMetadata } from '../utils/opengraph-tags';
import { OpenGraphTags } from "../utils/types";

import PageWrapper from '../components/PageWrapper';
import getPayloadClient from '../payload/payloadClient';
import { renderPageBlocks } from '../utils/payload-page';
import { NavigationData, PageData } from '../utils/payload-types';
import { PayloadBlock } from '../utils/payload-types-block';

type Props = {
  data: PageData,
  metadata: OpenGraphTags;
  navigation: NavigationData;
}

export default function Home({ data, metadata, navigation }: Props) {
  return (
    <>
      <Head>
        {generateMetadataTags(metadata)}
      </Head>
      <PageWrapper navigation={navigation}>
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

  const navigation = await payload.findGlobal({ slug: 'navigation' });

  return {
    props: {
      data: page,
      metadata: getPageMetadata(page),
      navigation
    },
    revalidate: SECONDS_PER_DAY * 30
  }
}