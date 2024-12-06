'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
    const productHuntBadgeHtml = `<a href="https://www.producthunt.com/posts/dev-tools-academy?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-dev&#0045;tools&#0045;academy" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=493913&theme=light" alt="Dev&#0032;Tools&#0032;Academy - A&#0032;special&#0032;blog&#0032;made&#0032;for&#0032;Developers&#0046; | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>`;

    return (
        <section className="relative min-h-screen bg-black overflow-hidden  flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-black-900/20 via-black to-pink-900/20" />
            <div className="absolute inset-0 opacity-50">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-white rounded-full w-6 h-6"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 4 + 1}px`,
                            height: `${Math.random() * 4 + 1}px`,
                        }}
                    />
                ))}
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center text-white text-center px-4 max-w-5xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                    <a
                        href="https://news.ycombinator.com/item?id=41223327#41246861"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#ff7600] text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-[#ff9933] transition-colors duration-300 flex items-center space-x-2 shadow-md hover:shadow-lg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M0 24V0h24v24H0zM6.951 5.896l4.112 7.708v5.064h1.583v-4.972l4.148-7.799h-1.749l-2.457 4.875c-.372.745-.688 1.434-.688 1.434s-.297-.708-.651-1.434L8.831 5.896h-1.88z"/>
                        </svg>
                        <span>Featured on Hacker News</span>
                    </a>
                    <div dangerouslySetInnerHTML={{ __html: productHuntBadgeHtml }} />
                </div>
                <h1
                    className="text-6xl md:text-8xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 leading-tight"
                    style={{textShadow: '0 0 20px rgba(168, 85, 247, 0.5)'}}
                >
                    A special blog made for Developers.
                </h1>
                <p className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-3xl">
                    Honest reviews to help you choose the right developer tool for your SaaS.
                </p>
                <Link href="/blog" passHref>
                    <Button
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-10 rounded-full text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                        Start Reading
                    </Button>
                </Link>
            </div>
        </section>
    );
};

export default Hero;