import Head from 'next/head';
import { SECONDS_PER_DAY } from '../utils/constants';
import { getPageMetadata, renderMetadata } from '../utils/metadata';
import { OpenGraphTags } from "../utils/types";

import ContentBlock from '../components/ContentBlock';
import PageWrapper from '../components/PageWrapper';
import getPayloadClient from '../payload/payloadClient';
import { NavigationData, PageData, PayloadMedia, TileSheetBlock } from '../utils/payload-types';
import { PayloadBlock } from '../utils/payload-types-block';

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
        {renderMetadata(metadata)}
      </Head>
      <PageWrapper
        title={data.showTitle ? data.title : undefined}
        subtitle={data.subtitle}
        navigation={navigation}>
        {(data.content as PayloadBlock[]).map((block, index) => 
          (<ContentBlock key={index} block={block} />))
        }
      </PageWrapper>
    </>
  )
}

export async function getStaticProps({ params }: { params: RouteParams }) {
  const payload = await getPayloadClient();

  const currentUrl = `/${params.slug.join('/')}`;
  
  const pages = await payload.find({
    collection: 'page',
    where: {
      slug: {
        equals: params.slug.at(-1)
      }
    }
  }).then(result => (result?.docs as PageData[] | undefined));
  
  const currentPage = pages?.find(doc => doc.breadcrumbs?.at(-1)?.url === currentUrl);

  if (!currentPage) {
    return {
      notFound: true
    };
  }

  if (currentPage.content) {
    const parentSheetIndex = currentPage.content.map(block => block.blockType).indexOf('parent-tile-sheet');
    if (parentSheetIndex > -1) {
      const childPages = await payload.find({
        collection: 'page',
        where: {
          parent: {
            equals: currentPage.id
          }
        },
        sort: '-postedDate'
      }).then(result => (result?.docs as PageData[] | undefined));
      
      currentPage.content[parentSheetIndex].blockType = 'tile-sheet';
      (currentPage.content[parentSheetIndex] as TileSheetBlock).tiles = childPages?.map(childPage => (
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