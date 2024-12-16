import React from 'react';
import { Metadata } from 'next';
import { getToolDetails } from '@/lib/tools';
import ToolDetailsPage from '@/components/tools/toolDetails/ToolDetailsPage';
import ToolNotFound from '@/components/tools/toolDetails/ToolNotFound';


export const metadata: Metadata = {
  title: 'Dev Tools Academy',
  description: 'DevToolsAcademy Tool details',
};

export default async function ToolDetailRoute({ params }: { params: { slug: string } }) {

  const response = await getToolDetails(params.slug)
  const toolDetails = response.toolDetails

  if (!toolDetails) {
    return (
      <ToolNotFound />
    )
  }

  return (
    <main className="min-h-screen w-full">
      <ToolDetailsPage tool={toolDetails} />
    </main>
  );
}
