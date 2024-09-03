'use client';

import React, { useState, useCallback } from 'react';
import { Highlight, themes, type Language } from 'prism-react-renderer';


interface CodeBlockProps {
    children: string;
    className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = useCallback(() => {
        navigator.clipboard.writeText(children);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    }, [children]);

    const isInline = !className?.includes('language-');
    const language = className?.replace(/language-/, '') || 'text';

    if (isInline) {
        return <code className="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono text-sm">{children}</code>;
    }

    return (
        <div className="relative">
            <button
                onClick={copyToClipboard}
                className="absolute right-2 top-2 px-2 py-1 rounded text-sm bg-gray-700 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
                {isCopied ? 'Copied!' : 'Copy'}
            </button>
            <Highlight theme={themes.nightOwl} code={children.trim()} language={language as Language}>
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre className={`${className} p-4 rounded-md overflow-auto`} style={style}>
                        {tokens.map((line, i) => (
                            <div key={i} {...getLineProps({ line, key: i })} className="table-row">
                                <span className="table-cell text-right pr-4 select-none opacity-50">{i + 1}</span>
                                <span className="table-cell">
                                    {line.map((token, key) => (
                                        <span key={key} {...getTokenProps({ token, key })} />
                                    ))}
                                </span>
                            </div>
                        ))}
                    </pre>
                )}
            </Highlight>
        </div>
    );
};

export default CodeBlock;