import type { AniListItem } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

const BASE = "https://anipub.xyz";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");
  if (!q) return NextResponse.json([]);

  const res = await fetch(`${BASE}/api/search/${encodeURIComponent(q)}`);
  if (!res.ok) return NextResponse.json([]);

  const data = await res.json();
  const items: AniListItem[] = Array.isArray(data) ? data : (data.results ?? data.data ?? []);

  const normalized = items.map((item) => ({
    ...item,
    ImagePath: item.ImagePath
      ? item.ImagePath.startsWith("https://")
        ? item.ImagePath
        : `${BASE}/${item.ImagePath}`
      : "",
  }));

  return NextResponse.json(normalized);
}

// sample response from anipub:
// [
//   {
//     "Name": "Naruto: Shippuden",
//     "Id": 81,
//     "Image": "https://static0.gamerantimages.com/wordpress/wp-content/uploads/sharedimages/2024/04/naruto-shippuden-tv-series-poster.jpg",
//     "finder": "naruto-shippuden"
//   },
//   {
//     "Name": "Naruto",
//     "Id": 82,
//     "Image": "https://image.tmdb.org/t/p/original/rgHWkZVyvxMBOSYgj585pIx6qAn.jpg",
//     "finder": "naruto"
//   },
// ]
