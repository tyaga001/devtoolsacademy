'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('Tool page error:', error)
    }, [error])

    return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center">
            <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
            <h2 className="text-3xl font-bold mb-2">Something went wrong.</h2>
            <p className="text-gray-400 mb-8">
                We are unable to load this tool info.
            </p>
            <div className="flex gap-4">
                <Button onClick={reset}>Try again</Button>
                <Button variant="outline" onClick={() => window.history.back()}>
                    Go back
                </Button>
            </div>
        </div>
    )
}