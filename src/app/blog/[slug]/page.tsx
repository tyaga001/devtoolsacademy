import Image from "next/image"
import Link from "next/link"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getPostBySlug, getViewCount, getAllPosts } from "@/lib/posts"
import TableOfContents from "@/components/TableOfContents"
import Breadcrumb from "@/components/Breadcrumb"
import CommentSection from "@/components/CommentSection"
import BlogPostClient from "@/components/BlogPostClient"
import ServerlessDiagram from "@/components/ServerlessDiagram"
import CodeBlock from "@/components/CodeBlock"
import { Callout } from "@/components/Callout"
import { Alert, AlertDescription } from "@/components/Alert"
import { MDXComponents } from "mdx/types"
import BackToTop from "@/components/BackToTop"

const generateId = (children: any) => {
  if (Array.isArray(children)) {
    children = children.join("")
  }
  return typeof children === "string"
    ? children.toLowerCase().replace(/\s+/g, "-")
    : ""
}

const components = {
  h1: (props: any) => (
    <h1 className="mb-4 mt-8 text-4xl font-bold" {...props}>
      {props.children}
    </h1>
  ),
  h2: (props: any) => (
    <h2
      id={generateId(props.children)}
      className="mb-3 mt-6 text-3xl font-semibold"
      {...props}
    >
      {props.children}
    </h2>
  ),
  h3: (props: any) => (
    <h3
      id={generateId(props.children)}
      className="mb-2 mt-4 text-2xl font-semibold"
      {...props}
    >
      {props.children}
    </h3>
  ),
  h4: (props: any) => (
    <h4
      id={generateId(props.children)}
      className="mb-2 mt-3 text-xl font-semibold"
      {...props}
    >
      {props.children}
    </h4>
  ),
  p: (props: any) => <p className="my-2" {...props} />,
  a: (props: any) => (
    <Link className="text-blue-500 hover:underline" {...props} />
  ),
  Image: (props: any) => <Image className="my-4" alt={props.alt} {...props} />,
  blockquote: (props: any) => (
    <blockquote
      className="my-4 border-l-4 border-gray-300 pl-4 italic"
      {...props}
    />
  ),
  ServerlessDiagram: ServerlessDiagram,
  code: CodeBlock,
  Callout: Callout,
  Alert: Alert,
  AlertDescription: AlertDescription,
  table: (props: any) => (
    <table className="my-4 min-w-full border border-gray-300" {...props} />
  ),
  th: (props: any) => (
    <th className="border border-gray-300 bg-gray-100 px-4 py-2" {...props} />
  ),
  td: (props: any) => (
    <td className="border border-gray-300 px-4 py-2" {...props} />
  ),
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPostBySlug(params.slug)
  const initialViews = await getViewCount(params.slug)

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title, href: `#` },
  ]

  return (
    <div className="relative mx-auto max-w-5xl px-4 py-12">
      <Breadcrumb items={breadcrumbItems} />
      <BlogPostClient
        slug={params.slug}
        title={post.title}
        publishedAt={post.publishedAt}
        initialViews={initialViews}
        content={post.content}
        description={post.description}
        featuredImage={post.featuredImage || "/T.png"}
      />
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/4">
          <article className="prose prose-lg max-w-none dark:prose-invert">
            <MDXRemote
              source={post.content}
              components={components as MDXComponents}
            />
          </article>
          <CommentSection postSlug={params.slug} />
        </div>
        <aside className="lg:w-1/4 lg:pl-8">
          <div className="sticky top-24">
            <TableOfContents />
          </div>
        </aside>
      </div>
      <BackToTop />
    </div>
  )
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}
