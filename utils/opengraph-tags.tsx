import { OpenGraphTags } from './types';

export const generateMetadataTags = (metadata: OpenGraphTags) => {
  return (
    <>
      {Object.keys(metadata).map((key, index) => (
        <meta key={index} property={`og:${key}`} content={metadata[key]} />
      ))}
    </>
  )
};