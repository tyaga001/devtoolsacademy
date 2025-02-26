import React from "react"
import { Link } from "next-view-transitions"
import { GitBranch, GitCommit, GitPullRequest, HelpCircle } from "lucide-react"
import { FaGithub } from "react-icons/fa6"


import {  baseUrl,getMetadata } from "@/lib/metadata"
import { Button } from "@/components/ui/button"

export const metadata = getMetadata({
  path: "/contribute",
  title: "Contribute to Dev Tools Academy",
  description:
    "Learn how to contribute to Dev Tools Academy and help improve this open-source project",
  image: `${baseUrl}api/og?title=Contribute%20|%20DevToolsAcademy`,
})

export default function ContributeRoute() {
  return (
    <main className="mt-[80px]">
      <hr className="border-dashed border-neutral-100/15" />
      <section className="py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold tracking-tight md:text-5xl">
          <span className="bg-gradient-to-b from-neutral-700 to-neutral-200 bg-clip-text text-transparent">
            Join the Community
          </span>
        </h1>
        <p className="text-base text-neutral-500 md:text-lg">
          Contribute by resolving an issue, implementing a new feature, or
          writing a blog post.
        </p>
      </section>
      <section className="mx-auto max-w-7xl">
        <hr className="border-dashed border-neutral-100/15" />
        <section className="grid grid-cols-1 md:grid-cols-2">
          <div className="border-r border-dashed border-neutral-100/15 px-6 pt-12 md:py-12">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              <span className="bg-gradient-to-b from-neutral-700 to-neutral-200 bg-clip-text text-transparent">
                How to Contribute
              </span>
            </h2>
          </div>
          <div className="flex flex-col gap-8 p-8">
            {sections.map((section, index) => (
              <div key={index} className="flex items-center gap-2">
                <div>{section.icon}</div>
                <p className="text-lg font-semibold tracking-tight md:text-xl">
                  {section.title}
                </p>
              </div>
            ))}
          </div>
        </section>
      </section>
      <section className="mx-auto max-w-7xl">
        <hr className="border-dashed border-neutral-100/15" />
        <div className="p-6">
          <h3 className="mb-4 text-2xl font-bold text-neutral-200">
            Need More Help?
          </h3>
          <p className="mb-4 text-neutral-500">
            For more detailed instructions, please check the{" "}
            <Link
              href="https://github.com/tyaga001/devtoolsacademy/blob/main/CONTRIBUTING.md"
              className="text-neutral-200 underline outline-none transition-colors hover:text-neutral-400 focus:text-neutral-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contribution Guidelines
            </Link>
          </p>
          <div className="inline-block">
            <Button
              asChild
              className="bg-neutral-200 px-4 py-3 text-base font-medium text-neutral-800 outline-none transition-colors hover:bg-neutral-400 focus:bg-neutral-400 md:px-6 md:py-4"
            >
              <a
                href="https://github.com/tyaga001/devtoolsacademy/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                <HelpCircle size={20} className="mr-2" />
                <span>Open an Issue</span>
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

const sections = [
  {
    title: "Fork the Repository",
    icon: <FaGithub className="text-neutral-200" size={24} />,
  },
  {
    title: "Create a New Branch",
    icon: <GitBranch className="text-neutral-200" size={24} />,
  },
  {
    title: "Make Changes and Commit",
    icon: <GitCommit className="text-neutral-200" size={24} />,
  },
  {
    title: "Submit a Pull Request",
    icon: <GitPullRequest className="text-neutral-200" size={24} />,
  },
]
