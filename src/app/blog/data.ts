import RuffAndUvImage from "@/app/blog/uv-and-ruff-turbocharging-python-development-with-rust-powered-tools/cover.png"
import StateOfAICodeReviewCoverImage from "@/app/blog/state-of-ai-code-review-tools-2025/cover.png"
import CodeRabbitCoverImage from "@/app/blog/coderabbit-vs-others-ai-code-review-tools/cover.png"
import TwilioCoverImage from "@/app/blog/stream-vs-twilio/cover.png"
import NeonCoverImage from "@/app/blog/neon-vs-supabase/cover.png"
import CodyCoverImage from "@/app/blog/cody-vs-cursor-choosing-the-right-ai-code-assistant-for-your-development-workflow/cover.png"
import ViewTransitionsCoverImage from "@/app/blog/enhancing-web-experiences-with-the-view-transitions-api/cover.png"
import SupabaseCoverImage from "@/app/blog/supabase-vs-clerk/cover.png"
import MongoDBCoverImage from "@/app/blog/mongoDB-vs-postgreSQL/cover.png"
import StateOfDatabasesCoverImage from "@/app/blog/state-of-databases-2024/cover.png"
import CursorWindsurfCoverImage from "@/app/blog/cursor-vs-windsurf/cover.png"
import BetterAuthCoverImage from "@/app/blog/betterauth-vs-nextauth/cover.png"
import EloqdocVSMongoDB from "@/app/blog/eloqdoc-vs-mongodb-part1/cover.png"

export const allAuthors = [
  { name: "Ankur Tyagi", link: "https://theankurtyagi.com/" },
  { name: "Jitendra Nirnejak", link: "https://nirnejak.com/" },
  { name: "Hrutik Kumthekar", link: "#" },
]

