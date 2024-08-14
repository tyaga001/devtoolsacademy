'use client'

import { useState } from 'react'

export default function EmailSubscription() {
    const [email, setEmail] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Subscribing email:', email)
        setEmail('')
    }

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Subscribe
            </button>
        </form>
    )
}