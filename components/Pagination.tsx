import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  const prevHref = currentPage > 1 ? `${basePath}?page=${currentPage - 1}` : null;
  const nextHref = currentPage < totalPages ? `${basePath}?page=${currentPage + 1}` : null;

  return (
    <div className="flex items-center justify-center gap-8 pt-12 pb-4 border-t-2 border-ink/10 mt-10">
      {prevHref ? (
        <Link
          href={prevHref}
          className="font-code text-[11px] tracking-[2px] uppercase text-ink/50 hover:text-blood transition-colors"
        >
          ← PREV
        </Link>
      ) : (
        <span className="font-code text-[11px] tracking-[2px] uppercase text-ink/20 select-none">
          ← PREV
        </span>
      )}

      <span className="font-code text-[11px] tracking-[2px] text-ink/35">
        {currentPage} / {totalPages}
      </span>

      {nextHref ? (
        <Link
          href={nextHref}
          className="font-code text-[11px] tracking-[2px] uppercase text-ink/50 hover:text-blood transition-colors"
        >
          NEXT →
        </Link>
      ) : (
        <span className="font-code text-[11px] tracking-[2px] uppercase text-ink/20 select-none">
          NEXT →
        </span>
      )}
    </div>
  );
}
