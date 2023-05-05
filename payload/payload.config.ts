import { cloudStorage } from '@payloadcms/plugin-cloud-storage';
import { gcsAdapter } from '@payloadcms/plugin-cloud-storage/gcs';
import path from 'path';
import { buildConfig } from 'payload/config';

import Media from './collections/Media';
import AboutMe from './globals/AboutMe';

const googleCloudStorageAdapter = gcsAdapter({
  options: {
    credentials: JSON.parse(process.env.GCS_CREDENTIALS as string || '{}')
  },
  bucket: process.env.GCS_BUCKET as string,
})

export default buildConfig({
  plugins: [
    cloudStorage({
      collections: {
        'media': {
          adapter: googleCloudStorageAdapter
        }
      }
    })
  ],
  collections: [
    Media
  ],
  globals: [
    AboutMe
  ],
  typescript: {
    outputFile: path.resolve(__dirname, '../payload-types.ts'),
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