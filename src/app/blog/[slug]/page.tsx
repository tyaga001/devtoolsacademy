import Image from "next/image"
import Link from "next/link"
import { MDXRemote } from "next-mdx-remote/rsc"
import { MDXComponents } from "mdx/types"

import { getPostBySlug, getViewCount, getAllPosts } from "@/lib/posts"
import TableOfContents from "@/components/TableOfContents"
import Breadcrumb from "@/components/Breadcrumb"
import CommentSection from "@/components/CommentSection"
import BlogHeader from "@/components/BlogHeader"
import ServerlessDiagram from "@/components/ServerlessDiagram"
import CodeBlock from "@/components/CodeBlock"
import { Callout } from "@/components/Callout"
import { Alert, AlertDescription } from "@/components/Alert"
import BackToTop from "@/components/BackToTop"
import ScrollProgressBar from "@/components/ScrollProgressBar"
import { cn } from "@/lib/utils"
import { SocialMetadata } from "@/components/SocialMetadata"

const generateId = (children: any) => {
  if (Array.isArray(children)) {
    children = children.join("")
  }
  return typeof children === "string"
    ? children.toLowerCase().replace(/\s+/g, "-")
    : ""
}

const components: MDXComponents = {
  h1: (props: any) => <h1 {...props}>{props.children}</h1>,
  h2: (props: any) => (
    <h2 id={generateId(props.children)} {...props}>
      {props.children}
    </h2>
  ),
  h3: (props: any) => (
    <h3 id={generateId(props.children)} {...props}>
      {props.children}
    </h3>
  ),
  h4: (props: any) => (
    <h4 id={generateId(props.children)} {...props}>
      {props.children}
    </h4>
  ),
  p: (props: any) => <p className="my-2 opacity-80" {...props} />,
  a: (props: any) => (
    <Link
      className="text-blue-500 no-underline outline-none hover:underline focus:underline"
      {...props}
    />
  ),
  Image: (props: any) => <Image className="my-4" alt={props.alt} {...props} />,
  blockquote: (props: any) => (
    <blockquote
      className="border-l-4 border-neutral-500 pl-4 font-normal not-italic opacity-80"
      {...props}
    />
  ),
  ServerlessDiagram: ServerlessDiagram,
  code: (props: any) => <CodeBlock {...props} />,
  Callout: Callout,
  Alert: Alert,
  AlertDescription: AlertDescription,
  table: (props: any) => (
    <table className="my-4 min-w-full border border-neutral-500" {...props} />
  ),
  th: (props: any) => (
    <th
      className="border border-neutral-500 bg-neutral-800 px-4 py-2"
      {...props}
    />
  ),
  td: (props: any) => (
    <td className="border border-neutral-500 px-4 py-2" {...props} />
  ),
  hr: (props: any) => <hr className="my-12 opacity-50" {...props} />,
}

const baseUrl = "https://devtoolsacademy.com"

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

  const postUrl = `${baseUrl}/blog/${params.slug}`

  return (
    <div className="relative mx-auto max-w-5xl px-4 py-36">
      <SocialMetadata
        title={post.title}
        description={post.description}
        url={postUrl}
        image={`${baseUrl}${post.featuredImage || "/T.png"}`}
        type="article"
      />
      <Breadcrumb items={breadcrumbItems} />
      <BlogHeader
        slug={params.slug}
        title={post.title}
        publishedAt={post.publishedAt}
        initialViews={initialViews}
        content={post.content}
      />
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/4">
          <article
            className={cn(
              "prose prose-neutral prose-invert prose-lg",
              "prose-ul:opacity-80 prose-ol:opacity-80",
              "prose-headings:font-semibold prose-headings:tracking-tight prose-headings:opacity-85 prose-img:rounded-md"
            )}
          >
            <MDXRemote source={post.content} components={components} />
          </article>
          <CommentSection postSlug={params.slug} />
        </div>
        <aside className="hidden lg:block lg:w-1/4 lg:pl-8">
          <div className="sticky top-24">
            <TableOfContents />
          </div>
        </aside>
      </div>
      <BackToTop />
      <ScrollProgressBar />
    </div>
  )
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}
