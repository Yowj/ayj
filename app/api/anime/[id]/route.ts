import { NextRequest, NextResponse } from 'next/server'
import { getAnimeInfo } from '@/lib/anipub'

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await getAnimeInfo(params.id)
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}