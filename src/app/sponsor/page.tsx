'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Trophy, Award, Heart } from 'lucide-react';

interface SponsorTier {
    title: string;
    icon: React.ReactNode;
    price: number;
    benefits: string[];
    stripeLink: string;
}

const sponsorTiers: SponsorTier[] = [
    {
        title: "VIP Sponsor",
        icon: <Star className="h-6 w-6 text-yellow-400" />,
        price: 2000,
        benefits: [
            "Big logo on homepage and DevToolsAcademy repo",
            "Backlink to your website",
            "Dedicated review blog post on DevToolsAcademy and The Ankur Tyagi",
            "Featured in BytesizedBets newsletter (5000+ subscribers)"
        ],
        stripeLink: "https://buy.stripe.com/dR6fZvbAz9dvcbm28m"
    },
    {
        title: "Hero Sponsor",
        icon: <Trophy className="h-6 w-6 text-yellow-500" />,
        price: 1000,
        benefits: [
            "Big logo on homepage and DevToolsAcademy repo",
            "Backlink to your website",
            "Dedicated review blog post on DevToolsAcademy website"
        ],
        stripeLink: "https://buy.stripe.com/8wMdRn7kj4Xf0sE28n"
    },
    {
        title: "Catalyst Sponsor",
        icon: <Award className="h-6 w-6 text-orange-400" />,
        price: 500,
        benefits: [
            "Small logo on homepage and DevToolsAcademy repo"
        ],
        stripeLink: "https://buy.stripe.com/28ofZvbAzblD3EQfZe"
    },
    {
        title: "Backer Sponsor",
        icon: <Heart className="h-6 w-6 text-red-400" />,
        price: 99,
        benefits: [
            "Small logo in DevToolsAcademy repo",
            "my heartfelt thanks."
        ],
        stripeLink: "https://buy.stripe.com/8wM9B78ongFXa3e9AN"
    },
];

export default function SponsorPage() {

    const handleContribute = (stripeLink: string) => {
        window.open(stripeLink, "_blank", "noopener,noreferrer");
    };

    return (
        <div className="min-h-screen bg-black text-white bg-grid-pattern">
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                    Sponsor Me.
                </h1>
                <p className="text-xl md:text-2xl mb-12 text-gray-300">
                    I love doing open-source projects and write about developer tools <span
                    className="text-red-500">❤️</span>
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
                    {sponsorTiers.map((tier, index) => (
                        <Card key={index}
                              className="bg-gray-800 border-gray-700 text-white overflow-hidden flex flex-col">
                            <CardHeader className="bg-gray-900 p-4">
                                <div className="flex justify-between items-center mb-2">
                                    {tier.icon}
                                    <span className="text-sm font-semibold text-gray-400">MEMBERSHIP</span>
                                </div>
                                <CardTitle className="text-2xl font-bold">{tier.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 flex-grow">
                                <ul className="list-none space-y-2 text-sm text-gray-300">
                                    {tier.benefits.map((benefit, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <span className="text-green-500 mr-2">✓</span>
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter className="p-4 bg-gray-900 mt-auto">
                                <div className="w-full">
                                    <div className="font-bold text-3xl mb-4 text-center">${tier.price} USD</div>
                                    <Button
                                        className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-300"
                                        onClick={() => handleContribute(tier.stripeLink)}
                                    >
                                        Contribute
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="max-w-3xl mx-auto mb-16 bg-gray-900 p-8 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-semibold mb-4 text-center bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                        Why Your Support Matters
                    </h3>
                    <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                        <p>
                            As an independent consultant, your support is crucial in sustaining this project.
                            Here&apos;s how
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
                            My mission is to help founders and developers learn, grow, and make better choices when it
                            comes to developer tools.
                        </p>
                        <p>
                            Your support keeps this project free, open, and evolving, allowing me to dedicate myself to
                            making this blog better for you.
                        </p>
                        <p className="text-xl font-semibold text-white mt-6">
                            Thank you for being part of my journey.
                        </p>
                        <p className="text-center text-gray-500 mt-8 p-4 border border-gray-300 rounded-lg bg-gray-100 shadow-lg">
                            <strong className="text-gray-700">Note:</strong> All blogs will remain live forever on this
                            website as they are published and read 10000+ times per month by devs.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}