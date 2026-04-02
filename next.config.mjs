import createMDX from "@next/mdx"
import remarkGfm from "remark-gfm"

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
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
  },
})

export default withMDX(nextConfig)
