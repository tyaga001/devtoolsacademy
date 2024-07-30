import Link from 'next/link'

export default function Navigation() {
    return (
        <nav className="mb-8">
            <Link href="/" className="mr-4 hover:underline">Home</Link>
            <Link href="/blog" className="hover:underline">Blog</Link>
        </nav>
    )
}