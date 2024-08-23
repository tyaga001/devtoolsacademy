import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const AnimatedContent = dynamic(() => import('@/components/AnimatedContent'), { ssr: false });

export default function ContributePage() {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <AnimatedContent />

            <div className="bg-gray-100 dark:bg-gray-700 p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">How to Contribute</h2>
                <ol className="list-decimal list-inside space-y-2 mb-6">
                    <li>
                        <a
                            href="https://github.com/tyaga001/devtoolsacademy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline"
                        >
                            Fork the repository on GitHub
                        </a>
                    </li>
                    <li>Create a new branch </li>
                    <li>Make the change and commit </li>
                    <li>Push to your fork and submit a pull request</li>
                </ol>
                <p className="mb-4">
                    For more detailed instructions, please check the{' '}
                    <Link
                        href="https://github.com/tyaga001/devtoolsacademy/blob/main/CONTRIBUTING.md"
                        className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Contribution Guidelines
                    </Link>
                </p>
                <p>
                    If you have any questions or need help getting started, don&apos;t hesitate to{' '}
                    <a
                        href="https://github.com/tyaga001/devtoolsacademy/issues"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline"
                    >
                        open an issue
                    </a>{' '}
                    on the GitHub repository.
                </p>
            </div>
        </div>
    );
}