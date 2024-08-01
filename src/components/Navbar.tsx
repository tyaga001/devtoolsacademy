import Link from 'next/link'
import { ModeToggle } from './mode-toggle'

export default function Navbar() {
    return (
        <nav className="border-b">
            <div className="container flex items-center justify-between py-4">
                <Link href="/" className="text-xl font-bold">
                    Dev Tools Compare
                </Link>
                <div className="flex items-center space-x-4">
                    <Link href="/" className="hover:underline">
                        Home
                    </Link>
                    <Link href="/blog" className="hover:underline">
                        Blog
                    </Link>
                    <ModeToggle />
                </div>
            </div>
        </nav>
    )
}