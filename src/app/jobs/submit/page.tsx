import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import JobSubmissionForm from "@/components/jobs/JobSubmissionForm"

export const metadata: Metadata = {
  title: "Submit a Job | DevTools Academy",
  description:
    "Post your developer job opportunity on DevTools Academy. Reach top developers in the dev tools space.",
}

export default function SubmitJobPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0A0A0A]">
      <div className="mx-auto max-w-3xl px-6 py-20">
        {/* Back to Jobs Button */}
        <div className="mb-8">
          <Link href="/jobs">
            <Button
              variant="ghost"
              className="p-3 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100"
            >
              <ArrowLeft className="mr-2 size-4" />
              Back to Job Board
            </Button>
          </Link>
        </div>

        <div className="mb-12 text-center">
          <h1 className="mb-6 text-4xl font-light tracking-tight text-white md:text-5xl">
            Submit Position
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-neutral-300">
            Share your opportunity with exceptional developers. Complete the
            form below and proceed to secure payment via{" "}
            <span className="font-semibold text-white">$199</span> Stripe
            checkout.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-neutral-800 px-4 py-2 text-sm text-neutral-400">
            <span className="size-2 rounded-full bg-green-500"></span>
            60-day featured placement included
          </div>
        </div>

        <JobSubmissionForm />
      </div>
    </main>
  )
}
