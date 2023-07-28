export async function GET() {
  const robotsContent = `
    # *
    User-agent: *
    Allow: /
    
    # Host
    Host: ${process.env.SITE_HOST}
    
    # Sitemaps
    Sitemap: ${process.env.SITE_HOST}/sitemap.xml`
    // remove leading spaces
    .replace(/^ +/gm, '').trimStart();

  return new Response(robotsContent, {
    status: 200,
    headers: {
      'Content-type': 'text/plain',
      // Instruct the Vercel edge to cache the file for 14 days
      'Cache-control': 'stale-while-revalidate, s-maxage=1209600'
    }
  });
}