import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAnimeDetails } from "@/lib/anipub";

const BASE = "https://anipub.xyz";

function fixImg(p?: string) {
  if (!p) return "";
  const full = p.startsWith("https://") ? p : `${BASE}/${p}`;
  return `/api/proxy-image?url=${encodeURIComponent(full)}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  try {
    const { local } = await getAnimeDetails(Number(id));
    return { title: `${local.Name} — AYJ Anime` };
  } catch {
    return { title: "Anime Not Found" };
  }
}

export default async function AnimePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const details = await getAnimeDetails(Number(id)).catch(() => notFound());
  const { local, jikan, characters } = details;

  const poster =
    fixImg(local.ImagePath) ||
    jikan?.images?.jpg?.large_image_url ||
    jikan?.images?.jpg?.image_url;

  const cover =
    fixImg(local.Cover) ||
    jikan?.images?.jpg?.large_image_url ||
    poster;

  const synopsis = local.DescripTion || jikan?.synopsis || "";
  const mainChars = characters?.filter((c) => c.role === "Main").slice(0, 8) ?? [];

  const stats: [string, string | number | undefined][] = [
    ["Score", local.MALScore],
    ["Status", local.Status],
    ["Episodes", local.epCount],
    ["Duration", local.Duration],
    ["Aired", local.Aired],
    ["Premiered", local.Premiered],
    ["Studios", local.Studios],
    ["Rating", jikan?.rating],
  ];

  return (
    <div className="min-h-screen bg-ink text-paper">
      {/* ── Hero ── */}
      <div className="relative h-80 sm:h-96 w-full overflow-hidden">
        {cover && (
          <Image
            src={cover}
            alt={local.Name}
            fill
            className="object-cover opacity-30"
            unoptimized
            priority
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/50 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-6 pb-8 flex gap-6 sm:gap-8 items-end">
          {/* Poster */}
          {poster && (
            <div className="relative w-28 sm:w-40 shrink-0 aspect-3/4 border border-paper/10 overflow-hidden">
              <Image
                src={poster}
                alt={local.Name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}

          <div className="flex-1 min-w-0 pb-1">
            <h1 className="font-display text-3xl sm:text-5xl tracking-wider leading-none mb-3 line-clamp-2">
              {local.Name}
            </h1>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {local.Genres?.map((g) => (
                <span
                  key={g}
                  className="font-code text-[10px] tracking-wider px-2 py-0.5 border border-paper/20 text-paper/60"
                >
                  {g}
                </span>
              ))}
            </div>
            <Link
              href={`/anime/${id}/watch/1`}
              className="inline-block bg-blood text-paper font-display text-lg tracking-[3px] px-7 py-2 hover:bg-blood/80 transition-colors"
            >
              ▶ WATCH NOW
            </Link>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Synopsis */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-xl tracking-[4px] text-acid mb-4">SYNOPSIS</h2>
            <p className="font-serif text-paper/75 leading-relaxed text-[15px] whitespace-pre-line">
              {synopsis || "No synopsis available."}
            </p>
          </div>

          {/* Stats */}
          <div>
            <h2 className="font-display text-xl tracking-[4px] text-acid mb-4">INFO</h2>
            <div className="space-y-0">
              {stats.map(
                ([label, value]) =>
                  value != null &&
                  value !== "" && (
                    <div
                      key={label}
                      className="flex gap-3 border-b border-paper/10 py-2.5"
                    >
                      <span className="font-code text-[10px] tracking-wider text-paper/35 w-22 shrink-0 uppercase pt-0.5">
                        {label}
                      </span>
                      <span className="font-code text-[12px] text-paper/85">{value}</span>
                    </div>
                  ),
              )}
            </div>
          </div>
        </div>

        {/* Characters */}
        {mainChars.length > 0 && (
          <div className="mt-14">
            <h2 className="font-display text-xl tracking-[4px] text-acid mb-6">
              MAIN CHARACTERS
            </h2>
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
              {mainChars.map((c) => {
                const imgSrc =
                  c.character.images.webp?.image_url ||
                  c.character.images.jpg?.image_url;
                return (
                  <div key={c.character.mal_id}>
                    <div className="relative aspect-square overflow-hidden border border-paper/10 mb-1.5">
                      {imgSrc && (
                        <Image
                          src={imgSrc}
                          alt={c.character.name}
                          fill
                          className="object-cover object-top"
                          unoptimized
                        />
                      )}
                    </div>
                    <p className="font-code text-[9px] text-paper/50 line-clamp-2 leading-tight text-center">
                      {c.character.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
