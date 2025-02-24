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
    <form onSubmit={handleSubmit} className="mt-4">
      <label htmlFor="email-input" className="sr-only">
        Email address
      </label>
      <input
        id="email-input"
        aria-label="Email address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="rounded-l-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button
        type="submit"
        className="rounded-r-md bg-blue-500 px-4 py-2 text-neutral-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Subscribe
      </button>
    </form>
  )
}
