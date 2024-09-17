'use client';

import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Github, Menu } from 'lucide-react';
import { Sponsor } from '@/components/Sponsor';


export default function Navbar() {
    return (
        <nav className="border-b border-gray-200 dark:border-gray-700 bg-black dark:bg-gray-900">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                <div className="flex items-center space-x-4">
                    <Link href="/" className="text-lg font-semibold text-white-900 dark:text-gray-100 hover:underline">
                        Home
                    </Link>
                    <Link href="/blog" className="text-lg font-semibold text-white-900 dark:text-gray-100 hover:underline">
                        Blog
                    </Link>
                    <Link href="/contribute" className="text-lg font-semibold text-white-900 dark:text-gray-100 hover:underline">
                        Contribute
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    <Sponsor />
                    <Button
                        onClick={() => window.open("https://github.com/tyaga001/devtoolsacademy", "_blank", "noopener,noreferrer")}
                        variant="outline"
                        className="flex items-center space-x-2"
                    >
                        <Github className="w-5 h-5" />
                        <span>Star on GitHub</span>
                    </Button>
                </div>
            </div>
        </nav>
    );
}