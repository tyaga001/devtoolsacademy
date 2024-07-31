import Link from 'next/link'

export default function Navigation() {
    return (
        <nav className="p-4 flex justify-center items-center">
            <div className="flex space-x-16">
                <Link href="/" className="text-lg hover:text-gray-300">Home</Link>
                <Link href="/blog" className="text-lg hover:text-gray-300">Blog</Link>
            </div>
        </nav>
    )
}