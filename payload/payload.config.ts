import { cloudStorage } from '@payloadcms/plugin-cloud-storage';
import { gcsAdapter } from '@payloadcms/plugin-cloud-storage/gcs';
import nestedDocs from '@payloadcms/plugin-nested-docs';
import path from 'path';
import { buildConfig } from 'payload/config';
import dotenv from 'dotenv'

import Media from './collections/Media';
import Page from './collections/Page';
import Navigation from './globals/Navigation';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

const googleCloudStorageAdapter = gcsAdapter({
  options: {
    credentials: JSON.parse(process.env.GCS_CREDENTIALS as string || '{}')
  },
  bucket: process.env.GCS_BUCKET as string
})

export default buildConfig({
  plugins: [
    nestedDocs({
      collections: ['page'],
      generateLabel: (_, doc) => doc.title as string,
      generateURL: (docs) =>
        docs.reduce((url, doc) => `${url}/${doc.slug as string}`, ''),
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
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'schema.graphql'),
  },
  upload: {
    limits: {
      fileSize: 10000000, // 5MB, written in bytes
    }
  }
});