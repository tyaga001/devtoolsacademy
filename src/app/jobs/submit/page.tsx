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
    <main className="min-h-screen bg-[#0A0A0A] py-20">
      <div className="container mx-auto max-w-2xl px-4">
        {/* Back to Jobs Button */}
        <div className="mb-6">
          <Link href="/jobs">
            <Button
              variant="ghost"
              className="p-2 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100"
            >
              <ArrowLeft className="mr-2 size-4" />
              Back to Job Board
            </Button>
          </Link>
        </div>

        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-neutral-100">
            Submit a Job
          </h1>
          <p className="text-lg text-neutral-400">
            Add your information below, and you&apos;ll be redirected to
            complete payment via{" "}
            <span className="font-semibold text-green-400">$199</span> Stripe
            checkout.
          </p>
          <div className="mt-4 text-sm text-neutral-500">
            • Job post is featured for 60 days
          </div>
        </div>

        <JobSubmissionForm />
      </div>
    </main>
  )
}
