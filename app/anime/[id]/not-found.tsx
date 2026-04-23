import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function AnimeNotFound() {
  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center py-20">
        <p className="font-code text-[11px] tracking-[3px] uppercase text-ink/35">ERROR 404</p>
        <h1 className="font-display text-[clamp(80px,15vw,160px)] leading-none text-ink/8">404</h1>
        <h2 className="font-serif font-black italic text-[28px] text-ink -mt-6">
          Anime not found
        </h2>
        <p className="font-code text-[12px] text-ink/45 max-w-sm leading-relaxed">
          This title doesn&apos;t exist in the archive or may have been removed.
        </p>
        <Link
          href="/"
          className="mt-6 bg-blood text-paper font-display text-[13px] tracking-[3px] px-8 py-3 uppercase hover:bg-blood/80 transition-colors"
        >
          ← BACK TO HOME
        </Link>
      </div>
    </div>
  );
}
