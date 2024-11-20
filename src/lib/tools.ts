import { PrismaClient } from '@prisma/client'
import { ToolCardInterface } from './types'

const prisma = new PrismaClient()

interface ToolDetailsReturnType {
  status: boolean;
  message: string;
  toolDetails?: ToolCardInterface | null;
}

export async function getToolDetails(slug: string): Promise<ToolDetailsReturnType> {
  try {
    const toolDetails = await prisma.tool.findFirst({
      where: { name: slug }
    })
    if (!toolDetails) {
      return {
        status: false,
        message: "failed to get tool details"
      }
    }
    return {
      status: true,
      message: "Successfully fetched all details",
      toolDetails: toolDetails
    }
  } catch (err) {
    console.log(`tool details fetch error -- ${err}`)
    return {
      status: false,
      message: "failed to get tool details"
    }
  }
}
