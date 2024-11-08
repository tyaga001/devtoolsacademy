import { type Tool } from '@prisma/client';

export interface Category {
    id: string;
    name: string;
    slug: string;
}

export interface ToolWithCategories extends Tool {
    categories: Category[];
}

export interface ToolsResponse {
    tools: ToolWithCategories[];
    total: number;
    hasMore: boolean;
    page: number;
    totalPages: number;
}

export type SortOption = 'stars' | 'recent' | 'popular';

export interface ToolsQueryParams {
    category?: string;
    search?: string;
    sort?: SortOption;
    limit?: number;
    offset?: number;
}