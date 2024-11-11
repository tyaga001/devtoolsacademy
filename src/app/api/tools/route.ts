import { NextResponse } from 'next/server'
import toolsData from '@/data/tools.json'
import { Tool } from '@/lib/types'

export async function GET(request: Request) {

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  await delay(500)

  return NextResponse.json(toolsData as Tool[])
}
