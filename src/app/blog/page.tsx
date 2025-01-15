import { Link } from "next-view-transitions"

import { formatDate } from "@/lib/utils"
import { generateMetadata } from "@/lib/metadata"

export const metadata = generateMetadata({
  path: "/blog",
  title: "Blog | DevTools Academy",
  description: "Learn about awesome developer tools with our blogs",
})

export const allBlogs = [
  {
    slug: "coderabbit-vs-others-ai-code-review-tools",
    title: "CodeRabbit vs Others: Which is the Right AI Code Review Tool",
    description: "CodeRabbit vs Other AI code review tools",
    publishedAt: "2024-12-26T00:00:00Z",
  },
  {
    slug: "stream-vs-twilio",
    title: "Twilio vs Stream - A Guide to Building Smarter Support Bots",
    description:
      "A comparison of Twilio and Stream for building automated customer support solutions",
    publishedAt: "2024-12-11T00:00:00Z",
  },
  {
    slug: "supabase-vs-clerk",
    title: "Supabase vs Clerk - Choose the Right Auth for Your SaaS",
    description:
      "An in-depth comparison of Clerk and Supabase to help you choose the best auth for your SaaS",
    publishedAt: "2024-10-28T00:00:00Z",
  },
  {
    slug: "mongoDB-vs-postgreSQL",
    title: "MongoDB vs PostgreSQL- A Technical Comparison",
    description:
      "A technical comparison of MongoDB vs. PostgreSQL to help you choose the best database solution for your SaaS",
    publishedAt: "2024-09-26T00:00:00Z",
  },
  {
    slug: "state-of-databases-2024",
    title: "State of Databases for Serverless in 2024",
    description: "My thoughts on the state of Databases for Serverless",
    publishedAt: "2024-09-03T00:00:00Z",
  },
  {
    slug: "neon-vs-supabase",
    title: "Neon Postgres vs Supabase: Choose the Right Database for Your SaaS",
    description:
      "An in-depth comparison of Neon and Supabase to help you choose the best database for your SaaS",
    publishedAt: "2024-08-08T00:00:00Z",
  },
]

export default async function BlogPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-36">
      <h1 className="mb-8 text-3xl font-bold tracking-tighter text-neutral-200 md:mb-20 md:text-5xl">
        Blog Posts
      </h1>
      <div className="-mx-3 flex flex-col">
        {allBlogs.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.slug}
            className="rounded-lg p-4 transition-colors hover:bg-neutral-900 focus:bg-neutral-900"
          >
            <p className="mb-1 text-xl font-semibold tracking-tight text-neutral-300 md:text-2xl">
              {post.title}
            </p>
            <p className="mb-2.5 text-sm text-neutral-500 md:text-base">
              {post.description}
            </p>
            <p className="text-xs text-neutral-500 md:text-sm">
              {formatDate(new Date(post.publishedAt))}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
