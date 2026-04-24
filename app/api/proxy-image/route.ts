import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')
  if (!url) return new NextResponse('Missing url', { status: 400 })

  try {
    const res = await fetch(url)
    if (!res.ok) return new NextResponse('Failed', { status: res.status })

    const blob = await res.arrayBuffer()
    const contentType = res.headers.get('content-type') ?? 'image/jpeg'

    return new NextResponse(blob, {
      headers: { 'content-type': contentType },
    })
  } catch {
    return new NextResponse('Proxy fetch failed', { status: 502 })
  }
}