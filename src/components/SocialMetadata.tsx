import Head from "next/head"

interface SocialMetadataProps {
  title: string
  description: string
  url: string
  image: string
  type?: "website" | "article"
}

export function SocialMetadata({
  title,
  description,
  url,
  image,
  type = "website",
}: SocialMetadataProps) {
  return (
    <Head>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={type} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  )
}
