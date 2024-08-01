import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'

const components = {
    Image,
}

interface MDXContentProps {
    source: any
}

export function MDXContent({ source }: MDXContentProps) {
    return <MDXRemote {...source} components={components} />
}