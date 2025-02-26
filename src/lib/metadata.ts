import type { Metadata } from "next"

export const baseUrl = "https://www.devtoolsacademy.com/"

const config = {
  baseUrl,
  appName: "DevTools Academy",
  appDescription: "Your Guide to Developer Tools: Explore, Compare, and Learn.",
  creator: "DevTools Academy",
  authorName: "DevTools Academy",
  authorUrl: "https://www.devtoolsacademy.com/",
  keywords: ["Developer", "Tools", "Comparison", "Blogs"],
  twitterSite: "@devtoolsacademy",
  twitterCreator: "@devtoolsacademy",
}
export default config

interface MetadataArgs {
  path: string
  title: string
  description: string
  image?: string
}

export const getMetadata = ({
  path,
  title,
  description,
  image,
}: MetadataArgs): Metadata => {
  const metaTitle = title
  const metaDescription = description
  const metaImage = image ?? `${baseUrl}api/og?title=DevTools Academy`

  const metadata: Metadata = {
    title: metaTitle,
    description: metaDescription,

    metadataBase: new URL(baseUrl),

    applicationName: config.appName,
    creator: config.creator,
    authors: [{ name: config.authorName, url: config.authorUrl }],
    robots:
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    keywords: config.keywords,

    icons: {
      icon: "/icons/favicon.png",
      shortcut: "/icons/icon-512x512.png",
      apple: "/icons/icon-512x512.png",
    },
    manifest: `${config.baseUrl}/manifest.json`,

    openGraph: {
      type: "website",
      url: `${config.baseUrl}${path}`,
      siteName: "<Site Name>",
      title: metaTitle,
      description: metaDescription,
      images: metaImage,
      // videos: "",  // INFO: og video option
    },

    twitter: {
      card: "summary_large_image",
      site: config.twitterSite,
      creator: config.twitterCreator,
      title: metaTitle,
      description: metaDescription,
      images: metaImage,
    },

    appleWebApp: {
      capable: true,
      title: metaTitle,
      startupImage: metaImage,
      statusBarStyle: "black-translucent",
    },

    formatDetection: {
      telephone: true,
      date: true,
      address: true,
      email: true,
      url: true,
    },

    appLinks: {},
  }
  return metadata
}
