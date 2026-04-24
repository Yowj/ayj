import { NextRequest, NextResponse } from "next/server";
import { searchAnime } from "@/lib/anipub";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");
  if (!q) return NextResponse.json([]);
  return NextResponse.json(await searchAnime(q));
}
