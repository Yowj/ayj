import AnimeGrid from "@/components/home/AnimeGrid";
import Pagination from "@/components/Pagination";
import { findByGenre } from "@/lib/anipub";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: `${slug} Anime`,
    description: `Browse ${slug} anime series`,
  };
}

export default async function GenrePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const page = Math.max(1, parseInt((await searchParams).page ?? "1", 10));

  const data = await findByGenre(slug, page);

  const isLastPage = data.length < 20;
  const totalPages = isLastPage ? page : page + 1;

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* ── Header ── */}
      <div className="bg-ink text-paper">
        <div className="max-w-350 mx-auto px-8 py-12 max-sm:px-5 max-sm:py-8">
          <p className="font-code text-[10px] tracking-[3px] uppercase text-paper/35 mb-3">
            Genre
          </p>
          <h1 className="font-display text-[56px] max-sm:text-[40px] leading-none tracking-[2px] uppercase">
            {slug}
          </h1>
        </div>
      </div>

      {/* ── Content ── */}
      <main className="max-w-350 mx-auto px-8 py-12 max-sm:px-5 max-sm:py-8">
        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <p className="font-display text-[32px] tracking-[2px] text-ink/20 uppercase">
              No results
            </p>
            <p className="font-code text-[11px] tracking-[1px] text-ink/35">
              No anime found for &quot;{slug}&quot;
            </p>
          </div>
        ) : (
          <>
            <AnimeGrid items={data} />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              basePath={`/genre/${slug}`}
            />
          </>
        )}
      </main>
    </div>
  );
}
