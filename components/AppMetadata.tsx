import { SITE_NAME } from "../utils/constants";
import { OpenGraphTags } from "../utils/types";

type Props = {
  metadata: OpenGraphTags;
}

function AppMetadata({ metadata }: Props) {
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
  );
}
export default AppMetadata;