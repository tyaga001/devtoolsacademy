import React from 'react';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';

const ToolsPage = dynamic(() => import('@/components/tools/ToolsPage'), { ssr: false });

export const metadata: Metadata = {
  title: 'Browse Tools DTA',
  description: 'DevToolsAcademy - Browse Tools',
};

export default function ToolsRoute() {
  return (
    <main className="min-h-screen w-full">
      <ToolsPage />
    </main>
  );
}
