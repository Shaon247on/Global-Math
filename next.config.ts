// Extend the default NextConfig type so Next.js accepts custom fields
import type { NextConfig } from "next";

interface ExtendedNextConfig extends NextConfig {
  eslint?: {
    ignoreDuringBuilds: boolean;
  };
  typescript?: {
    ignoreBuildErrors: boolean;
  };
}

const nextConfig: ExtendedNextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
