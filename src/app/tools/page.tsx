import React from 'react';
import ToolsPage from '@/components/tools/ToolsPage';
import { Metadata } from 'next';
import Categories from '@/components/tools/Categories';

export const metadata: Metadata = {
  title: 'Browse Tools DTA',
  description: 'DevToolsAcademy - Browse Tools',
};
interface SearchParams {
  page?: string;
}

export default async function ToolsRoute({ searchParams }: { searchParams?: SearchParams }) {
  const pageNumber = Number(searchParams?.page) || 1;
  const page = Math.max(1, Math.floor(pageNumber));

  return (
    <main className="min-h-screen w-full">
      <div className="text-center pt-8">
        <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
          <span className="bg-gradient-to-b from-[#141414] to-white bg-clip-text text-transparent">
            Browse Devtools for your
            <span className="block bg-gradient-to-b from-[#141414] to-white bg-clip-text text-transparent">
              next product
            </span>
          </span>
        </h1>
        <p className="text-md sm:text-xl text-gray-100 text-opacity-50 mb-8">
          Discover new devtools from a well researched collection for hassle{" "}
          <span className="md:block">
            free development of your next product
          </span>
        </p>
      </div>
      <ToolsPage page={page} />
      <Categories />
    </main>
  );
}
