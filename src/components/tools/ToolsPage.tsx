"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToolCardInterface } from '@/lib/types'
import ToolCard from './ToolCard'

const ToolsPage = () => {
  const [tools, setTools] = useState<ToolCardInterface[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getTools = async () => {
      try {
        setLoading(true)
        const response = await axios.get("/api/tools")
        setTools(response.data)
      } catch (err) {
        console.error('Failed to fetch tools:', err)
        setError('Failed to load tools. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    getTools()
  }, [])

  if (loading) {
    return (
      <div className='w-1/2 flex justify-center items-center min-h-[400px]'>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-300"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='w-1/2 flex justify-center items-center min-h-[400px] text-red-500'>
        {error}
      </div>
    )
  }

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
