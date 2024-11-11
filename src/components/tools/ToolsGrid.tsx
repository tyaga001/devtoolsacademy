import { Tool } from "@/lib/types"
import axios from "axios"
import ToolCard from "./ToolCard"

export const ToolsGrid = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tools`)
  const tools: Tool[] = response.data

  return (
    <div className="grid grid-cols-3 gap-4">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  )
}

export default ToolsGrid

