import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export so the app can be bundled into the Capacitor iOS shell.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
