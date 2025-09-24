export const revalidate = 86400

const robotsTxt = `User-agent: *
Sitemap: https://www.devtoolsacademy.com/sitemap.xml
`

export async function GET() {
  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=UTF-8",
      "Cache-Control": "public, max-age=86400",
    },
  })
}
