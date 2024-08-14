import Link from 'next/link'
import { ModeToggle } from '@/components/mode-toggle'

export default function Navbar() {
    return (
        <nav className="border-b">
            <div className="container flex items-center justify-between py-4">
                <div className="flex items-center space-x-4">
                    <Link href="/" className="hover:underline">
                        Home
                    </Link>
                    <Link href="/blog" className="hover:underline">
                        Blog
                    </Link>
                    <Link href="/contribute" className="hover:underline">
                        Contribute
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    <a href="https://github.com/tyaga001/devtoolsacademy" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 dark:hover:text-gray-300">
                        GitHub
                    </a>
                    <ModeToggle />
                </div>
            </div>
        </nav>
    )
}