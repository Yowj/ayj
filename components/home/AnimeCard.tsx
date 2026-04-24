import Image from "next/image";
import Link from "next/link";
import type { AnimeListItem } from "@/types/types";

export default function AnimeCard({ anime }: { anime: AnimeListItem}) {
  const score = parseFloat(anime.MALScore);
  const hasScore = !isNaN(score);

  return (
    <Link href={`/anime/${anime._id}`} className="group relative block">
      <div className="relative w-full aspect-3/4 overflow-hidden bg-paper-dim border border-ink/10 mb-3">
        <Image
          src={anime.ImagePath}
          alt={anime.Name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          unoptimized
        />
        {hasScore && (
          <div className="absolute bottom-2 right-2 bg-ink text-acid px-2 py-0.5 font-code text-[11px] font-medium tracking-[0.5px]">
            ★ {score.toFixed(1)}
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-blood text-paper font-display text-[12px] tracking-[2px] px-4 py-1.5">
            ▶ WATCH
          </div>
        </div>
      </div>
      <h3 className="font-serif font-bold text-[14px] leading-[1.3] line-clamp-2 group-hover:text-blood transition-colors duration-200">
        {anime.Name}
      </h3>
    </Link>
  );
}
