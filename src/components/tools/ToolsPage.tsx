import { ToolCardInterface } from '@/lib/types'
import ToolCard from './ToolCard'

interface ToolPageProps {
  tools: ToolCardInterface[]
}

const ToolsPage: React.FC<ToolPageProps> = ({ tools }) => {

  return (
    <div className='w-full flex flex-col items-center gap-4'>
      <h1 className='text-3xl'>
        Tools
      </h1>
      <div className=' grid grid-cols-3 gap-2'>
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  )
}

export default ToolsPage
