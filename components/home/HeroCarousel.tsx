"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import type { AnimeListResponseWithDetails } from "@/types/types";

export default function HeroCarousel({ data }: { data: AnimeListResponseWithDetails }) {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  const items = data.AniData;
  const anime = items[current];

  const navigate = useCallback(
    (to: number) => {
      if (fading) return;
      setFading(true);
      setTimeout(() => {
        setCurrent(to);
        setFading(false);
      }, 400);
    },
    [fading],
  );

  const goNext = useCallback(
    () => navigate((current + 1) % items.length),
    [current, items.length, navigate],
  );
  const goPrev = useCallback(
    () => navigate((current - 1 + items.length) % items.length),
    [current, items.length, navigate],
  );

  useEffect(() => {
    const t = setInterval(goNext, 7000);
    return () => clearInterval(t);
  }, [goNext]);

  const score = parseFloat(anime.MALScore);
  const synopsis = anime.DescripTion?.trim() ?? "";
  const synopsisShort = synopsis.length > 200 ? synopsis.slice(0, 200) + "…" : synopsis;
  const fade = fading ? "opacity-0" : "opacity-100";

  return (
    <div className="relative w-full h-125 bg-ink overflow-hidden select-none border-b-2 border-ink">
      {/* Background — ImagePath is already resolved server-side, no onError needed */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${fade}`}>
        <Image
          key={`bg-${anime._id}`}
          src={anime.details.local.Cover}
          alt=""
          fill
          priority
          unoptimized
          className="object-cover object-center opacity-70"
          aria-hidden
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/90 to-ink/40" />

      {/* Content */}
      <div
        className={`relative z-10 h-full max-w-350 mx-auto px-8 flex items-end pb-16 gap-12 transition-opacity duration-500 ${fade}`}
      >
        {/* Text */}
        <div className="flex-1 max-w-2xl">
          {!isNaN(score) && (
            <p className="font-code text-[11px] tracking-[3px] text-acid uppercase mb-3">
              ★ {score.toFixed(1)} · TOP RATED
            </p>
          )}
          <h1 className="font-display text-[clamp(48px,6vw,88px)] leading-[0.9] text-paper tracking-wide mb-5">
            {anime.Name}
          </h1>
          {synopsisShort && (
            <p className="font-code text-[11px] text-paper/45 leading-relaxed mb-8 max-w-xl tracking-[0.3px]">
              {synopsisShort}
            </p>
          )}
          <div className="flex items-center gap-3">
            <Link
              href={`/anime/${anime._id}/watch/1`}
              className="bg-blood text-paper font-display text-[13px] tracking-[3px] px-8 py-3 uppercase hover:bg-blood/80 transition-colors"
            >
              ▶ WATCH NOW
            </Link>
            <Link
              href={`/anime/${anime._id}`}
              className="border border-paper/25 text-paper font-code text-[11px] tracking-[1.5px] px-6 py-3 uppercase hover:bg-paper/10 transition-colors"
            >
              DETAILS
            </Link>
          </div>
        </div>

        {/* Poster */}
        <div className="hidden xl:block shrink-0">
          <div
            className={`relative w-64 h-96 overflow-hidden border-2 border-paper/10 shadow-2xl transition-opacity duration-500 ${fade}`}
          >
            <Image
              key={`poster-${anime._id}`}
              src={anime.ImagePath}
              alt={anime.Name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </div>

      {/* Dots + nav */}
      <div className="absolute bottom-5 inset-x-0 z-20 max-w-350 mx-auto px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => navigate(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-300 h-0.5 ${
                i === current ? "w-8 bg-acid" : "w-2 bg-paper/25 hover:bg-paper/50"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={goPrev}
            aria-label="Previous"
            className="border border-paper/20 text-paper/50 hover:text-acid hover:border-acid w-8 h-8 flex items-center justify-center transition-all font-code text-sm"
          >
            ←
          </button>
          <span className="font-code text-[11px] text-paper/35 tracking-[2px] tabular-nums w-12 text-center">
            {String(current + 1).padStart(2, "0")}/{String(items.length).padStart(2, "0")}
          </span>
          <button
            onClick={goNext}
            aria-label="Next"
            className="border border-paper/20 text-paper/50 hover:text-acid hover:border-acid w-8 h-8 flex items-center justify-center transition-all font-code text-sm"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}