import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="container mx-auto px-4 py-16 text-center">
            <FileQuestion className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold mb-4">Tool Not Found</h2>
            <p className="text-gray-400 mb-8">
                The tool you are looking for does not exist or has been removed.
            </p>
            <div className="flex gap-4 justify-center">
                <Button asChild>
                    <Link href="/tools">Browse All Tools</Link>
                </Button>
                <Button variant="outline" onClick={() => window.history.back()}>
                    Go Back
                </Button>
            </div>
        </div>
    )
}