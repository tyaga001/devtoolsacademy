import createMDX from "@next/mdx"

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  experimental: {
    mdxRs: true,
  },
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
