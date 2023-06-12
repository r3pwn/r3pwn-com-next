This is a [Next.js](https://nextjs.org/) project that integrates [PayloadCMS](https://payloadcms.com/).

## Environment Setup

This site utilizes MongoDB and Google Cloud Storage, and will need you to provide your own environment variables.

You can make a copy of the `.env-example` file, name it `.env`, and populate the following variables:

- `MONGODB_URI`
- `PAYLOAD_SECRET`
- `GCS_CREDENTIALS`
- `GCS_BUCKET`

## Getting Started

Once you have the environment set up, you can run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Opening [http://localhost:3000/admin](http://localhost:3000/admin) will open the PayloadCMS Admin site, where you can add content to the site.

**Note**: Without any content, you may just see a blank page. This is expected. Creating a page with a slug of `index` will cause that page to become the homepage.

## Libraries

To learn more about the libraries used in this project, you can take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial
- [PayloadCMS Documentation](https://payloadcms.com/docs/getting-started/what-is-payload) - learn more about PayloadCMS
- [next-payload](https://github.com/payloadcms/next-payload) - add PayloadCMS to an existing Next.js project (serverlessly)