export const allBlogs = [
  {
    author: "Ankur Tyagi",
    slug: "eloqdoc-vs-mongodb-feature-comparison",
    title: "EloqDoc vs MongoDB - Part 2: Feature-by-Feature Comparison",
    excerpt: "Feature-by-feature comparison of EloqDoc and MongoDB capabilities",
    description:
      "A detailed comparison of key features including transactions, indexing, consistency guarantees, and query capabilities. This part highlights where the two databases overlap and where their design philosophies clearly diverge in real world usage.",
    publishedAt: "2026-01-02T00:00:00Z",
    category: "Databases",
    image: EloqdocVSMongoDB.src,
    isNew: false,
    isFeatured: true,
  },
  {
    author: "Ankur Tyagi",
    slug: "eloqdoc-vs-mongodb-architecture-and-design",
    title: "EloqDoc vs MongoDB - Part 1: Architecture and Design Overview",
    excerpt: "An overview of EloqDoc and MongoDB architecture",
    description:
      "This article breaks down the core architecture of EloqDoc and MongoDB. It focuses on storage layout, replication model, and how each system is designed to scale. The goal is to understand what tradeoffs were made at the foundation level before looking at features or performance.",
    publishedAt: "2026-01-02T00:00:00Z",
    category: "Databases",
    image: EloqdocVSMongoDB.src,
    isNew: true,
    isFeatured: true,
  },
  {
    author: "Jitendra Nirnejak",
    slug: "uv-and-ruff-turbocharging-python-development-with-rust-powered-tools",
    title:
      "UV and Ruff: Turbocharging Python Development with Rust-Powered Tools",
    excerpt: "Rust based linter and dependency manager for python",
    description:
      "Discover Ruff and uv, Rust-fueled beasts revolutionizing Python dev. Blast through linting, packaging, and deps with 10x speed gains. Level up your code game now.",
    publishedAt: "2025-11-12T00:00:00Z",
    category: "Python",
    image: RuffAndUvImage.src,
    isNew: true,
    isFeatured: true,
  },
  {
    author: "Ankur Tyagi",
    slug: "state-of-ai-code-review-tools-2025",
    title: "State of AI Code Review Tools in 2025",
    excerpt: "A detailed overview of AI code review tools in 2025.",
    description: "A detailed overview of AI code review tools in 2025.",
    publishedAt: "2025-10-21T00:00:00Z",
    category: "Code Review",
    image: StateOfAICodeReviewCoverImage.src,
    isNew: true,
    isFeatured: true,
  },
  {
    author: "Ankur Tyagi",
    slug: "betterauth-vs-nextauth",
    title:
      "BetterAuth vs NextAuth: Choose the Right Auth Library for Your SaaS",
    excerpt: "Choose the right authentication library for your Next.js app",
    description:
      "A comparison of BetterAuth and NextAuth to help you choose the best authentication library for your app",
    publishedAt: "2025-05-30T00:00:00Z",
    category: "Authentication",
    image: BetterAuthCoverImage.src,
    isNew: false,
    isFeatured: false,
  },
  {
    author: "Ankur Tyagi",
    slug: "ai-code-reviewers-vs-human-code-reviewers",
    title: "AI Code Reviewers vs Human Code Reviewers",
    excerpt: "A comparison of AI code review tools vs human reviewers",
    description:
      "A comparison of AI code reviewers and human reviewers to help you choose the best tool for your team",
    publishedAt: "2025-05-12T00:00:00Z",
    category: "Code Review",
    image: CodeRabbitCoverImage.src,
    isNew: false,
    isFeatured: false,
  },
  {
    author: "Ankur Tyagi",
    slug: "cursor-vs-windsurf",
    title: "Cursor vs Windsurf: Choose the Right AI Code Editor for Your Team",
    excerpt: "Choose the right AI code editor for your development workflow.",
    description:
      "A comparison of Cursor and Windsurf to help you choose the best AI code editor for your team",
    publishedAt: "2025-04-11T00:00:00Z",
    image: CursorWindsurfCoverImage.src,
    category: "AI Code Editor",
    isNew: false,
    isFeatured: false,
  },
  {
    author: "Ankur Tyagi",
    slug: "cody-vs-cursor-choosing-the-right-ai-code-assistant-for-your-development-workflow",
    title:
      "Cody vs. Cursor: Choosing the Right AI Code Assistant for Your Development Workflow",
    excerpt:
      "Choose the right AI code assistant for your development workflow.",
    description:
      "A comparison of Cody and Cursor to help you choose the right AI code assistant",
    publishedAt: "2025-03-17T00:00:00Z",
    image: CodyCoverImage.src,
    category: "AI Code Assistant",
    isNew: false,
    isFeatured: false,
  },
  {
    author: "Jitendra Nirnejak",
    slug: "enhancing-web-experiences-with-the-view-transitions-api",
    title: "Enhancing Web Experiences with the View Transitions API",
    excerpt:
      "Discover how the View Transitions API enhances web experiences with seamless animations and smooth page transitions, improving user engagement and performance.",
    description: "Learn how the View Transitions API enhances web experiences.",
    publishedAt: "2025-02-24T00:00:00Z",
    image: ViewTransitionsCoverImage.src,
    category: "Web Development",
    isNew: false,
    isFeatured: false,
  },
  {
    author: "Ankur Tyagi",
    slug: "coderabbit-vs-others-ai-code-review-tools",
    title: "CodeRabbit vs Others: Which is the Right AI Code Review Tool",
    excerpt: "Choose the right AI code review tool",
    description: "Everything about AI code review tools",
    publishedAt: "2024-12-26T00:00:00Z",
    image: CodeRabbitCoverImage.src,
    category: "Code Review",
    isNew: false,
    isFeatured: true,
  },
  {
    author: "Hrutik Kumthekar",
    slug: "stream-vs-twilio",
    title: "Twilio vs Stream: A Guide to Building Smarter Support Bots",
    excerpt: "A Guide to Building Smarter Support Bots",
    description:
      "A comparison of Twilio and Stream for building automated customer support solutions",
    publishedAt: "2024-12-11T00:00:00Z",
    image: TwilioCoverImage.src,
    category: "SaaS",
    isNew: false,
    isFeatured: false,
  },
  {
    author: "Ankur Tyagi",
    slug: "supabase-vs-clerk",
    title: "Supabase vs Clerk: Choose the Right Auth for Your SaaS",
    excerpt: "Choose the right Auth for your SaaS",
    description:
      "A comparison of Clerk and Supabase to help you choose the best auth for your SaaS",
    publishedAt: "2024-10-28T00:00:00Z",
    image: SupabaseCoverImage.src,
    category: "Auth",
    isNew: false,
    isFeatured: true,
  },
  {
    author: "Ankur Tyagi",
    slug: "mongoDB-vs-postgreSQL",
    title: "MongoDB vs PostgreSQL: A Technical Comparison",
    excerpt: "A technical comparison of MongoDB vs. PostgreSQL",
    description:
      "A technical comparison of MongoDB vs. PostgreSQL to help you choose the best database solution for your SaaS",
    publishedAt: "2024-09-26T00:00:00Z",
    image: MongoDBCoverImage.src,
    category: "Database",
    isNew: false,
    isFeatured: false,
  },
  {
    author: "Ankur Tyagi",
    slug: "state-of-databases-2024",
    title: "State of Databases for Serverless in 2024",
    excerpt: "My thoughts on the state of Databases for Serverless",
    description: "My thoughts on the state of Databases for Serverless",
    publishedAt: "2024-09-03T00:00:00Z",
    image: StateOfDatabasesCoverImage.src,
    category: "Database",
    isNew: false,
    isFeatured: false,
  },
  {
    author: "Ankur Tyagi",
    slug: "neon-vs-supabase",
    title: "Neon Postgres vs Supabase: Choose the Right Database for Your SaaS",
    excerpt: "Choose the right Database for your SaaS.",
    description:
      "A comparison of Neon and Supabase to help you choose the best database for your SaaS",
    publishedAt: "2024-08-08T00:00:00Z",
    image: NeonCoverImage.src,
    category: "Database",
    isNew: false,
    isFeatured: true,
  },
]
