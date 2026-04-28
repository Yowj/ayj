export default function BrowseLoading() {
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i}>
            <div className="w-full aspect-3/4 bg-ink/8 animate-pulse mb-3" />
            <div className="h-3.5 bg-ink/8 animate-pulse mb-1.5 w-4/5" />
            <div className="h-3.5 bg-ink/8 animate-pulse w-3/5" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-8 pt-12 pb-4 border-t-2 border-ink/10 mt-10">
        <div className="h-3 w-12 bg-ink/8 animate-pulse" />
        <div className="h-3 w-10 bg-ink/8 animate-pulse" />
        <div className="h-3 w-12 bg-ink/8 animate-pulse" />
      </div>
    </>
  );
}
