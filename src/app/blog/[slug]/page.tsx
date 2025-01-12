import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { MDXRemote } from "next-mdx-remote/rsc"
import { MDXComponents } from "mdx/types"
import { codeToHtml } from "shiki"
import { v4 as uuidv4 } from "uuid"

import { cn } from "@/lib/utils"
import { getPostBySlug, getViewCount, getAllPosts } from "@/lib/posts"

import { SocialMetadata } from "@/components/SocialMetadata"

import TableOfContents from "@/components/blog/TableOfContents"
import Breadcrumb from "@/components/blog/Breadcrumb"
import CommentSection from "@/components/blog/CommentSection"
import BlogHeader from "@/components/blog/BlogHeader"
import ServerlessDiagram from "@/components/blog/ServerlessDiagram"
import CodeCopyButton from "@/components/CodeCopyButton"
import { Callout } from "@/components/blog/Callout"
import { Alert, AlertDescription } from "@/components/blog/Alert"
import BackToTop from "@/components/blog/BackToTop"
import ScrollProgressBar from "@/components/blog/ScrollProgressBar"

const components: MDXComponents = {
  h1: (props: any) => <h1 {...props}>{props.children}</h1>,
  h2: (props: any) => (
    <h2 id={uuidv4()} {...props}>
      {props.children}
    </h2>
  ),
  h3: (props: any) => (
    <h3 id={uuidv4()} {...props}>
      {props.children}
    </h3>
  ),
  h4: (props: any) => (
    <h4 id={uuidv4()} {...props}>
      {props.children}
    </h4>
  ),
  p: (props: any) => <p className="my-2 opacity-80" {...props} />,
  a: ({ href = "", ...props }: React.ComponentPropsWithoutRef<"a">) => {
    const transformUrl = (url: string): string => {
      const separator = url.includes("?") ? "&" : "?"
      return `${url}${separator}ref=devtoolsacademy.com`
    }

    return (
      <Link
        className="text-blue-500 no-underline outline-none hover:underline focus:underline"
        href={href.startsWith("http") ? transformUrl(href) : href}
        {...props}
      />
    )
  },
  Image: (props: any) => <Image className="my-4" alt={props.alt} {...props} />,
  blockquote: (props: any) => (
    <blockquote
      className="border-l-4 border-neutral-500 pl-4 font-normal not-italic opacity-80"
      {...props}
    />
  ),
  ServerlessDiagram: ServerlessDiagram,
  code: async ({
    className,
    children,
    ...props
  }: React.ComponentPropsWithoutRef<"code">) => {
    const isInline = !className?.includes("language-")

    const codeHTML = await codeToHtml(children as string, {
      lang: className?.replace(/language-/, "") || "text",
      theme: "vitesse-dark",
    })

    if (isInline) {
      return (
        <code
          className="ml-1 rounded bg-[#121212] px-1.5 py-0.5 font-normal text-[#BD976A] before:hidden after:hidden"
          {...props}
        >
          {children}
        </code>
      )
    } else {
      return (
        <div className="relative">
          <code dangerouslySetInnerHTML={{ __html: codeHTML }} />
          <CodeCopyButton code={children as string} />
        </div>
      )
    }
  },
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
              "prose-pre:py-0 prose-pre:px-3 prose-code:text-sm prose-pre:bg-[#121212]",
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
