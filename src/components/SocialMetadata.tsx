import Head from "next/head"

interface SocialMetadataProps {
  title: string
  description: string
  path: string
  image: string
  type?: "website" | "article"
}

const baseUrl = "https://devtoolsacademy.com"

export function SocialMetadata({
  title,
  description,
  path,
  image,
  type = "website",
}: SocialMetadataProps) {
  return (
    <Head>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={baseUrl + path} />
      <meta property="og:image" content={baseUrl + image} />
      <meta property="og:type" content={type} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  )
}
