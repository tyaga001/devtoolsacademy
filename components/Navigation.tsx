import Link from 'next/link'

export default function Navigation() {
    return (
        <nav className="bg-gray-900 p-4">
            <div className="max-w-4xl mx-auto flex justify-between">
                <Link href="/" className="text-white font-bold">
                    Dev Tools Compare
                </Link>
                <ul className="flex space-x-4">
                    <li><Link href="/" className="text-white">home</Link></li>
                    <li><Link href="/blog" className="text-white">blog</Link></li>
                </ul>
            </div>
        </nav>
    )
}