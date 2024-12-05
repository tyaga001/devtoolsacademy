'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, Menu, X, Heart } from 'lucide-react';
import StylizedSiteName from './StylizedSiteName';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: 'Browse Dev Tools', path: '/tools' },
    ];

    return (
        <nav className="bg-black text-white sticky top-0 z-50 border-b border-gray-800 backdrop-blur-sm bg-black/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo - Left */}
                    <div className="flex-shrink-0">
                        <StylizedSiteName />
                    </div>

                    {/* Navigation - Center */}
                    <div className="hidden md:flex items-center justify-center flex-1">
                        <div className="flex space-x-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.path}
                                    className={cn(
                                        "text-sm transition-colors",
                                        pathname === item.path
                                            ? "text-white font-medium"
                                            : "text-gray-300 hover:text-white"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Actions - Right */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Button
                            onClick={() => window.open("https://github.com/tyaga001/devtoolsacademy", "_blank", "noopener,noreferrer")}
                            variant="outline"
                            size="sm"
                            className="flex items-center space-x-2 bg-transparent border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-gray-900 transition duration-150 ease-in-out"
                        >
                            <Github className="w-5 h-5"/>
                            <span>Star on GitHub</span>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="border-pink-500 text-pink-500 hover:bg-pink-500/10"
                        >
                            <Link href="/sponsor">
                                <Heart className="w-4 h-4 mr-2" />
                                <span>Sponsor</span>
                            </Link>
                        </Button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-800">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.path}
                                className={cn(
                                    "block px-3 py-2 text-base",
                                    pathname === item.path
                                        ? "text-white font-medium"
                                        : "text-gray-300 hover:text-white"
                                )}
                                onClick={toggleMenu}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="flex items-center space-x-4 px-3 py-2">
                            <a
                                href="https://github.com/tyaga001/devtoolsacademy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-white"
                            >
                                <Github className="h-5 w-5" />
                            </a>
                            <Link
                                href="/sponsor"
                                className="text-pink-500 hover:text-pink-400 flex items-center"
                            >
                                <Heart className="h-5 w-5 mr-2" />
                                Sponsor
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}