"use client"

import React from "react"
import { ExternalLink, Mic, Play } from "lucide-react"

const FeaturedMedia: React.FC = () => {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-0">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-4xl">
            <span className="bg-gradient-to-b from-neutral-700 to-neutral-200 bg-clip-text text-transparent">
              Featured on freeCodeCamp
            </span>
          </h2>
          <p className="text-base text-neutral-500 md:text-lg">
            Sharing insights on AI tools and developer productivity
          </p>
        </div>

        {/* Video Section */}
        <div className="mx-auto mb-12 max-w-5xl">
          <div className="relative aspect-video overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900">
            <iframe
              src="https://www.youtube-nocookie.com/embed/ebarbEsoHzg"
              title="How to use AI as an accelerator, not a crutch - freeCodeCamp Podcast"
              className="absolute inset-0 size-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              sandbox="allow-scripts allow-same-origin allow-presentation"
              allow="encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-lg border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 md:p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10" />

            <div className="relative z-10 grid grid-cols-1 items-center gap-8 md:grid-cols-3">
              {/* Podcast Icon & Badge */}
              <div className="flex flex-col items-center space-y-4 md:items-start">
                <div className="flex items-center space-x-3">
                  <div className="rounded-full border border-blue-500/30 bg-blue-600/20 p-3">
                    <Mic className="size-6 text-blue-400" />
                  </div>
                  <div className="rounded-full border border-green-500/30 bg-green-600/20 px-3 py-1 text-sm font-medium text-green-400">
                    Podcast #186
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <p className="mb-1 text-sm text-neutral-400">Featured on</p>
                  <p className="text-xl font-bold text-neutral-200">
                    freeCodeCamp
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4 md:col-span-2">
                <h3 className="text-xl font-bold leading-tight text-neutral-200 md:text-2xl">
                  &ldquo;How to use AI as an accelerator, not a crutch&rdquo;
                </h3>
                <p className="leading-relaxed text-neutral-400">
                  Sharing insights about dev tools, GTM strategies, developer
                  growth, and how to use AI tools effectively in your
                  development workflow.
                </p>

                <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                  <a
                    href="https://youtu.be/ebarbEsoHzg?si=3PFwyfaZNGyDKeio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 rounded-lg bg-red-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-red-700"
                  >
                    <Play className="size-4" />
                    <span>Watch on YouTube</span>
                    <ExternalLink className="size-4" />
                  </a>

                  <a
                    href="https://www.freecodecamp.org/news/how-to-use-ai-as-an-accelerator-not-a-crutch-with-freelance-engineer-ankur-tyagi-podcast-186/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 rounded-lg border border-neutral-600 px-6 py-3 font-medium text-neutral-300 transition-colors duration-200 hover:border-neutral-500 hover:text-neutral-200"
                  >
                    <span>Read Full Article</span>
                    <ExternalLink className="size-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute right-4 top-4 size-20 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-xl" />
            <div className="absolute bottom-4 left-4 size-16 rounded-full bg-gradient-to-br from-green-500/10 to-blue-500/10 blur-xl" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedMedia
