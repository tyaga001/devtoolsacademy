import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const StylizedSiteName = () => {
    return (
        <Link href="/" className="flex items-center space-x-2 group">
            <Image src="/images/T.png" alt="DevToolsAcademy Logo" width={40} height={40} className="rounded-full" />
            <div className="flex items-baseline">
                <span className="text-2xl font-extrabold tracking-tighter text-white group-hover:text-purple-400 transition-colors duration-300">Dev</span>
                <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text group-hover:from-purple-300 group-hover:to-pink-400 transition-colors duration-300">Tools</span>
                <span className="text-sm font-medium tracking-wide text-gray-300 group-hover:text-pink-300 transition-colors duration-300 ml-0.5">Academy</span>
            </div>
        </Link>
    );
};

export default StylizedSiteName;