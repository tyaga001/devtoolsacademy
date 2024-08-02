'use client'

import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const AnimatedHero: React.FC = () => {
    return (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    We Compare
                    <br />
                    <TypeAnimation
                        sequence={[
                            'Developer Tools',
                            1000,
                            'Frameworks',
                            1000,
                            'Databases',
                            1000,
                            'Cloud Services',
                            1000,
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                    />
                </h1>
                <p className="text-xl md:text-2xl mb-8">
                    Your One-Stop Resource for Unbiased Developer Tools Comparisons
                </p>
            </div>
        </div>
);
};

export default AnimatedHero;