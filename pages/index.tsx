import Head from 'next/head';
import { SECONDS_PER_DAY } from '../utils/constants';
import { getPageMetadata, renderMetadata } from '../utils/metadata';
import { OpenGraphTags } from '../utils/types';

import ContentBlock from '../components/ContentBlock';
import PageWrapper from '../components/PageWrapper';
import getPayloadClient, { getPagesBySlug } from '../payload/payloadClient';
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
        {renderMetadata(metadata)}
      </Head>
      <PageWrapper navigation={navigation}>
        {(data.content as PayloadBlock[]).map((block, index) => 
          (<ContentBlock key={index} block={block} />))
        }
      </PageWrapper>
    </>
  )
}

export async function getStaticProps({ draftMode }: { draftMode: Boolean }) {
  const payload = await getPayloadClient();

  const page = (await getPagesBySlug('index', draftMode))?.at(0);

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