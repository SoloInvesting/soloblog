import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.financialmodelingprep.com" },
      { protocol: "https", hostname: "**.wordpress.com" },
      { protocol: "https", hostname: "**.wp.com" },
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
