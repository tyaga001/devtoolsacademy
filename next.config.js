const withMDX = require('@next/mdx')();

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    reactStrictMode: true,
    experimental: {
        appDir: true,
        mdxRs: true,
    },
};

module.exports = withMDX(nextConfig);