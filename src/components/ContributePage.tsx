'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { Github, GitBranch, GitCommit, GitPullRequest, HelpCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ContributionStepProps {
    icon: React.ReactNode;
    title: string;
    description?: React.ReactNode;
    index: number;
}

const ContributionStep: React.FC<ContributionStepProps> = ({ icon, title, description, index }) => {
    const controls = useAnimation();

    return (
        <motion.div
            className="flex items-start space-x-4 mb-6"
            initial={{ opacity: 0, x: -50 }}
            animate={controls}
            onViewportEnter={() => controls.start({ opacity: 1, x: 0 })}
            transition={{ duration: 0.5, delay: index * 0.2 }}
        >
            <motion.div
                className="bg-purple-500 rounded-full p-2"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.3 }}
            >
                {icon}
            </motion.div>
            <div>
                <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
                <p className="text-gray-300">{description}</p>
            </div>
        </motion.div>
    );
};

const ContributePage: React.FC = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [expandedSection, setExpandedSection] = useState<number | null>(null);
    const controls = useAnimation();

    useEffect(() => {
        controls.start({
            opacity: [0.5, 1, 0.5],
            transition: { repeat: Infinity, duration: 5, ease: "easeInOut" }
        });
    }, [controls]);

    const sections = [
        {
            title: 'Fork the Repository',
            icon: <Github className="text-white" size={24} />,
            description: (
                <a
                    href="https://github.com/tyaga001/devtoolsacademy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 underline"
                >
                    Go to the repository
                </a>
            ),
        },
        {
            title: 'Create a New Branch',
            icon: <GitBranch className="text-white" size={24} />,
        },
        {
            title: 'Make Changes and Commit',
            icon: <GitCommit className="text-white" size={24} />,
        },
        {
            title: 'Submit a Pull Request',
            icon: <GitPullRequest className="text-white" size={24} />,
        },
    ];

    return (
        <section className="relative min-h-screen bg-black overflow-hidden py-20 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-black-900/20 via-black to-pink-900/20" />
            <motion.div
                className="absolute inset-0 opacity-50"
                animate={controls}
            >
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-white rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 4 + 1}px`,
                            height: `${Math.random() * 4 + 1}px`,
                        }}
                    />
                ))}
            </motion.div>
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2
                    className="text-6xl md:text-7xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 leading-tight"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{ textShadow: '0 0 20px rgba(168, 85, 247, 0.5)' }}
                >
                    Join the Community
                </motion.h2>

                <motion.p
                    className="text-2xl md:text-3xl text-gray-300 mb-12 text-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                >
                    How to Contribute
                </motion.p>

                {sections.map((section, index) => (
                    <Card key={index} className="mb-4 bg-black/50 border border-purple-500/30">
                        <CardContent className="p-4">
                            <motion.div
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() => setExpandedSection(expandedSection === index ? null : index)}
                            >
                                <ContributionStep
                                    icon={section.icon}
                                    title={section.title}
                                    description={expandedSection === index ? section.description : ''}
                                    index={index}
                                />
                                <motion.div
                                    animate={{ rotate: expandedSection === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDown size={24} className="text-white" />
                                </motion.div>
                            </motion.div>
                            {expandedSection === index && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-4 text-gray-300"
                                >
                                    {section.description}
                                </motion.div>
                            )}
                        </CardContent>
                    </Card>
                ))}

                <motion.div
                    className="bg-black/50 border border-purple-500/30 p-6 rounded-lg mt-8"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                    <h3 className="text-2xl font-bold mb-4 text-white">Need More Help?</h3>
                    <p className="mb-4 text-gray-300">
                        For more detailed instructions, please check the{' '}
                        <Link
                            href="https://github.com/tyaga001/devtoolsacademy/blob/main/CONTRIBUTING.md"
                            className="text-purple-400 hover:text-purple-300 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Contribution Guidelines
                        </Link>
                    </p>
                    <motion.div
                        className="inline-block"
                        whileHover={{ scale: 1.1 }}
                        onHoverStart={() => setIsHovering(true)}
                        onHoverEnd={() => setIsHovering(false)}
                    >
                        <Button
                            asChild
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-10 rounded-full text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                        >
                            <a
                                href="https://github.com/tyaga001/devtoolsacademy/issues"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <HelpCircle size={20} className="mr-2" />
                                <span>Open an Issue</span>
                            </a>
                        </Button>
                    </motion.div>
                    {isHovering && (
                        <motion.p
                            className="mt-2 text-sm text-gray-400"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            Don&apos;t hesitate to ask for help.
                        </motion.p>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default ContributePage;
