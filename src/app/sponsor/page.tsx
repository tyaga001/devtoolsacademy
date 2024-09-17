'use client';

import { Button } from '@/components/ui/button';
import { Coffee, CreditCard } from 'lucide-react';

export default function SponsorPage() {
    return (
        <div className="min-h-screen bg-black text-white bg-grid-pattern">
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                    Sponsor Me.
                </h1>
                <p className="text-xl md:text-2xl mb-12 text-gray-300">
                    I love doing open-source projects and write about developer tools. <span
                    className="text-red-500">❤️</span>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <Button
                        variant="outline"
                        className="bg-gray-800 hover:bg-gray-700 text-white border-gray-600 h-16 text-lg justify-between"
                        onClick={() => window.open("https://buy.stripe.com/8wM9B78ongFXa3e9AN", "_blank", "noopener,noreferrer")}
                    >
                        <div className="flex items-center">
                            <CreditCard className="mr-2 h-6 w-6" />
                            One-time Payment
                        </div>
                        <span className="text-sm opacity-70">Sponsor</span>
                    </Button>
                    <Button
                        variant="outline"
                        className="bg-gray-800 hover:bg-gray-700 text-white border-gray-600 h-16 text-lg justify-between"
                        onClick={() => window.open("https://buymeacoffee.com/ankurtyagi", "_blank", "noopener,noreferrer")}
                    >
                        <div className="flex items-center">
                            <Coffee className="mr-2 h-6 w-6" />
                            Buy me a Beer 🍺
                        </div>
                        <span className="text-sm opacity-70">Sponsor</span>
                    </Button>
                </div>

                <div className="max-w-3xl mx-auto mb-16 bg-gray-900 p-8 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-semibold mb-4 text-center bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                        Why Your Support Matters
                    </h3>
                    <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                        <p>
                            As an independent consultant, your support is crucial in sustaining this project. Here&apos;s how
                            your contribution makes a difference:
                        </p>
                        <ul className="list-none space-y-2">
                            <li className="flex items-start">
                                <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none"
                                     stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Enables me to focus on real users like you</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none"
                                     stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Allows me to spotlight awesome developer tools companies</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none"
                                     stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Frees me from external pressures and chasing outbound work</span>
                            </li>
                        </ul>
                        <p className="text-center italic mt-6">
                            Your support empowers me to continue creating valuable content and resources for the
                            developer community.
                        </p>
                    </div>
                </div>

                <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                    Who is behind this?
                </h2>

                <div className="text-center bg-gray-900 p-8 rounded-lg shadow-2xl max-w-3xl mx-auto">
                    <h3 className="text-4xl font-bold mb-6 text-white">
                        Hey, I&apos;m <a href="https://github.com/tyaga001"
                                         className="underline text-blue-400 hover:text-blue-300 transition-colors duration-300">Ankur
                        Tyagi</a>
                    </h3>
                    <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                        <p>
                            I&apos;m a software engineer based in Sweden who cares deeply about &quot;Writing&quot;.
                        </p>
                        <p>
                            I&apos;ve stepped away from full-time work to focus entirely on the open-source community. My
                            mission is to help founders and developers learn, grow, and make better choices when it
                            comes to developer tools.
                        </p>
                        <p>
                            Your support keeps this project free, open, and evolving, allowing me to dedicate myself to
                            making this blog better for you.
                        </p>
                        <p className="text-xl font-semibold text-white mt-6">
                            Thank you for being part of my journey.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}