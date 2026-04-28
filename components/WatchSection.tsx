"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { AnimeBasicInfo, AnimeStreamingInfo } from "@/types/types";

const RANGE = 100;

interface Props {
  anime: AnimeBasicInfo;
  posterUrl: string;
  streamData: AnimeStreamingInfo | null;
  initialEp?: number;
}

const stripSrc = (link: string) => link.replace(/^src=/, "");

export default function WatchSection({ anime, posterUrl, streamData, initialEp = 1 }: Props) {
  const router = useRouter();
  const [currentEp, setCurrentEp] = useState(initialEp);

  const allEps = useMemo(() => {
    if (!streamData) return [];
    return [
      { ep: 1, src: stripSrc(streamData.link) },
      ...streamData.ep.map((e, i) => ({ ep: i + 2, src: stripSrc(e.link) })),
    ];
  }, [streamData]);

  const totalEps = allEps.length || anime.epCount;

  function goToEp(ep: number) {
    setCurrentEp(ep);
    router.push(`/anime/${anime._id}/watch/${ep}`);
  }
  const currentSrc = allEps.find((e) => e.ep === currentEp)?.src ?? "";

  const totalRanges = Math.max(1, Math.ceil(totalEps / RANGE));
  const [rangeIdx, setRangeIdx] = useState(0);

  const rangeStart = rangeIdx * RANGE + 1;
  const rangeEnd = Math.min((rangeIdx + 1) * RANGE, totalEps);
  const visibleEps = Array.from({ length: rangeEnd - rangeStart + 1 }, (_, i) => rangeStart + i);

  const score = parseFloat(anime.MALScore);
  const hasScore = !isNaN(score);

  return (
    <div className="flex flex-1 min-h-0 bg-ink text-paper overflow-hidden">
      {/* ── LEFT: info panel ── */}
      <aside className="hidden lg:flex w-65 shrink-0 flex-col border-r border-paper/8 overflow-y-auto scrollbar-thin">
        {/* poster + gradient title */}
        <div className="relative w-full aspect-2/3 shrink-0">
          {posterUrl ? (
            <Image src={posterUrl} alt={anime.Name} fill className="object-cover" unoptimized />
          ) : (
            <div className="w-full h-full bg-paper/5 flex items-center justify-center font-display text-5xl text-paper/10">
              ?
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/40 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 p-4">
            <h1 className="font-display text-[19px] leading-[1.05] tracking-wide text-paper drop-shadow-lg">
              {anime.Name}
            </h1>
            {hasScore && (
              <p className="font-code text-[10px] tracking-[2px] text-acid mt-1.5">
                ★ {score.toFixed(1)}
                {anime.RatingsNum > 0 && (
                  <span className="text-paper/35"> · {anime.RatingsNum.toLocaleString()}</span>
                )}
              </p>
            )}
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* synonyms */}
          {anime.Synonyms && (
            <p className="font-code text-[10px] text-paper/25 leading-relaxed border-l-2 border-paper/10 pl-3">
              {anime.Synonyms}
            </p>
          )}

          {/* status + genres */}
          <div className="flex flex-wrap gap-1">
            {anime.Status && (
              <span className="border border-paper/15 text-paper/35 font-code text-[9px] tracking-[1px] uppercase px-2 py-0.5">
                {anime.Status}
              </span>
            )}
            {anime.Genres?.map((g) => (
              <span
                key={g}
                className="border border-blood/50 text-blood font-code text-[9px] tracking-[0.5px] uppercase px-2 py-0.5"
              >
                {g}
              </span>
            ))}
          </div>

          {/* synopsis */}
          {anime.DescripTion && (
            <p className="font-code text-[11px] text-paper/35 leading-[1.85] line-clamp-5">
              {anime.DescripTion}
            </p>
          )}

          {/* details — two column layout */}
          <dl className="space-y-2">
            {(
              [
                ["Aired", anime.Aired],
                ["Premiered", anime.Premiered],
                ["Duration", anime.Duration],
                ["Episodes", totalEps || undefined],
                ["Studios", anime.Studios],
                ["Producers", anime.Producers],
              ] as [string, string | number | undefined][]
            )
              .filter(([, v]) => v)
              .map(([label, value]) => (
                <div key={label} className="flex gap-2 items-baseline border-b border-paper/5 pb-2">
                  <dt className="font-code text-[9px] tracking-[2px] uppercase text-paper/25 w-20 shrink-0">
                    {label}
                  </dt>
                  <dd className="font-code text-[11px] text-paper/65 leading-relaxed min-w-0">
                    {value}
                  </dd>
                </div>
              ))}
          </dl>
        </div>
      </aside>

      {/* ── CENTER: player + controls ── */}
      <main className="flex-1 min-w-0 flex flex-col overflow-y-auto">
        {/* player */}
        <div className="relative w-full aspect-video bg-black shrink-0">
          {currentSrc ? (
            <iframe
              src={currentSrc}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              allow="autoplay; fullscreen"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="w-16 h-16 rounded-full border-2 border-paper/10 flex items-center justify-center">
                <span className="text-paper/20 text-2xl ml-1">▶</span>
              </div>
              <span className="font-code text-[10px] tracking-[3px] uppercase text-paper/15">
                No stream source
              </span>
            </div>
          )}
        </div>

        {/* controls bar — two groups */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-paper/8 bg-ink shrink-0">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => goToEp(Math.max(1, currentEp - 1))}
              disabled={currentEp <= 1}
              className="font-code text-[10px] tracking-[1px] uppercase text-paper/30 hover:text-paper/75 transition-colors px-3 py-1 border border-paper/10 hover:border-paper/25 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              ◀ Prev
            </button>
            <button
              onClick={() => goToEp(Math.min(totalEps, currentEp + 1))}
              disabled={currentEp >= totalEps}
              className="font-code text-[10px] tracking-[1px] uppercase text-paper/30 hover:text-paper/75 transition-colors px-3 py-1 border border-paper/10 hover:border-paper/25 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              Next ▶
            </button>
          </div>
        </div>

        {/* episode info + servers */}
        <div className="px-5 py-5 border-b border-paper/8 shrink-0">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="font-serif italic text-[12px] text-paper/35 mb-1">Currently watching</p>
              <p className="font-display text-[28px] tracking-[1px] text-paper leading-none">
                EPISODE <span className="text-blood">{currentEp}</span>
                {totalEps > 0 && (
                  <span className="font-code text-[13px] tracking-normal text-paper/20 ml-2">
                    / {totalEps}
                  </span>
                )}
              </p>
              <p className="font-code text-[10px] text-paper/22 mt-2">
                If the server is not working, switch to another below.
              </p>
            </div>
          </div>
        </div>

        {/* mobile episode grid */}
        <div className="lg:hidden p-4">
          <p className="font-code text-[10px] tracking-[2px] uppercase text-paper/25 mb-3">
            Episodes — {totalEps}
          </p>
          <div className="grid grid-cols-8 gap-1">
            {Array.from({ length: totalEps }, (_, i) => i + 1).map((ep) => (
              <button
                key={ep}
                onClick={() => goToEp(ep)}
                className={`aspect-square flex items-center justify-center font-code text-[11px] transition-all duration-150 ${
                  ep === currentEp
                    ? "bg-blood text-paper"
                    : "border border-paper/10 text-paper/35 hover:border-paper/30 hover:text-paper/70"
                }`}
              >
                {ep}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* ── RIGHT: episode list ── */}
      <aside className="hidden lg:flex w-60 shrink-0 flex-col border-l border-paper/8 border-t-2 border-t-blood">
        {/* header */}
        <div className="px-4 py-3 border-b border-paper/8 shrink-0 flex items-baseline justify-between">
          <span className="font-display text-[16px] tracking-[2px] uppercase text-paper">
            Episodes
          </span>
          {totalEps > 0 && (
            <span className="font-code text-[10px] text-blood tracking-[1px]">{totalEps} eps</span>
          )}
        </div>

        {/* range selector */}
        {totalRanges > 1 && (
          <div className="flex items-center justify-between px-2 py-2 border-b border-paper/8 bg-paper/3 shrink-0">
            <button
              onClick={() => setRangeIdx((r) => Math.max(0, r - 1))}
              disabled={rangeIdx === 0}
              className="w-8 h-8 flex items-center justify-center font-code text-[16px] text-paper/35 hover:text-paper/75 hover:bg-paper/8 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            >
              ‹
            </button>
            <span className="font-code text-[11px] tracking-[1px] text-paper/40">
              {String(rangeStart).padStart(3, "0")}–{String(rangeEnd).padStart(3, "0")}
            </span>
            <button
              onClick={() => setRangeIdx((r) => Math.min(totalRanges - 1, r + 1))}
              disabled={rangeIdx >= totalRanges - 1}
              className="w-8 h-8 flex items-center justify-center font-code text-[16px] text-paper/35 hover:text-paper/75 hover:bg-paper/8 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            >
              ›
            </button>
          </div>
        )}

        {/* grid */}
        <div className="flex-1 overflow-y-auto p-3">
          <div className="grid grid-cols-6 gap-1">
            {visibleEps.map((ep) => (
              <button
                key={ep}
                onClick={() => goToEp(ep)}
                className={`aspect-square flex items-center justify-center font-code text-[11px] transition-all duration-150 ${
                  ep === currentEp
                    ? "bg-blood text-paper shadow-[0_0_10px_rgba(196,31,31,0.45)]"
                    : "border border-paper/10 text-paper/35 hover:border-paper/30 hover:text-paper/75 hover:bg-paper/5"
                }`}
              >
                {ep}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
