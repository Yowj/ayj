export default function WatchLoading() {
  return (
    <div className="min-h-screen bg-ink text-paper flex flex-col">
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* left info panel */}
        <aside className="hidden lg:flex w-65 shrink-0 flex-col border-r border-paper/8">
          <div className="w-full aspect-2/3 bg-paper/5 animate-pulse shrink-0" />
          <div className="p-4 space-y-3">
            <div className="h-3 w-3/4 bg-paper/8 animate-pulse" />
            <div className="h-3 w-1/2 bg-paper/8 animate-pulse" />
            <div className="flex gap-1 flex-wrap mt-1">
              <div className="h-4 w-12 bg-paper/8 animate-pulse" />
              <div className="h-4 w-16 bg-paper/8 animate-pulse" />
              <div className="h-4 w-10 bg-paper/8 animate-pulse" />
            </div>
            <div className="space-y-2 pt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-2.5 bg-paper/5 animate-pulse" style={{ width: `${70 + (i % 3) * 10}%` }} />
              ))}
            </div>
          </div>
        </aside>

        {/* center player */}
        <main className="flex-1 min-w-0 flex flex-col overflow-y-auto">
          <div className="w-full aspect-video bg-paper/5 animate-pulse shrink-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-2 border-paper/10 flex items-center justify-center">
              <span className="text-paper/10 text-2xl ml-1">▶</span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 border-b border-paper/8 shrink-0">
            <div className="h-6 w-16 bg-paper/8 animate-pulse" />
            <div className="h-6 w-16 bg-paper/8 animate-pulse" />
          </div>

          <div className="px-5 py-5 border-b border-paper/8 shrink-0 space-y-2">
            <div className="h-3 w-28 bg-paper/8 animate-pulse" />
            <div className="h-7 w-52 bg-paper/8 animate-pulse" />
          </div>

          {/* mobile episode grid skeleton */}
          <div className="lg:hidden p-4">
            <div className="h-3 w-24 bg-paper/8 animate-pulse mb-3" />
            <div className="grid grid-cols-8 gap-1">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="aspect-square bg-paper/5 animate-pulse" />
              ))}
            </div>
          </div>
        </main>

        {/* right episode list */}
        <aside className="hidden lg:flex w-60 shrink-0 flex-col border-l border-paper/8 border-t-2 border-t-blood">
          <div className="px-4 py-3 border-b border-paper/8 shrink-0">
            <div className="h-4 w-20 bg-paper/8 animate-pulse" />
          </div>
          <div className="flex-1 p-3">
            <div className="grid grid-cols-6 gap-1">
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className="aspect-square bg-paper/5 animate-pulse" />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
