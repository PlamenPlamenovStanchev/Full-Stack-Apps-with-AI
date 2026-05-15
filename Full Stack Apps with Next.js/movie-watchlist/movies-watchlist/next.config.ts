import type { NextConfig } from "next";

import { loadEnv } from "./db/env";

loadEnv();

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    qualities: [75, 82],
    remotePatterns: [
      {
        hostname: "**",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
