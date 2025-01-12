import Image, { ImageProps } from "next/image"
import { MDXRemote } from "next-mdx-remote/rsc"
import dynamic from "next/dynamic"

const ServerlessDiagram = dynamic(
  () => import("@/components/ServerlessDiagram"),
  {
    loading: () => <p>Loading diagram...</p>,
  }
)

const components = {
  Image: ({ alt, ...props }: ImageProps) => <Image alt={alt} {...props} />,
  ServerlessDiagram,
}

interface MDXContentProps {
  source: any
}

export function MDXContent({ source }: MDXContentProps) {
  return <MDXRemote {...source} components={components} />
}
