export const bustCache = (paths: string[]) => {
  return fetch(`${process.env.SITE_HOST}/api/next/cache-buster?secret=${process.env.CACHE_BUSTER_SECRET}`, {
    method: "POST",
    body: JSON.stringify(paths)
  });
};