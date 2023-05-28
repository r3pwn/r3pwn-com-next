import Head from 'next/head';
import { SECONDS_PER_DAY } from '../utils/constants';
import { generateMetadataTags, getPageMetadata } from '../utils/opengraph-tags';
import { OpenGraphTags } from "../utils/types";

import PageWrapper from '../components/PageWrapper';
import getPayloadClient from '../payload/payloadClient';
import { renderPageBlocks } from '../utils/payload-page';
import { NavigationData, PageData, PayloadMedia } from '../utils/payload-types';
import { PayloadBlock, TileSheetBlock } from '../utils/payload-types-block';

type RouteParams = {
  slug: string[];
}
type Props = {
  data: PageData,
  metadata: OpenGraphTags;
  navigation: NavigationData;
}

export default function DynamicPage({ data, metadata, navigation }: Props) {
  return (
    <>
      <Head>
        {generateMetadataTags(metadata)}
      </Head>
      <PageWrapper
        title={data.showTitle ? data.title : undefined}
        subtitle={data.subtitle}
        navigation={navigation}>
        {renderPageBlocks(data.content as PayloadBlock[]) as JSX.Element[]}
      </PageWrapper>
    </>
  )
}

export async function getStaticProps({ params }: { params: RouteParams }) {
  const payload = await getPayloadClient();

  const currentUrl = `/${params.slug.join('/')}`;

  const pages = await payload.find({ collection: 'page' });
  const currentPage = (pages.docs as PageData[]).find(doc => 
    doc.breadcrumbs && doc.breadcrumbs.at(-1)?.url === currentUrl);

  if (!currentPage) {
    return {
      notFound: true
    };
  }

  if (currentPage.content) {
    const parentSheetIndex = currentPage.content.map(block => block.blockType).indexOf('parent-tile-sheet');
    if (parentSheetIndex > -1) {
      const children = (pages.docs as PageData[])
        .filter(doc => doc.parent && (doc.parent as PageData).id === currentPage.id);
      
      currentPage.content[parentSheetIndex].blockType = 'tile-sheet';
      (currentPage.content[parentSheetIndex] as TileSheetBlock).tiles = children.map(childPage => (
        {
          title: childPage.title,
          description: childPage.description,
          link: childPage,
          image: childPage.featuredImage as PayloadMedia || null,
          blockType: 'link-tile'
        }
      ))
    }
  }

  const navigation = await payload.findGlobal({ slug: 'navigation' });

  return {
    props: {
      data: currentPage,
      metadata: getPageMetadata(currentPage),
      navigation
    },
    revalidate: SECONDS_PER_DAY * 30
  }
}

export async function getStaticPaths() {
  const payload = await getPayloadClient();

  const pages = await payload.find({ collection: 'page' });
  
  return {
    paths: (pages.docs as PageData[])
      .map(doc => {
        if (!doc.breadcrumbs || !doc.breadcrumbs.length) {
          return null;
        }
        return {
          params: {
            slug: doc.breadcrumbs.at(-1)?.url?.slice(1).split('/')
          }
        }
      })
      .filter(path => path != null),
    fallback: 'blocking'
  };
}