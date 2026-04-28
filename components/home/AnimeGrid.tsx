import Link from "next/link";
import AnimeCard from "./AnimeCard";
import type { AnimeCardData, AnimeListItem } from "@/types/types";

interface AnimeGridProps {
  title?: string;
  viewAllHref?: string;
  items: AnimeCardData[] | AnimeListItem[];
}

export default function AnimeGrid({ title, viewAllHref, items }: AnimeGridProps) {
  return (
    <section className="mb-14">
      <div className="flex items-baseline justify-between border-b-2 border-ink pb-3.5 mb-8">
        <h2 className="font-display text-[36px] tracking-[1px]">
          <span className="text-blood font-serif italic font-black">§</span> {title}
        </h2>
        {viewAllHref ? (
          <Link
            href={viewAllHref}
            className="font-code text-[11px] tracking-[1.5px] uppercase text-ink/45 hover:text-blood transition-colors"
          >
            View All →
          </Link>
        ) : null}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map((anime) => (
          <AnimeCard key={anime._id} anime={anime} />
        ))}
      </div>
    </section>
  );
}
