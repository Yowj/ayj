import { Suspense } from "react";

import HeroCarousel from "@/components/home/HeroCarousel";
import AnimeGrid from "@/components/home/AnimeGrid";
import TrendingSidebar from "@/components/home/TrendingSidebar";
import { getTopRated, findByGenre } from "@/lib/anipub";

const SidebarSkeleton = () => (
  <div className="w-70 shrink-0 h-150 bg-ink/5 border-2 border-ink/10 animate-pulse hidden lg:block" />
);

export default async function Home() {
  const [topratedAnimes, actionAnimes, romanceAnimes] = await Promise.all([
    getTopRated(),
    findByGenre("Action"),
    findByGenre("Romance"),
  ]);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <HeroCarousel data={topratedAnimes} />

      <main className="max-w-350 mx-auto px-8 py-12 max-sm:px-5 max-sm:py-8">
        <div className="flex gap-8 items-start">
          <div className="flex-1 min-w-0">
            <AnimeGrid title="Action" viewAllHref="/genre/Action" items={actionAnimes} />
            <AnimeGrid title="Romance" viewAllHref="/genre/Romance" items={romanceAnimes} />
          </div>

          <Suspense fallback={<SidebarSkeleton />}>
            <TrendingSidebar />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
