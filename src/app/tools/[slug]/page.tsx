import React from 'react';
import { Metadata } from 'next';
import { getToolDetails } from '@/lib/tools';
import ToolDetailsPage from '@/components/tools/toolDetails/ToolDetailsPage';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


export const metadata: Metadata = {
  title: 'Dev Tools Academy',
  description: 'DevToolsAcademy Tool details',
};

export default async function ToolDetailRoute({ params }: { params: { slug: string } }) {

  const response = await getToolDetails(params.slug)
  const toolDetails = response.toolDetails

  if (!toolDetails) {
    return (
      <main>
        <h1>We are not able to find this tool, looks like you are searching for wrong url</h1>

        <Link href="/tools">
          <Button variant="secondary">
            Browse more tools
          </Button>
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen w-full">
      <ToolDetailsPage tool={toolDetails} />
    </main>
  );
}
