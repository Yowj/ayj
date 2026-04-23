export default function Loading() {
  return (
    <>
      <div className="min-h-screen bg-zinc-950 text-white">
        <div className="w-full h-130 bg-zinc-900 animate-pulse" />
        <div className="max-w-350 mx-auto px-4 py-8">
          <div className="flex gap-6 items-start">
            <div className="flex-1 min-w-0">
              <div className="h-6 w-48 bg-zinc-800 rounded mb-5 animate-pulse" />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i} className="aspect-2/3 bg-zinc-800 rounded-xl animate-pulse" />
                ))}
              </div>
            </div>
            <div className="w-70 shrink-0 h-150 bg-zinc-900 rounded-2xl animate-pulse hidden lg:block" />
          </div>
        </div>
      </div>
    </>
  );
}
