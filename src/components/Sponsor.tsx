'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

export function Sponsor() {
    return (
        <Link href="/sponsor">
            <Button variant="outline" className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span>Sponsor</span>
            </Button>
        </Link>
    );
}