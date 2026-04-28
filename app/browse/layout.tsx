
import Link from "next/link";


export default function BrowseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">

      {/* Page header */}
      <div className="bg-ink text-paper border-b-2 border-blood px-8 py-8 max-sm:px-5">
        <div className="max-w-350 mx-auto">
          <p className="font-code text-[10px] tracking-[3px] text-acid uppercase mb-1">
            § ARCHIVE
          </p>
          <h1 className="font-display text-[clamp(40px,5vw,72px)] leading-[0.9] tracking-wide">
            BROWSE
          </h1>
        </div>
      </div>

      {/* Genre filter strip */}
      <div className="border-b-2 border-ink/8 overflow-x-auto">
        <div className="max-w-350 mx-auto px-8 max-sm:px-5 flex items-center w-max min-w-full">
          <Link
            href="/browse"
            className="font-code text-[10px] tracking-[2px] uppercase px-4 py-3.5 text-ink/40 hover:text-ink border-b-2 border-transparent hover:border-blood transition-colors whitespace-nowrap"
          >
            All
          </Link>
        </div>
      </div>

      <main className="flex-1 max-w-350 mx-auto w-full px-8 py-10 max-sm:px-5 max-sm:py-6">
        {children}
      </main>
    </div>
  );
}
