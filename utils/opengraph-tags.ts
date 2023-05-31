import { SITE_NAME } from './constants';
import { PageData, PayloadMedia } from './payload-types';
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