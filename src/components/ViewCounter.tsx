'use client'

import { useState, useEffect } from 'react'

export default function ViewCounter({ slug, initialViews }: { slug: string, initialViews: number }) {
    const [views, setViews] = useState(initialViews)

    useEffect(() => {
        const incrementViews = async () => {
            try {
                const response = await fetch(`/api/views/${slug}`, { method: 'POST' })
                const data = await response.json()
                setViews(data.views)
            } catch (error) {
                console.error('Failed to increment view count:', error)
            }
        }
        incrementViews()
    }, [slug])

    return <span className="text-sm font-medium">{views.toLocaleString()} views</span>
}