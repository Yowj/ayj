import AnimeGrid from "@/components/home/AnimeGrid";
import Pagination from "@/components/Pagination";
import { getAnimeByPage, getAnimeTotal } from "@/lib/anipub";

export default async function Browse({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam ?? "1"));

  const [data, total] = await Promise.all([getAnimeByPage(page), getAnimeTotal()]);
  const totalPages = Math.max(1, Math.ceil(total / 20));

  return (
    <div className="min-h-screen bg-paper text-ink">
      <AnimeGrid items={data} />
      <Pagination currentPage={page} totalPages={totalPages} basePath="/browse" />
    </div>
  );
}
