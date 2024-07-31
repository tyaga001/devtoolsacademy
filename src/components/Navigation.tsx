import Link from 'next/link'

export default function Navbar() {
    return (
        <nav className="bg-gray-800 py-4">
            <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold text-gray-100 hover:text-blue-400">
                    Dev Tools Compare
                </Link>
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/" className="text-gray-300 hover:text-blue-400">Home</Link>
                    </li>
                    <li>
                        <Link href="/blog" className="text-gray-300 hover:text-blue-400">Blog</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}