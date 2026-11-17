import type { NextConfig } from "next";

/**
 * basePath / assetPrefix vêm de NEXT_PUBLIC_BASE_PATH.
 * Local e Vercel: vazio. GitHub Pages: "/nome-do-repositorio" (definido no workflow).
 */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath || undefined,
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
