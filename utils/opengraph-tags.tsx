import { OpenGraphTags } from './types';

export const generateMetadataTags = (metadata: OpenGraphTags) => {
  return (
    <>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      {Object.keys(metadata).map((key, index) => (
        <meta key={index} property={`og:${key}`} content={metadata[key]} />
      ))}
      <meta key="og:site_name" content="r3pwn" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </>
  )
};