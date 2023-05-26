import { cloudStorage } from '@payloadcms/plugin-cloud-storage';
import { gcsAdapter } from '@payloadcms/plugin-cloud-storage/gcs';
import path from 'path';
import { buildConfig } from 'payload/config';

import BlogPost from './collections/BlogPost';
import Hackathon from './collections/Hackathon';
import Media from './collections/Media';
import AboutMe from './globals/AboutMe';
import Footer from './globals/Footer';
import HomePage from './globals/HomePage';

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
    BlogPost,
    Hackathon,
    Media
  ],
  globals: [
    AboutMe,
    HomePage,
    Footer
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