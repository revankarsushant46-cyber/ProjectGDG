/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Dev-mode optimizations
  experimental: {
    // Faster dev compilation
    turbo: {
      resolveAlias: {
        // Prevent duplicate lucide-react bundles
        'lucide-react': 'lucide-react',
      },
    },
  },
  // Reduce dev overhead
  onDemandEntries: {
    // Keep pages in memory longer
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  // Disable source maps in dev for speed (optional)
  // productionBrowserSourceMaps: false,
}

export default nextConfig
