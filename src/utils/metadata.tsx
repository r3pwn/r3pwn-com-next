import { SITE_NAME } from './constants';
import { PageData, PayloadMedia } from '@/payload/payload-types';
import { OpenGraphTags } from './types';

export const getPageMetadata = (page: PageData) : OpenGraphTags => {
  const metadata = {
    title: `${page.title} | ${SITE_NAME}`,
    description: page.description,
    url: process.env.SITE_HOST
  } as OpenGraphTags;

  const latestBreadcrumb = page.breadcrumbs?.at(-1)?.url;

  if (latestBreadcrumb && latestBreadcrumb != '/index') {
    metadata.url = `${process.env.SITE_HOST}${latestBreadcrumb}`;
  }

  if ((page.featuredImage as PayloadMedia)?.url) {
    metadata.image = (page.featuredImage as PayloadMedia).url;
  }

  return metadata;
};

// This needs to be a helper function because next/head can only examine direct children
export const renderMetadata = (metadata: OpenGraphTags) => {
  return (
    <>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      {Object.keys(metadata).map((key, index) => (
        <meta key={index} property={`og:${key}`} content={metadata[key]} />
      ))}
      <meta name="og:site_name" content={SITE_NAME} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      {metadata.url && <link rel="canonical" href={metadata.url} />}
    </>
  )
}