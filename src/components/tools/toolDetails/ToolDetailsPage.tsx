import { ToolCardInterface } from '@/lib/types'
import React from 'react'

interface ToolCardProps {
  tool: ToolCardInterface
}

const ToolDetailsPage: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <div>
      {/*convert these img tags into Next js Image tag, after adding image upload feature*/}
      <img
        height={100}
        width={100}
        alt={`${tool.name} logo`}
        src={tool.logo}
      />
      <h1>{tool.name}</h1>
    </div>
  )
}

export default ToolDetailsPage
