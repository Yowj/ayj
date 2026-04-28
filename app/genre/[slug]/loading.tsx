export default function GenreLoading() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* header skeleton */}
      <div className="bg-ink">
        <div className="max-w-350 mx-auto px-8 py-12 max-sm:px-5 max-sm:py-8">
          <div className="h-3 w-12 bg-paper/10 animate-pulse mb-3" />
          <div className="h-14 w-64 bg-paper/10 animate-pulse" />
        </div>
      </div>

      {/* grid skeleton */}
      <main className="max-w-350 mx-auto px-8 py-12 max-sm:px-5 max-sm:py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i}>
              <div className="w-full aspect-3/4 bg-ink/8 animate-pulse mb-3" />
              <div className="h-3.5 bg-ink/8 animate-pulse mb-1.5 w-4/5" />
              <div className="h-3.5 bg-ink/8 animate-pulse w-3/5" />
            </div>
          ))}
        </div>

        {/* pagination skeleton */}
        <div className="flex items-center justify-center gap-8 pt-12 pb-4 border-t-2 border-ink/10 mt-10">
          <div className="h-3 w-12 bg-ink/8 animate-pulse" />
          <div className="h-3 w-10 bg-ink/8 animate-pulse" />
          <div className="h-3 w-12 bg-ink/8 animate-pulse" />
        </div>
      </main>
    </div>
  );
}
