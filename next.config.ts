import type { NextConfig } from "next"
import createMDX from "@next/mdx"

const nextConfig: NextConfig = {
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
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
