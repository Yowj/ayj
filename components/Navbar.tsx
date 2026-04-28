"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Browse", href: "/browse" },
];

type SearchResult = {
  Name: string;
  Id: number;
  Image: string;
  finder: string;
};

export default function Navbar() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setQuery(val);
    if (val.length < 2) {
      setResults([]);
      setOpen(false);
    }
  }

  useEffect(() => {
    if (query.length < 2) return;
    clearTimeout(debounceRef.current ?? undefined);
    debounceRef.current = setTimeout(async () => {
      const data = await fetch(`/api/search?q=${encodeURIComponent(query)}`).then((r) => r.json());
      setResults(data);
      setOpen(true);
    }, 300);
    return () => clearTimeout(debounceRef.current ?? undefined);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-ink text-paper border-b border-paper/10">
      <div className="max-w-350 mx-auto px-8 h-14 flex items-center gap-6">
        {/* Brand */}
        <Link href="/" className="shrink-0 flex items-baseline gap-0.5 mr-2">
          <span className="font-display text-[22px] tracking-[2px] text-paper">AYJ</span>
          <span className="font-display text-[22px] tracking-[2px] text-acid">{"//"}</span>
          <span className="font-display text-[22px] tracking-[2px] text-paper hidden sm:block">
            ANIME
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-5">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`font-display text-[13px] tracking-[2px] uppercase transition-colors ${
                pathname === href ? "text-acid" : "text-paper/50 hover:text-paper"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Search */}
        <div ref={wrapperRef} className="flex-1 max-w-xs ml-auto relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-acid text-sm pointer-events-none">
            ⌕
          </span>
          <input
            type="text"
            placeholder="SEARCH THE ARCHIVE..."
            value={query}
            onChange={handleQueryChange}
            className="w-full bg-transparent border border-paper/20 text-paper font-code text-[11px] tracking-[1px] placeholder:text-paper/35 pl-8 pr-4 py-2 outline-none focus:border-acid transition-colors"
          />

          {open && results.length > 0 && (
            <div
              className="absolute top-full mt-1 w-full bg-ink border border-paper/10 z-50 shadow-2xl"
              style={{ maxHeight: "22rem", overflowY: "auto" }}
            >
              {results.map((item) => (
                <Link
                  key={item.Id}
                  href={`/anime/${item.Id}`}
                  onClick={() => {
                    setOpen(false);
                    setQuery("");
                  }}
                  className="flex items-center gap-3 px-3 py-2.5 hover:bg-paper/5 transition-colors border-b border-paper/5 last:border-0"
                >
                  <img
                    src={`/api/proxy-image?url=${encodeURIComponent(item.Image)}`}
                    alt={item.Name}
                    width={28}
                    height={36}
                    className="h-9 w-7 shrink-0 object-cover"
                  />
                  <span className="font-code text-[11px] text-paper tracking-[0.5px] truncate">
                    {item.Name}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
