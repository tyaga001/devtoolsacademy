import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link href="/" className="text-xl font-bold">Dev Tools Compare</Link>
                    <div className="space-x-4">
                        <Link href="/" className="hover:text-gray-300">Dashboard</Link>
                        <Link href="/blog" className="hover:text-gray-300">Blog</Link>
                        <Link href="/projects" className="hover:text-gray-300">Projects</Link>
                        <Link href="/calendar" className="hover:text-gray-300">Calendar</Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <input type="text" placeholder="Search" className="bg-gray-700 text-white px-3 py-1 rounded-md" />
                        <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                    </div>
                </div>
            </nav>
            <main className="container mx-auto mt-8 px-4">
                {children}
            </main>
        </div>
    )
}