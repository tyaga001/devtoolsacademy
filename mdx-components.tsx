import * as React from "react"

import { Link } from "next-view-transitions"
import Image from "next/image"
import type { MDXComponents } from "mdx/types"
import { codeToHtml } from "shiki"
import { nanoid } from "nanoid"
import { ClerkProvider } from "@clerk/nextjs"

import { cn } from "@/lib/utils"

import CommentSection from "@/components/blog/CommentSection"
import TableOfContents from "@/components/blog/TableOfContents"
import CodeCopyButton from "@/components/blog/CodeCopyButton"
import { Callout } from "@/components/blog/Callout"
import { Alert, AlertDescription } from "@/components/blog/Alert"
import BackToTop from "@/components/blog/BackToTop"
import ScrollProgressBar from "@/components/blog/ScrollProgressBar"

interface Props {
  children: React.ReactNode
}

const BlogWrapper: React.FC<Props> = ({ children }) => {
  return (
    <main className="my-[80px]">
      <hr className="border-dashed border-neutral-100 opacity-10" />
      <div className="relative mx-auto flex max-w-7xl flex-col lg:flex-row">
        <div className="w-full border-dashed border-neutral-100/10 lg:w-3/4 lg:border-r">
          <article
            className={cn(
              "p-8",
              "prose prose-neutral prose-invert prose-lg",
              "prose-ul:opacity-80 prose-ol:opacity-80",
              "prose-pre:py-0 prose-pre:px-3 prose-code:text-sm prose-pre:bg-[#121212]",
              "prose-headings:font-semibold prose-headings:tracking-tight prose-headings:opacity-85 prose-img:rounded-md",
              "prose-h1:font-bold prose-h1:tracking-tighter"
            )}
          >
            {children}
          </article>

          <hr className="border-dashed border-neutral-100 opacity-10" />

          <ClerkProvider>
            <CommentSection />
          </ClerkProvider>
        </div>

        <aside className="hidden lg:block lg:w-1/4">
          <div className="sticky top-28">
            <TableOfContents />
          </div>
        </aside>
      </div>

      <hr className="border-dashed border-neutral-100 opacity-10" />

      <BackToTop />
      <ScrollProgressBar />
    </main>
  )
}

const components: MDXComponents = {
  h1: (props: any) => <h1 {...props}>{props.children}</h1>,
  h2: (props: any) => (
    <h2 id={nanoid()} {...props}>
      {props.children}
    </h2>
  ),
  h3: (props: any) => (
    <h3 id={nanoid()} {...props}>
      {props.children}
    </h3>
  ),
  h4: (props: any) => (
    <h4 id={nanoid()} {...props}>
      {props.children}
    </h4>
  ),
  p: (props: any) => <p className="my-2 opacity-80" {...props} />,
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
  a: ({ href = "", ...props }: React.ComponentPropsWithoutRef<"a">) => {
    const transformUrl = (url: string): string => {
      const separator = url.includes("?") ? "&" : "?"
      return `${url}${separator}ref=devtoolsacademy.com`
    }

    return (
      <Link
        className="text-blue-500 no-underline outline-none hover:underline focus:underline"
        href={href.startsWith("http") ? transformUrl(href) : href}
        target={href.startsWith("http") ? "_blank" : ""}
        {...props}
      />
    )
  },
  img: (props: any) => (
    <Image
      className="my-4"
      alt={props.alt}
      width={1200}
      height={600}
      {...props}
    />
  ),
  blockquote: (props: any) => (
    <blockquote
      className="border-l-4 border-neutral-500 pl-4 font-normal not-italic opacity-80"
      {...props}
    />
  ),
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
  hr: (props: any) => (
    <hr className="my-12 border-dashed opacity-50" {...props} />
  ),
}

export function useMDXComponents(
  otherComponents: MDXComponents
): MDXComponents {
  return {
    ...otherComponents,
    ...components,
    wrapper: BlogWrapper,
  }
}
