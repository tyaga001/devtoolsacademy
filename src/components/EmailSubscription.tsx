"use client"

import * as React from "react"

export default function EmailSubscription() {
  const [email, setEmail] = React.useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Subscribing email:", email)
    setEmail("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-3 sm:flex-row sm:items-center"
    >
      <div className="relative w-full flex-1">
        <label htmlFor="email-input" className="sr-only">
          Email address
        </label>
        <input
          id="email-input"
          aria-label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-neutral-200 placeholder:text-neutral-500 focus:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600"
          required
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-lg bg-neutral-100 px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-400"
      >
        Join the list
      </button>
    </form>
  )
}
