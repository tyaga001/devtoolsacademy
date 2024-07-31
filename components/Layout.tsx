import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="p-4 flex justify-center items-center">
                <div className="flex space-x-16"> {/* Increased space between links */}
                    <Link href="/" className="text-lg hover:text-gray-300">Home</Link>
                    <Link href="/blog" className="text-lg hover:text-gray-300">Blog</Link>
                </div>
            </nav>
            <main className="container mx-auto px-4 mt-16">
                {children}
            </main>
        </div>
    )
}