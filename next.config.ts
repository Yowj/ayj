import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/api/proxy-image",
        search: "**",
      },
    ],
  },
};

export default nextConfig;
