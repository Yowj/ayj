import Image from "next/image";
import Link from "next/link";
import { getTopRated } from "@/lib/anipub";
import type { AniListItem } from "@/types/types";

export default async function TrendingSidebar() {
  const { AniData } = await getTopRated();

  return (
    <aside className="w-70 shrink-0">
      <div className="border-2 border-ink sticky top-16">
        <div className="flex items-center justify-between px-4 py-3 bg-ink text-paper">
          <span className="font-display text-[15px] tracking-[3px]">TOP TRENDING</span>
          <span className="font-code text-[10px] tracking-[1px] text-acid">NOW ▾</span>
        </div>

        <div>
          {AniData.map((anime: AniListItem, i: number) => {
            const score = parseFloat(anime.MALScore);
            const hasScore = !isNaN(score);

            return (
              <Link
                key={anime._id}
                href={`/anime/${anime._id}`}
                className="flex items-center gap-3 px-3 py-3 hover:bg-ink/5 transition-colors group border-b border-ink/10 last:border-0"
              >
                <span
                  className={`shrink-0 font-display text-[26px] leading-none w-8 text-center ${
                    i < 3 ? "text-blood" : "text-ink/20"
                  }`}
                >
                  {i + 1}
                </span>

                <div className="relative w-9 h-12 shrink-0 overflow-hidden bg-paper-dim border border-ink/10">
                  <Image
                    src={anime.ImagePath}
                    alt={anime.Name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-serif font-bold text-[13px] leading-snug line-clamp-2 mb-0.5 group-hover:text-blood transition-colors">
                    {anime.Name}
                  </p>
                  {hasScore && (
                    <span className="font-code text-[10px] text-ink/40 tracking-[0.5px]">
                      ★ {score.toFixed(2)}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
