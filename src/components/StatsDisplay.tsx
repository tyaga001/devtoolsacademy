/*
'use client'

import React from 'react';
import { Users, Tools } from 'lucide-react';

const StatItem = ({ icon: Icon, value, label }) => (
    <div className="flex flex-col items-center p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg">
        <Icon className="w-12 h-12 mb-4 text-purple-400" />
        <p className="text-4xl md:text-5xl font-bold text-white mb-2">
            {value}
        </p>
        <p className="text-sm md:text-base text-gray-300 text-center">{label}</p>
    </div>
);

const StatsDisplay = () => (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
        <StatItem icon={Tools} value="50+" label="Tools Reviewed" />
        <StatItem icon={Users} value="1M+" label="Developers Assisted" />
    </div>
);

export default StatsDisplay;*/
