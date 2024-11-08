'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ToolLogoProps {
    name: string;
    logoUrl: string;
    size?: number;
}

export function ToolLogo({ name, logoUrl, size = 48 }: ToolLogoProps) {
    const [error, setError] = useState(false);

    // Generate a colored placeholder based on the tool name
    const generatePlaceholder = (name: string) => {
        const colors = [
            'bg-blue-500', 'bg-purple-500', 'bg-pink-500',
            'bg-indigo-500', 'bg-green-500', 'bg-red-500'
        ];
        const index = name.length % colors.length;
        return colors[index];
    };

    if (error) {
        return (
            <div
                className={`flex items-center justify-center rounded-lg ${generatePlaceholder(name)}`}
                style={{ width: size, height: size }}
            >
                <span className="text-white font-bold text-lg">
                    {name.charAt(0).toUpperCase()}
                </span>
            </div>
        );
    }

    return (
        <div className="relative rounded-lg overflow-hidden bg-gray-800" style={{ width: size, height: size }}>
            <Image
                src={logoUrl}
                alt={`${name} logo`}
                width={size}
                height={size}
                className="object-cover"
                onError={() => setError(true)}
                loading="lazy"
            />
        </div>
    );
}