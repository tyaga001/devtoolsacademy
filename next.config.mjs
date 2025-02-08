import createMDX from "@next/mdx"

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh7-rt.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "tender-bugle-dd6.notion.site",
      },
    ],
  },

  experimental: {
    mdxRs: true,
  },
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
