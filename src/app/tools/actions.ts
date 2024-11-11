'use server';

import { tools as allTools } from "@/app/tools/data";
import { Tool } from "@/app/tools/data";

// Simulated database delay
const ARTIFICIAL_DELAY_MS = 800;

interface GetToolsOptions {
  query?: string;
  page?: number;
  limit?: number;
  categories?: string[];
  licenses?: string[];
  sort?: string;
}

export async function getTools({
  query = "",
  page = 1,
  limit = 9,
  categories = [],
  licenses = [],
  sort = "relevance"
}: GetToolsOptions) {
  // Simulate database delay
  await new Promise((resolve) => setTimeout(resolve, ARTIFICIAL_DELAY_MS));

  let filteredTools = [...allTools];

  // Apply search query
  if (query) {
    const normalizedQuery = query.toLowerCase();
    filteredTools = filteredTools.filter((tool) =>
      tool.name.toLowerCase().includes(normalizedQuery) ||
      tool.description.toLowerCase().includes(normalizedQuery) ||
      tool.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))
    );
  }

  // Apply category filter
  if (categories.length > 0) {
    filteredTools = filteredTools.filter((tool) =>
      tool.category.some(cat => categories.includes(cat))
    );
  }

  // Apply license filter
  if (licenses.length > 0) {
    filteredTools = filteredTools.filter((tool) =>
      licenses.includes(tool.license)
    );
  }

  // Apply sorting
  switch (sort) {
    case "stars":
      filteredTools.sort((a, b) => b.githubStars - a.githubStars);
      break;
    case "updated":
      filteredTools.sort((a, b) =>
        new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime()
      );
      break;
    case "relevance":
    default:
      if (query) {
        filteredTools.sort((a, b) => {
          const aName = a.name.toLowerCase();
          const bName = b.name.toLowerCase();
          if (aName.includes(query) && !bName.includes(query)) return -1;
          if (!aName.includes(query) && bName.includes(query)) return 1;
          return b.githubStars - a.githubStars;
        });
      }
      break;
  }

  // Calculate pagination
  const total = filteredTools.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedTools = filteredTools.slice(startIndex, endIndex);

  return {
    tools: paginatedTools,
    total
  };
}

export async function getToolsMetadata() {
  // Simulate database delay
  await new Promise((resolve) => setTimeout(resolve, ARTIFICIAL_DELAY_MS));

  const categories = Array.from(
    new Set(allTools.flatMap(tool => tool.category))
  ).sort();

  const licenses = Array.from(
    new Set(allTools.map(tool => tool.license))
  ).sort();

  return {
    categories,
    licenses
  };
}

export async function getToolById(id: string): Promise<Tool | null> {
  // Simulate database delay
  await new Promise((resolve) => setTimeout(resolve, ARTIFICIAL_DELAY_MS));

  return allTools.find(tool => tool.id === id) || null;
}