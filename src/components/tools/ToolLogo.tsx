import { Box } from "lucide-react"

interface ToolLogoProps {
  name: string
}

export default function ToolLogo({ name }: ToolLogoProps) {
  return (
    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
      <Box className="w-4 h-4 text-secondary-foreground" />
    </div>
  )
}
