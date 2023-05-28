import { cloudStorage } from '@payloadcms/plugin-cloud-storage';
import { gcsAdapter } from '@payloadcms/plugin-cloud-storage/gcs';
import nestedDocs from "@payloadcms/plugin-nested-docs";
import path from 'path';
import { buildConfig } from 'payload/config';

import Media from './collections/Media';
import Page from './collections/Page';
import Navigation from './globals/Navigation';

const googleCloudStorageAdapter = gcsAdapter({
  options: {
    credentials: JSON.parse(process.env.GCS_CREDENTIALS as string || '{}')
  },
  bucket: process.env.GCS_BUCKET as string,
})

export default buildConfig({
  plugins: [
    nestedDocs({
      collections: ["page"],
      generateLabel: (_, doc) => doc.title as string,
      generateURL: (docs) =>
        docs.reduce((url, doc) => `${url}/${doc.slug as string}`, ""),
    }),
    cloudStorage({
      collections: {
        'media': {
          adapter: googleCloudStorageAdapter
        }
      }
    })
  ],
  collections: [
    Page,
    Media
  ],
  globals: [
    Navigation
  ],
  typescript: {
    outputFile: path.resolve(__dirname, '../utils/payload-types.ts'),
  },
  upload: {
    limits: {
      fileSize: 10000000, // 5MB, written in bytes
    }
  },
  graphQL: {
    disable: true
  }
});