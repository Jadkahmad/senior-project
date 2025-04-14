import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "images.pexels.com" }],
  },
};

export default nextConfig;
