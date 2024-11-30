import { Categories, PrismaClient } from '@prisma/client';
import { ToolDetailsInterface } from './types';

const prisma = new PrismaClient()

interface ToolDetailsReturnType {
  status: boolean;
  message: string;
  toolDetails: ToolDetailsInterface | null;
}

interface GetToolCategoriesReturnType {
  status: boolean;
  message: string;
  categories: Categories[] | null
}

export async function getToolDetails(slug: string): Promise<ToolDetailsReturnType> {
  try {
    const toolDetails = await prisma.tool.findFirst({
      where: { name: slug }
    })
    if (!toolDetails) {
      return {
        status: false,
        message: "failed to get tool details",
        toolDetails: null
      }
    }
    return {
      status: true,
      message: "Successfully fetched all details",
      toolDetails
    }
  } catch (err) {
    return {
      status: false,
      message: "failed to get tool details",
      toolDetails: null
    }
  }
}

export async function getToolCategories(): Promise<GetToolCategoriesReturnType> {
  try {
    const categories = await prisma.categories.findMany({})

    if (categories.length === 0) {
      return {
        status: false,
        message: "no categories found",
        categories: null
      }
    }

    return {
      status: true,
      message: "Categories found",
      categories
    }
  } catch (error: any) {
    console.error('Error in API:', error.response?.data || error.message);
    return {
      status: false,
      message: "no categories found",
      categories: null
    }
  }
}
