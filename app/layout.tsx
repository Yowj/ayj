import type { Metadata } from "next";
import { Bebas_Neue, DM_Mono, Fraunces, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-jp",
  weight: ["400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AYJ Anime",
  description: "Browse anime from the AniPub archive.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${dmMono.variable} ${fraunces.variable} ${notoSerifJP.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
