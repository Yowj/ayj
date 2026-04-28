import { notFound } from "next/navigation";
import WatchSection from "@/components/WatchSection";
import { getAnimeInfo, getStreamingInfo } from "@/lib/anipub";

const BASE = "https://anipub.xyz";

function fixImg(p?: string) {
  if (!p) return "";
  const full = p.startsWith("https://") ? p : `${BASE}/${p}`;
  return `/api/proxy-image?url=${encodeURIComponent(full)}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; ep: string }>;
}) {
  const { id, ep } = await params;
  try {
    const anime = await getAnimeInfo(id);
    return { title: `${anime.Name} — Episode ${ep}` };
  } catch {
    return { title: "Anime Not Found" };
  }
}

export default async function WatchPage({
  params,
}: {
  params: Promise<{ id: string; ep: string }>;
}) {
  const { id, ep } = await params;
  const epNum = parseInt(ep, 10);
  if (isNaN(epNum) || epNum < 1) notFound();

  const [anime, streamData] = await Promise.all([
    getAnimeInfo(id).catch(() => notFound()),
    getStreamingInfo(id).catch(() => null),
  ]);
  const poster = fixImg(anime.ImagePath);

  return (
    <div className="min-h-screen bg-ink text-paper flex flex-col">
      <div className="flex-1 flex min-h-0">
        <WatchSection anime={anime} posterUrl={poster} streamData={streamData} initialEp={epNum} />
      </div>
    </div>
  );
}
