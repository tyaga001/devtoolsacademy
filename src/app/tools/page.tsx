import React from 'react';
import ToolsPage from '@/components/tools/ToolsPage';
import { Metadata } from 'next';
import axios from 'axios';
import { ToolCardInterface } from '@/lib/types';
import ToolsPagination from '@/components/tools/ToolsPagination';

export const metadata: Metadata = {
  title: 'Browse Tools DTA',
  description: 'DevToolsAcademy - Browse Tools',
};

export default async function ToolsRoute({ searchParams }: { searchParams?: { page: number } }) {

  const page = searchParams?.page || 1

  const response = await axios.get(`http://localhost:3000/api/tools?page=${page}`)
  const tools: ToolCardInterface[] = (response.data.tools)
  const totalPages = response.data.totalPages

  if (response.status !== 200) {
    return (
      <div className='w-1/2 flex justify-center items-center min-h-[400px] text-red-500'>
        Failed to show tools at this moment
      </div>
    )
  }

  return (
    <main className="min-h-screen w-full">
      <ToolsPage tools={tools} />
      <ToolsPagination currentPage={page} totalPages={totalPages} basePath="/tools" />
    </main>
  );
}
